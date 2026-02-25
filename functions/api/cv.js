/**
 * Cloudflare Pages Function – GET /api/cv
 *
 * Fetches the current CV URL from Notion and redirects the user to it.
 * This gives you a permanent /api/cv link that always points to the latest CV,
 * even if the underlying OneDrive/Notion URL changes.
 *
 * Required env vars (set in Cloudflare Pages dashboard):
 *   NOTION_API_KEY       – Internal integration token
 *   NOTION_DATABASE_ID   – Database ID containing a "CV" property
 */

const NOTION_VERSION = "2022-06-28";

async function getCvUrl(apiKey, databaseId) {
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
    throw new Error(`Notion API error ${res.status}`);
  }

  const data = await res.json();
  const page = data.results?.[0];
  if (!page) return null;

  const props = page.properties;
  const cv = props.CV || props.cv;
  if (!cv) return null;

  if (cv.type === "url") return cv.url;
  if (cv.type === "rich_text") {
    const texts = cv.rich_text;
    return texts?.length > 0 ? texts.map((t) => t.plain_text).join("") : null;
  }
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
    const cvUrl = await getCvUrl(apiKey, databaseId);

    if (!cvUrl) {
      return Response.json(
        { error: "CV URL not found in Notion" },
        { status: 404 },
      );
    }

    // Redirect to the actual file (OneDrive share link, etc.)
    return Response.redirect(cvUrl, 302);
  } catch (err) {
    console.error("Failed to fetch CV URL:", err);
    return Response.json({ error: "Failed to fetch CV" }, { status: 502 });
  }
}
