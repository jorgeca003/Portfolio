/**
 * Cloudflare Pages Function – GET /api/content
 *
 * Fetches portfolio content from a Notion database:
 *   - Professional summary (rich-text → plain text)
 *   - CV download URL (stored as a URL property, e.g. OneDrive share link)
 *
 * Required env vars (set in Cloudflare Pages dashboard):
 *   NOTION_API_KEY       – Internal integration token
 *   NOTION_DATABASE_ID   – Database ID containing "Summary" and "CV" properties
 */

const NOTION_VERSION = "2022-06-28";
const CACHE_MAX_AGE = 300; // 5 minutes

/**
 * Query the Notion database and return the first row.
 */
async function fetchNotionContent(apiKey, databaseId) {
  const res = await fetch(
    `https://api.notion.com/v1/databases/${databaseId}/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Notion-Version": NOTION_VERSION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ page_size: 1 }),
    },
  );

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Notion API error ${res.status}: ${body}`);
  }

  return res.json();
}

/**
 * Extract plain text from a Notion rich_text array.
 */
function richTextToPlain(richTextArray) {
  if (!richTextArray || !Array.isArray(richTextArray)) return "";
  return richTextArray.map((t) => t.plain_text).join("");
}

/**
 * Extract the CV URL from the page properties.
 * Supports both "url" type and "rich_text" type properties.
 */
function extractCvUrl(properties) {
  const cv = properties.CV || properties.cv;
  if (!cv) return null;

  if (cv.type === "url") return cv.url;
  if (cv.type === "rich_text") return richTextToPlain(cv.rich_text);
  if (cv.type === "files" && cv.files?.length > 0) {
    const file = cv.files[0];
    return file.external?.url || file.file?.url || null;
  }
  return null;
}

export async function onRequestGet(context) {
  const { env } = context;

  const apiKey = env.NOTION_API_KEY;
  const databaseId = env.NOTION_DATABASE_ID;

  if (!apiKey || !databaseId) {
    return Response.json(
      { error: "Missing NOTION_API_KEY or NOTION_DATABASE_ID" },
      { status: 500 },
    );
  }

  try {
    const data = await fetchNotionContent(apiKey, databaseId);
    const page = data.results?.[0];

    if (!page) {
      return Response.json(
        { error: "No content found in Notion database" },
        { status: 404 },
      );
    }

    const props = page.properties;

    // Extract summary – look for a "Summary" rich_text property
    const summaryProp = props.Summary || props.summary;
    const summary = summaryProp ? richTextToPlain(summaryProp.rich_text) : "";

    // Extract short bio / tagline (optional)
    const bioProp = props.Bio || props.bio;
    const bio = bioProp ? richTextToPlain(bioProp.rich_text) : "";

    // Extract CV URL
    const cvUrl = extractCvUrl(props);

    return Response.json(
      { summary, bio, cvUrl },
      {
        headers: {
          "Cache-Control": `public, max-age=${CACHE_MAX_AGE}`,
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  } catch (err) {
    console.error("Failed to fetch Notion content:", err);
    return Response.json({ error: "Failed to fetch content" }, { status: 502 });
  }
}
