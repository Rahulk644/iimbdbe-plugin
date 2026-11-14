---
name: revision-plan
description: "Builds an IIMB BBA DBE revision schedule using saved weak topics, prerequisites, spaced recall and mixed practice. Activates for “revision plan”, “study timetable”, “plan until my exam” or “schedule my revision”. Uses quiz-me for an immediate test and teach-me for an explanation rather than a calendar."
license: MIT
compatibility: Requires an MCP-capable AI host, the iimbdbe connector and Microsoft sign-in.
---

# Revision plan

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

## Tool sequence and planning loop

1. Obtain exactly one scope: a course name OR term number 1–9. Ask for the exam date
   (YYYY-MM-DD in IST) and available hours per week (number, 1–60) if missing.
   Resolve relative dates explicitly. The exam must be after the start date and
   within 180 days; do not silently change an invalid date or invent availability.
2. Read iimb_my_progress({course,part:1}) for a course or
   iimb_my_progress({part:1}) for a term. Read every part. Prioritise confidently-wrong
   concepts, then other weak ideas, while keeping prerequisite learning first.
3. Call iimb_revision_plan({course,exam_date,hours_per_week,part:1}) OR
   iimb_revision_plan({term,exam_date,hours_per_week,part:1}). Optional start_date
   is YYYY-MM-DD IST; optional focus_modules is an array of exact labels. It changes
   priority, not a promise to remove the remaining course. Do not send both scopes.
4. Read every plan part with the same arguments. A date can span parts using
   block_offset/blocks_total: merge its blocks without losing or repeating them.
   Present date, minutes, module links and concrete actions in a table with headers.
   Preserve 25–50 minute blocks, prerequisite order, roughly 1/3/7-day reviews,
   extra weak-topic reviews, interleaving, weekly buffers and final light review.
   Make each recall block an attempt without notes, then checking the notes and
   explaining errors. A learning block should lead to retrieval, not just rereading.
5. State hours_planned versus hours_needed_estimate, modules_not_fitted,
   reviews_not_fitted and warnings. Explain compressed spacing or unfinished coverage
   plainly; do not promise full coverage in insufficient time. Offer a narrower
   scope or more time, and regenerate only using the student's chosen constraints.
6. For a requested “start now” block, call iimb_lesson_path({course,module,part:1})
   then iimb_get_notes({subject:course,module,part:1,format:"full"}). Ask 2–3
   relevant recall questions one at a time, confidence before reveal, with hints
   and a worked solution after 2–3 hints if stuck. For numeric learning use a
   recomputed worked example → fading → independent transfer. Any scored block
   must follow references/mcq-rules.md, including validation before presentation
   and recording only observed results. Scheduling alone writes no quiz results.
7. Explain that the plan is not saved and checkmarks are temporary. Provide a
   copyable schedule; do not claim reminders or external calendar events exist.
   Apply the mastery gate during practice (about 80% or two correct transfer
   questions); revise the plan from actual performance, not “I get it”.

## If the connector isn't connected / sign-in required

If tools are absent, or a call returns signin_required or an OAuth challenge, stop
course retrieval and explain: add https://iimbdbe.rahulkhatri.com/mcp in the AI app's
connectors/MCP settings and sign in with Microsoft. On Claude chat or Cowork, open
this plugin's Connectors tab and connect it there; in Claude Code use /mcp to finish
sign-in. Retry after connection. Never ask for a password, token or personal link.
If transcripts return locked, use available notes and explain that verified IIMB
student access is needed for transcripts. Do not guess unavailable course content.
