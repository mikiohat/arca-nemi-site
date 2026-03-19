# Security Design

## Architecture

This is a fully static Astro site with no server runtime, no authentication, and no database.
Static generation is the single most effective security decision in this project — it eliminates
entire classes of server-side vulnerabilities (SQL injection, SSRF, auth bypass, RCE) by not
having a server to attack at runtime.

All dynamic routes use `getStaticPaths()` and are pre-rendered at build time from hardcoded
content. No user input reaches the build output as executable code.

---

## Security Headers (`public/_headers`)

Headers are declared in `public/_headers`, which is copied verbatim to `dist/` at build time.
Cloudflare Pages reads this file from the build output root and applies the headers on every
response at the edge. No server-side configuration is needed.

### X-Frame-Options: DENY

Prevents this site from being embedded in an iframe on any other origin.
`DENY` (rather than `SAMEORIGIN`) is used because the site has no reason to embed itself,
and no interactive state that could be targeted by a clickjacking attack. The stronger
option was chosen deliberately.

### X-Content-Type-Options: nosniff

Prevents browsers from MIME-sniffing a response away from the declared `Content-Type`.
Without this, a browser might execute a file served as `text/plain` as JavaScript.
Straightforward to add; no downside on a well-structured static site.

### Referrer-Policy: strict-origin-when-cross-origin

Sends the full URL as the referrer for same-origin requests (useful for internal analytics),
but only the origin (no path) for cross-origin requests. This avoids leaking page paths or
query strings to third-party services linked from the site.

### Permissions-Policy

```
camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()
```

Explicitly disables browser APIs the site has no reason to use. Even though no site code
requests these features, this header prevents third-party scripts (e.g. GTM tags added
in future) from silently accessing them. `interest-cohort=()` opts out of Google's
FLoC/Topics advertising cohort tracking.

---

## Content Security Policy

The CSP is intentionally permissive in two areas (`unsafe-inline` and GTM/GA domains)
because of constraints imposed by the tools in use. Each compromise is documented below.

```
default-src 'self';
script-src  'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com;
style-src   'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src    'self' https://fonts.gstatic.com;
img-src     'self' data: https://www.google-analytics.com;
connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com;
frame-src   https://www.googletagmanager.com;
object-src  'none';
base-uri    'self';
```

### Why `unsafe-inline` is present

Astro emits `<style>` blocks inline in the HTML output, and the GTM bootstrap is an
inline `<script>`. Eliminating `unsafe-inline` would require either:
- A per-request nonce injected by a server (not available on a static site), or
- Hashing every inline style and script individually (fragile, breaks on any change).

For a public content site with no user-controlled output, `unsafe-inline` is an
acceptable trade-off. It does not meaningfully increase risk here because there is no
user input that could reach the page as injected markup.

### Why GTM and GA domains are allowed

Google Tag Manager and Google Analytics are intentionally included in this project.
Allowing their domains in `script-src` and `connect-src` is the honest policy — it
reflects exactly what the site does, rather than blocking it silently.

`frame-src` allows `googletagmanager.com` specifically for the GTM `<noscript>` fallback
iframe (`/ns.html`), which activates only for users with JavaScript disabled.

### Why `object-src 'none'`

Blocks all plugin-based content (Flash, Java applets, etc.). There is no use case for
these on this site, and they have historically been a significant attack vector.

### Why `base-uri 'self'`

Prevents an injected `<base>` tag from redirecting all relative URLs to an attacker-
controlled origin. A low-cost directive with no practical downside.

---

## Client-Side Code Practices

These are coding conventions maintained throughout the codebase, independent of headers.

- **No `innerHTML` or `outerHTML` assignments** — all DOM mutations use `textContent`,
  `classList`, or `setAttribute()`, which do not parse or execute markup.
- **No `eval()` or `new Function()`** — no dynamic code execution anywhere in the codebase.
- **Astro template escaping** — all `{variable}` interpolation in `.astro` files is
  HTML-escaped by default. `set:html` is not used.
- **`rel="noopener"` on external links** — prevents linked pages from accessing
  `window.opener` and redirecting the parent tab.

---

## Future Considerations

### Nonce-based CSP (removes `unsafe-inline`)

The strictest improvement available. Would require moving from a fully static build to
a server-rendered or edge-rendered setup (e.g. Astro with a Netlify or Cloudflare adapter).
Each response would inject a unique nonce into inline scripts and styles, making
`unsafe-inline` unnecessary. Worth revisiting if the site ever gains server-side logic.

### Subresource Integrity (SRI) for Google Fonts

Adding `integrity` attributes to the Google Fonts `<link>` tags would ensure the browser
rejects the stylesheet if its contents change unexpectedly. Currently not applied because
Google rotates font file URLs, which makes maintaining SRI hashes impractical without
build tooling to automate it.

### CSP Report-Only monitoring

Adding a `Content-Security-Policy-Report-Only` header alongside the enforcing CSP would
surface any violations (e.g. from newly added GTM tags or browser extensions) without
breaking the site. Useful if GTM usage expands.

### If user input is ever introduced

Any feature that accepts user input (search, comments, forms) must:
- Sanitize and validate on the server before storing or rendering
- Never interpolate raw input into HTML, SQL, or shell commands
- Use parameterized queries if a database is introduced
