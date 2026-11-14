# IIMB BBA DBE Study Companion

A study plugin for IIM Bangalore's BBA in Digital Business and Entrepreneurship.
It adds five tutoring skills to the [study site's](https://iimbdbe.rahulkhatri.com)
MCP connector: learn from retrieved course notes, practise with feedback and plan
retrieval across several days. This is an independent companion, not an official
IIM Bangalore product. AI explanations can be wrong; check cited notes.

## Install in Claude Code

Run these commands inside Claude Code, in order:

```text
/plugin marketplace add Rahulk644/iimbdbe-plugin
/plugin install iimbdbe@iimbdbe
```

Reload plugins or start a new session if asked. Use `/mcp` to complete the connector's
Microsoft sign-in. The connector address is fixed; no API key or configuration file
editing is needed. The skills also appear as `/iimbdbe:teach-me`, `/iimbdbe:quiz-me`,
`/iimbdbe:revision-plan`, `/iimbdbe:concept-map` and `/iimbdbe:formula-sheet`.

## Install in claude.ai or Cowork

1. [Download iimbdbe-plugin.zip](https://iimbdbe.rahulkhatri.com/downloads/iimbdbe-plugin.zip).
2. Open **Customize › Plugins › Add › Upload plugin** and select the zip.
3. Open the installed plugin's **Connectors** tab, connect **iimbdbe**, and sign in
   with Microsoft when asked. Installation alone does not finish connector sign-in.
4. Ask “Teach me this module” with your course and module, or choose another skill.

Account/workspace availability and administrator policies can affect installation.
The package uses portable skills and a fixed remote HTTP connector, with no local
server, executable hooks or user configuration. Cards may render in supported
hosts; all tools retain text results for hosts without cards.

## What the skills do

| Skill | Use it for | Example request |
| --- | --- | --- |
| Teach me | Prerequisite diagnosis, direct explanation when needed, hints and fading examples | Explain NPV from my course notes |
| Quiz me | Cited, validated practice; confidence before feedback; results by concept | Test me on NPV |
| Revision plan | A prerequisite-aware schedule with weak topics, spaced recall and buffers | Plan revision until my exam |
| Concept map | Real directed graph links, Mermaid and a full text equivalent | How does NPV connect to IRR? |
| Formula sheet | Cited formulas in words and notation, units, pitfalls and checked examples | Make a formula sheet for this module |

Practice asks for an attempt and confidence from 1–5 before revealing answers.
Hints escalate; after 2–3 hints, a stuck student gets a worked solution and a parallel
problem. The skills support understanding and critique of your own work; they do
not write graded submissions or answer live graded tests.

## Cursor and other AI apps

Cursor packaging is included through `.cursor-plugin/plugin.json` and `mcp.json`;
see [format notes](FORMAT-NOTES.md). Cursor installation/discovery has not been
accepted in a live client yet. For the connector alone in Cursor, ChatGPT, VS Code
or another MCP-compatible app, add:

```text
https://iimbdbe.rahulkhatri.com/mcp
```

Sign in with Microsoft. Those apps get the connector's tools; using this plugin's
skills depends on the host's plugin support. The connector also exposes five study
prompts in clients that support MCP prompts. Notes require sign-in through the
connector; lecture transcripts additionally require verified IIMB student access.
If tools are missing, check the connection and sign-in instead of asking the AI to
guess the course material.

## Privacy and saved progress

The plugin contains instructions and connector metadata: no secrets, student data,
course notes or lecture transcripts. Course material is fetched only through the
signed-in connector and stays read-only. The only persistent study write is
`iimb_record_quiz`, which saves completed quiz results and weak topics per student:
question/quiz identifiers, course/module, concept, correctness, reported confidence,
Bloom tag, score and timestamps. It does not save question text, options, answers
or chat text. The server retains up to 200 attempts and 2,000 retry receipts.

Validated quiz drafts (including question text and keys) are held temporarily in
a bounded 24-hour memory cache to validate, display and grade a quiz; they are not
persisted as progress. A restart or eviction can require revalidation. Plans and
revision checkmarks are not saved. There is currently no progress-delete control.

OAuth also stores client approvals, hashed credentials and connection metadata.
Usage analytics include tool/client, course/module, short search queries and status;
no connector credentials, AI prompts or tool-result content are sent to analytics.
Your AI provider handles the conversation under its own terms. Use **Connect your AI**
on the site to disconnect an app or reset a personal-link fallback.

## Maintenance and evaluation

Run `node scripts/check-shared.mjs` from this repository to check that all five
skills carry identical local references. Edit canonical material under
`skills/shared/`, update its five copies, then run the check. No npm install or
website source is required for this check. See [evals/README.md](evals/README.md)
for scenario and trigger tests; no model evaluation has been run for this release.

The plugin's only version declaration is in `.claude-plugin/plugin.json`.
See [FORMAT-NOTES.md](FORMAT-NOTES.md) for the verified packaging choices and
remaining acceptance checks. No hooks or local runtime services are installed.

## Licence

Plugin code and original instructions are [MIT licensed](LICENSE), copyright
2026 Rahul Khatri. This licence does not grant redistribution rights to the course
material retrieved by the connector. Teaching references are linked for context;
third-party skill text has not been copied.
