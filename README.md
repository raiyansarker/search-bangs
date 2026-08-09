# Search

A blazingly fast default search engine with built-in DuckDuckGo bang shortcuts.

This project is a clean, minimal fork of [unduck](https://unduck.link) by [Theo](https://x.com/theo), maintained by [Raiyan Sarker](https://raiyansarker.com?utm_source=search_readme&utm_medium=github&utm_campaign=referral).

## Overview

DuckDuckGo's bang redirects can be slow because they perform redirects server-side. **Search** handles all bang matching and URL redirection entirely on the client side inside your browser. After the initial page load, all assets are cached and redirection occurs instantly on your device without waiting for extra server hops.

## Privacy & Zero Tracking Policy

- **No Telemetry / No Analytics**: Search does not collect, log, transmit, or store any personal data, search queries, IP addresses, or browser usage.
- **Client-Side Only**: All query parsing and bang redirects occur locally inside your browser session. Your search terms are never sent to our servers.
- **Zero Third-Party Tracking**: There are no tracking scripts, cookies, or third-party analytics embedded in this application.

## Custom Search URLs

To set up Search in your browser, use the following URL templates:

### Search Engine URL
```text
https://search.raiyansarker.com?q=%s
```

### Google Search Suggestion URL (Optional)
```text
https://suggestqueries.google.com/complete/search?client=chrome&q=%s
```

---

## Instructions: Enabling Search in Your Browser

### Chrome / Brave / Edge
1. Open **Settings** &rarr; **Search engine** &rarr; **Manage search engines and site search**.
2. Scroll to **Site search** and click **Add**.
3. Fill out the fields:
   - **Name**: `Search`
   - **Shortcut**: `:s` or `s`
   - **URL with %s in place of query**: `https://search.raiyansarker.com?q=%s`
4. *(Optional)* Add the Google Suggestion URL if your browser supports custom suggestion endpoints.
5. Click the three dots next to the entry and select **Make default**.

### Firefox
1. Open **Settings** &rarr; **Search**.
2. Scroll to **Search Shortcuts** and click **Add**.
3. Set **Name** to `Search` and paste `https://search.raiyansarker.com?q=%s` into the **URL** field.
4. *(Optional)* Paste `https://suggestqueries.google.com/complete/search?client=chrome&q=%s` into **Search suggestions URL**.
5. Assign a keyword (e.g. `s`) or select it as your default search engine.

### Safari
1. Install a custom search extension like **xSearch** or **Keyword Search** from the App Store.
2. Add a custom engine mapping using `https://search.raiyansarker.com?q=%s`.

---

## Features & Usage

- **Default Search**: Typing `search query` routes to your configured default search engine (Google by default).
- **Bang Shortcuts**: Use any DuckDuckGo bang prefix or suffix:
  - `!g cat photos` &rarr; Searches Google for "cat photos"
  - `!gh search-bangs` &rarr; Searches GitHub for "search-bangs"
  - `!yt lo-fi beats` &rarr; Searches YouTube for "lo-fi beats"
  - `!w quantum computing` &rarr; Searches Wikipedia
- **Direct Domain Banging**: Typing just `!gh` takes you directly to `github.com`.

---

## Local Development

```bash
# Clone the repository
git clone https://github.com/raiyansarker/search-bangs.git
cd search-bangs

# Install dependencies (using Bun or NPM)
bun install

# Start local development server
bun run dev

# Build production bundle
bun run build
```

---

## Credits & License

- Original project by [Theo](https://x.com/theo) ([unduck.link](https://unduck.link) / [GitHub repository](https://github.com/t3dotgg/unduck)).
- Maintained by [Raiyan Sarker](https://raiyansarker.com) ([GitHub](https://github.com/raiyansarker/search-bangs)).
- Licensed under the [MIT License](LICENSE).
