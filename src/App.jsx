import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("jorgeca003@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const programmingLanguages = [
    "C/C++",
    "C#",
    "VB.Net",
    "LabVIEW",
    "Python",
    "JavaScript",
    "HTML",
    "CSS",
    "Matlab",
    "SQL",
    "React",
  ];

  const softwareTools = [
    "Git",
    "Azure DevOps",
    "Visual Studio",
    "VS Code",
    "MySQL",
    "LabVIEW",
    "LabWindows/CVI",
    "PyCharm",
    "Docker",
  ];

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white transition-colors">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Dark Mode Toggle */}
        <div className="flex justify-end mb-8">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700 transition-all"
            aria-label="Toggle dark mode"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        {/* Hero Section - Profile Card */}
        <section className="mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <img
                  src="/profile.png"
                  alt="Jorge Castro"
                  className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover object-top border-4 border-blue-500 dark:border-blue-400 shadow-lg"
                  loading="eager"
                  style={{ imageRendering: "crisp-edges" }}
                />
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                  Jorge Castro
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4 font-semibold">
                  Software Engineer
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  Results-driven Software Engineer with 9 years of experience in
                  software development, technical support, and test engineering
                  for high-tech and semiconductor industries.
                </p>

                {/* Social Links */}
                <div className="flex gap-4 justify-center md:justify-start">
                  <a
                    href="https://github.com/jorgeca003"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors shadow-md hover:shadow-lg"
                  >
                    <FaGithub className="text-2xl" />
                    <span className="font-medium">GitHub</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/jlcastrog/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg"
                  >
                    <FaLinkedin className="text-2xl" />
                    <span className="font-medium">LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              About Me
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              With 9 years of experience in the tech industri, I specialize in
              software engineering and technical support within Emerson's NI
              Test & Measurement division. I aim to develop innovative solutions
              that align with Emerson's commitment to high-quality standards and
              efficiency. My expertise in LabVIEW, C#, C/C++, Python, and
              JavaScript enables me to contribute unique perspectives and
              diverse experiences to our team's objectives.
            </p>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Skills
            </h2>

            {/* Programming Languages */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                Programming Languages
              </h3>
              <div className="flex flex-wrap gap-3">
                {programmingLanguages.map((skill, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-medium shadow-md hover:shadow-lg hover:bg-blue-200 dark:hover:bg-blue-800/40 transition-colors cursor-pointer"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Software Tools */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                Software Tools
              </h3>
              <div className="flex flex-wrap gap-3">
                {softwareTools.map((tool, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full font-medium shadow-md hover:shadow-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                  >
                    {tool}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Projects
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {/* Content to be added */}
              Coming soon...
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Contact
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Let's connect! Feel free to reach out via email for opportunities,
              collaborations, or just to say hello.
            </p>

            {/* Contact Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:jorgeca003@gmail.com?subject=Portfolio Inquiry"
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg"
              >
                <MdEmail className="text-2xl" />
                <span className="font-medium">Send Email</span>
              </a>

              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors shadow-md hover:shadow-lg"
              >
                <span className="font-medium">
                  {copied ? "✓ Copied!" : "📋 Copy Email"}
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-600 dark:text-gray-400 py-8">
          <p>
            &copy; {new Date().getFullYear()} Jorge Castro. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
