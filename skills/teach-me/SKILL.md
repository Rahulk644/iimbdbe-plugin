---
name: teach-me
description: "Guides IIMB BBA DBE learning from course notes with prerequisite checks, hints and worked examples. Activates for “teach me”, “explain NPV”, “help me understand” or a module walkthrough. Uses quiz-me for “test me on NPV”, revision-plan for schedules, and formula-sheet for a formula reference."
license: MIT
compatibility: Requires an MCP-capable AI host, the iimbdbe connector and Microsoft sign-in.
---

# Teach me

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

## Tool sequence and teaching loop

1. Establish course, module, goal and level; use iimb_search({query:topic,
   subject:course, top_k:6, response_format:"detailed"}) if only a topic is given.
   Resolve the returned module before teaching. Read iimb_my_progress({course,part:1}).
2. Call iimb_lesson_path({course,module,part:1}), then
   iimb_get_notes({subject:course,module,part:1,format:"full"}) for the relevant
   section parts. Read all lesson parts and note sections needed for the topic.
   “Learn first” identifies prerequisites; “Related in other courses” is optional
   and must never block starting. If no earlier prerequisite exists, begin here.
3. Revisit confident errors and weak topics first. Turn diagnostic_topics into
   2–3 brief recall/application questions, one at a time; they are topics, not
   ready-made questions. Use only relevant prior learning for prerequisite diagnosis.
   Ask for an attempt and confidence 1–5 before feedback. Keep this diagnostic
   unscored unless it has passed the scored-check flow below.
4. Explain one concept with a [n] module/section link. Use direct explanation for
   unfamiliar complex ideas, Socratic why/how questions for review or judgement.
   If needed, call iimb_get_transcript({subject:course,module,part:1}) only for
   missing lecture detail; respect locks and page it like notes.
5. For numeric ideas, show an independently recomputed instructional worked example,
   then a partly completed parallel problem, then independent transfer. Vary Indian
   ₹ lakh/crore and global US$ settings without stereotypes. Withhold practice
   answers until an attempt; escalate 2–3 hints, then a worked solution if stuck.
6. For a scored check follow references/mcq-rules.md: iimb_quiz_check({course,
   module,questions,part:1}), repair until valid, independently recompute numeric
   keys, then iimb_show_quiz({quiz_id}). Ask confidence before reveal. After
   observed completion call iimb_record_quiz with the returned quiz_id, attempt
   and validated question ids/results as specified in that reference.
7. Move on after about 80% independent accuracy or two correct transfer answers.
   Otherwise repair the misconception and try again with less demanding practice.
   End with a recall question and the student's own summary; suggest 1/3/7-day
   retrieval reviews and mixing this method with a related one.

For a graded submission, offer explanation, critique of the student's own draft
or a parallel example; do not produce a submittable response.

## If the connector isn't connected / sign-in required

If tools are absent, or a call returns signin_required or an OAuth challenge, stop
course retrieval and explain: add https://iimbdbe.rahulkhatri.com/mcp in the AI app's
connectors/MCP settings and sign in with Microsoft. On Claude chat or Cowork, open
this plugin's Connectors tab and connect it there; in Claude Code use /mcp to finish
sign-in. Retry after connection. Never ask for a password, token or personal link.
If transcripts return locked, use available notes and explain that verified IIMB
student access is needed for transcripts. Do not guess unavailable course content.
