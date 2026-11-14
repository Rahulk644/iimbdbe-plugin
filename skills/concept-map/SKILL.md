---
name: concept-map
description: "Explores IIMB BBA DBE concept relationships using the retrieved graph, with Mermaid and a text explanation. Activates for “concept map”, “how does NPV connect to IRR”, “map these ideas” or “prerequisite links”. Uses teach-me for a single-concept explanation and revision-plan for scheduling prerequisites."
license: MIT
compatibility: Requires an MCP-capable AI host, the iimbdbe connector and Microsoft sign-in.
---

# Concept map

Read [tutor principles](references/tutor-principles.md) and the
[bias checklist](references/bias-checklist.md) before starting. For any scored
practice, also read [MCQ and recording rules](references/mcq-rules.md).
Use the connected iimbdbe server's actual MCP tools (host prefixes may vary).
Call tools with the exact argument names below; placeholders represent retrieved
or student-supplied values, not literal strings. Do not invent tool results.

Read every relevant part when a result exposes part/parts. Keep identical arguments
and increase part until all parts are read. For old content tools use subject;
for study tools prefer course. When scope is unclear, use iimb_list_subjects({})
then iimb_list_modules({subject:course}) and resolve ambiguity with the student.

## Tool sequence and mapping loop

1. Obtain a concept or module; ask if neither is supplied. Resolve the course when
   needed using discovery/search. Read iimb_my_progress({course,part:1}) if known,
   otherwise iimb_my_progress({part:1}). Give confident errors and weak links priority.
2. For a module call iimb_lesson_path({course,module,part:1}), then
   iimb_get_notes({subject:course,module,part:1,format:"full"}). Earlier prerequisites
   and optional cross-course links have different roles; do not merge them.
   For a concept call iimb_search({query:concept,subject:course,top_k:6,
   response_format:"detailed"}) (omit subject if unknown), then read relevant
   modules with iimb_get_notes using the returned subject and module labels.
3. Call iimb_concepts({action:"find",query:concept,top_k:10}) for each focus idea.
   Use returned ids in iimb_concepts({action:"related",query:concept_id,top_k:10}).
   Narrow a truncated neighbourhood with smaller top_k/focus queries; do not claim
   an exhaustive map when tool limits omit links. A missing graph match is a gap,
   not permission to invent nodes or edges.
4. Draw a small Mermaid map using only returned from/to direction, relationship
   type and why. A prerequisite arrow runs required idea → dependent idea;
   builds-on runs extending idea → foundational idea. Preserve exact graph direction
   rather than assuming all arrows mean prerequisite. Label graph facts and cite
   module/section URLs from notes for their teaching context. Put any proposed
   inferred relation in a separate, explicitly “inferred” list outside the graph.
5. Describe every edge in plain text, with its direction and meaning, so the diagram
   is fully usable without rendering or colour. Use safe short node identifiers and
   quote labels. Where theories disagree, attribute the competing positions and
   evidence, and distinguish the course view from general knowledge.
6. Ask the student to explain 2–3 links, one per turn, without looking at the map.
   For review sessions begin with 2–3 recall questions on earlier ideas. Require an
   attempt and confidence 1–5 before evaluating. Use escalating hints and, after
   2–3 hints, a direct worked explanation plus a parallel link to explain.
   For unfamiliar numeric links, give one checked example then fade the next.
7. Require about 80% on an independent check or two correct transfer explanations
   before expanding the map. End with the student's own explanation and schedule
   mixed retrieval of the links around 1/3/7 days. Unscored link discussion writes
   nothing; scored checks must use the full references/mcq-rules.md workflow.

## If the connector isn't connected / sign-in required

If tools are absent, or a call returns signin_required or an OAuth challenge, stop
course retrieval and explain: add https://iimbdbe.rahulkhatri.com/mcp in the AI app's
connectors/MCP settings and sign in with Microsoft. On Claude chat or Cowork, open
this plugin's Connectors tab and connect it there; in Claude Code use /mcp to finish
sign-in. Retry after connection. Never ask for a password, token or personal link.
If transcripts return locked, use available notes and explain that verified IIMB
student access is needed for transcripts. Do not guess unavailable course content.
