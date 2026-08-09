import { bangs } from "./bang";
import "./global.css";

function noSearchDefaultPageRender() {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  
  // Detect current origin or default to window.location.origin
  const urlTemplate = `${window.location.origin}?q=%s`;

  app.innerHTML = `
    <div class="page-layout">
      <main class="content-container">
        <h1 class="brand-title">Search</h1>
        <p class="tagline">Fast browser search with built-in bang shortcuts. 100% private with zero tracking.</p>
        
        <div class="url-block">
          <span class="url-label">Search Engine URL</span>
          <div class="snippet-pill">
            <code class="snippet-text">${urlTemplate}</code>
            <button class="copy-pill-btn" data-input-id="search-url-input" data-value="${urlTemplate}" aria-label="Copy search engine URL" title="Copy to clipboard">
              <img src="/clipboard.svg" alt="Copy" />
              <span class="copy-tooltip">Copied!</span>
            </button>
          </div>
        </div>

        <div class="url-block">
          <span class="url-label">Google Suggestion URL (Optional)</span>
          <div class="snippet-pill">
            <code class="snippet-text">https://suggestqueries.google.com/complete/search?client=chrome&q=%s</code>
            <button class="copy-pill-btn" data-value="https://suggestqueries.google.com/complete/search?client=chrome&q=%s" aria-label="Copy suggestion URL" title="Copy to clipboard">
              <img src="/clipboard.svg" alt="Copy" />
              <span class="copy-tooltip">Copied!</span>
            </button>
          </div>
        </div>

        <section class="guide-section">
          <h2>How to Enable</h2>
          
          <div class="browser-tabs">
            <button class="tab-btn active" data-tab="chrome">Chrome / Brave / Edge</button>
            <button class="tab-btn" data-tab="firefox">Firefox</button>
            <button class="tab-btn" data-tab="safari">Safari</button>
          </div>

          <div class="tab-content active" id="tab-chrome">
            <ol class="steps-list">
              <li>Open <strong>Settings</strong> &rarr; <strong>Search engine</strong> &rarr; <strong>Manage search engines and site search</strong>.</li>
              <li>Under <strong>Site search</strong>, click <strong>Add</strong>.</li>
              <li>Set <strong>Name</strong> to <code>Search</code>, <strong>Shortcut</strong> to <code>:s</code> (or <code>s</code>), and <strong>URL</strong> to copied Search URL.</li>
              <li>Optionally set <strong>Suggestion URL</strong> if supported by your browser to Google Suggestion URL above.</li>
              <li>Click the three dots next to the entry and select <strong>Make default</strong>.</li>
            </ol>
          </div>

          <div class="tab-content" id="tab-firefox">
            <ol class="steps-list">
              <li>Open <strong>Settings</strong> &rarr; <strong>Search</strong>.</li>
              <li>Scroll down to <strong>Search Shortcuts</strong> and click <strong>Add</strong>.</li>
              <li>Enter <strong>Search</strong> as name and paste the Search URL into <strong>URL</strong>.</li>
              <li>Optionally enter the Suggestion URL into <strong>Search suggestions URL</strong> field.</li>
              <li>Set keyword (e.g., <code>s</code>) or select as your default search engine.</li>
            </ol>
          </div>

          <div class="tab-content" id="tab-safari">
            <ol class="steps-list">
              <li>Install a custom search extension (such as <em>xSearch</em> or <em>Keyword Search</em>) from the App Store.</li>
              <li>Add a custom engine mapping with Search URL above.</li>
              <li>Alternatively, set your default browser search shortcut to trigger this page.</li>
            </ol>
          </div>
        </section>
      </main>

      <footer class="footer">
        A fork of <a href="https://unduck.link" target="_blank" rel="noopener noreferrer">unduck</a> by <a href="https://x.com/theo" target="_blank" rel="noopener noreferrer">Theo</a> • Maintained by <a href="https://raiyansarker.com?utm_source=search_app&utm_medium=footer&utm_campaign=referral" target="_blank" rel="noopener noreferrer">Raiyan</a> • <a href="https://github.com/raiyansarker/search-bangs?utm_source=search_app&utm_medium=footer&utm_campaign=referral" target="_blank" rel="noopener noreferrer">GitHub</a>
      </footer>
    </div>
  `;

  const copyButtons = app.querySelectorAll<HTMLButtonElement>(".copy-pill-btn");

  copyButtons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const val = btn.getAttribute("data-value");
      if (!val) return;

      const copyIcon = btn.querySelector("img")!;
      await navigator.clipboard.writeText(val);
      copyIcon.src = "/clipboard-check.svg";
      btn.classList.add("copied");

      setTimeout(() => {
        copyIcon.src = "/clipboard.svg";
        btn.classList.remove("copied");
      }, 2000);
    });
  });

  const tabButtons = app.querySelectorAll<HTMLButtonElement>(".tab-btn");
  const tabContents = app.querySelectorAll<HTMLDivElement>(".tab-content");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tabTarget = btn.getAttribute("data-tab");
      tabButtons.forEach((b) => b.classList.remove("active"));
      tabContents.forEach((c) => c.classList.remove("active"));

      btn.classList.add("active");
      const targetContent = app.querySelector<HTMLDivElement>(`#tab-${tabTarget}`);
      if (targetContent) {
        targetContent.classList.add("active");
      }
    });
  });
}

const LS_DEFAULT_BANG = localStorage.getItem("default-bang") ?? "g";
const defaultBang = bangs.find((b) => b.t === LS_DEFAULT_BANG);

function getBangredirectUrl() {
  const url = new URL(window.location.href);
  const query = url.searchParams.get("q")?.trim() ?? "";
  if (!query) {
    noSearchDefaultPageRender();
    return null;
  }

  const match = query.match(/!(\S+)/i);

  const bangCandidate = match?.[1]?.toLowerCase();
  const selectedBang = bangs.find((b) => b.t === bangCandidate) ?? defaultBang;

  // Remove the first bang from the query
  const cleanQuery = query.replace(/!\S+\s*/i, "").trim();

  // If the query is just `!gh`, use `github.com` instead of `github.com/search?q=`
  if (cleanQuery === "")
    return selectedBang ? `https://${selectedBang.d}` : null;

  // Format of the url is:
  // https://www.google.com/search?q={{{s}}}
  const searchUrl = selectedBang?.u.replace(
    "{{{s}}}",
    // Replace %2F with / to fix formats like "!ghr+t3dotgg/unduck"
    encodeURIComponent(cleanQuery).replace(/%2F/g, "/"),
  );
  if (!searchUrl) return null;

  return searchUrl;
}

function doRedirect() {
  const searchUrl = getBangredirectUrl();
  if (!searchUrl) return;
  window.location.replace(searchUrl);
}

doRedirect();
