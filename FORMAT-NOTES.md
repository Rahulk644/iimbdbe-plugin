# Format decisions and acceptance status

Checked against current official documentation on 2026-11-15 and installed Claude
Code 2.1.319. This file records format evidence, not a claim of live installation.

- [Create a Claude plugin](https://code.claude.com/docs/en/plugins/create),
  [manifest reference](https://code.claude.com/docs/en/plugins/manifest-reference),
  [marketplace reference](https://code.claude.com/docs/en/plugins/marketplace-reference)
  and [components](https://code.claude.com/docs/en/plugins/components): manifests
  live in `.claude-plugin/`, skills and `.mcp.json` at the root. This repository is
  its own single-plugin marketplace using source `./`. Only the plugin manifest
  declares a version; a second version in the marketplace can drift.
- [Claude skill documentation](https://code.claude.com/docs/en/skills): portable
  frontmatter is limited to name, description, license, compatibility, metadata
  and allowed-tools. This package uses only the first four. No tool preapproval
  field is needed because tool prefixes differ across hosts.
- Supporting references are copied inside each skill so individual skill uploads
  are self-contained. The canonical tutor principles live at
  `skills/shared/tutor-principles.md`; canonical MCQ/bias files are under
  `skills/shared/references/`. Shared is not itself a skill: it has no SKILL.md.
  `node scripts/check-shared.mjs` rejects drift. This conservative choice avoids
  depending on cross-skill filesystem access in different hosts.
- [Claude upload layout](https://claude.com/docs/plugins/build): a zip can contain
  the plugin's files directly or one enclosing folder. The site download uses files
  directly: `.claude-plugin/plugin.json`, `.mcp.json`, `skills/`, etc. No `plugin/`
  wrapper, nested archive or OS metadata. Evals, documentation and the dependency-free
  shared-reference checker are included so the download is inspectable source.
- [Platform support](https://claude.com/docs/plugins/platform-support): portable
  skills load in chat, Cowork and Code. A fixed HTTP connector appears in the
  plugin's Connectors tab in chat/Cowork and needs connecting there. No headers,
  user_config, local commands or top-level bin directory are shipped. The documented
  upload limits are 200 MB and 5,000 files, well above this text-only package.
- [Cursor reference](https://cursor.com/docs/reference/plugins): Cursor supports a
  root Agent Plugins manifest or `.cursor-plugin/plugin.json`. We choose the latter,
  with a separate root `mcp.json`, keeping Claude's manifests and `.mcp.json` intact.
  Cursor's version is optional, so it is omitted to keep one version source. Both
  MCP files declare the same fixed HTTP server and are checked for equality.

## Still to accept live

Claude manifest validation is a local format check. It does not test OAuth consent,
Microsoft callbacks, quiz-card display, actual skill triggering or upload acceptance.
The release still needs claude.ai upload, Cowork/Claude Code sign-in, Cursor discovery
and sign-in, and model evals on Haiku, Sonnet and Opus with and without the plugin.
No conflicting format requirement was found in the cited documentation. Published at
https://github.com/Rahulk644/iimbdbe-plugin and https://iimbdbe.rahulkhatri.com/downloads/iimbdbe-plugin.zip.
