---
name: formula-sheet
description: "Builds a cited IIMB BBA DBE formula reference with variables, units, selection rules, pitfalls and checked examples for self-testing. Activates for “formula sheet”, “equations for this module” or “formula reference”. Uses teach-me for “explain NPV” and quiz-me for “test me on NPV” rather than a reference sheet."
license: MIT
compatibility: Requires an MCP-capable AI host, the iimbdbe connector and Microsoft sign-in.
---

# Formula sheet

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

## Tool sequence and formula loop

1. Establish course and optional module or topic. Read
   iimb_my_progress({course,part:1}); prioritise confident errors, then weak formulas.
2. Call iimb_search({query:topic,subject:course,top_k:6,response_format:"detailed"}),
   then iimb_get_notes({subject:course,module,part:1,format:"full"}) for every
   relevant module. For a specified module, iimb_lesson_path({course,module,part:1})
   can identify ordered sections and chunk ids. Read every needed note part before
   extracting equations. Do not fill gaps with uncited formulas; any optional
   general knowledge belongs in a separately labelled section, outside course tests.
3. For each formula provide a module/section [n] link, notation AND words,
   definitions of all variables, units, assumptions, timing/compounding and rounding
   conventions, when to use it, and a common mistake. Keep a table readable by
   placing long worked steps in short paragraphs beneath it. Distinguish equivalent
   notation from formulas with different assumptions.
4. Independently recompute one illustrative worked example per formula, checking
   inputs, substitutions, units and result. Use varied Indian ₹ lakh/crore and
   global US$ examples. This instructional example may show its solution; a new
   practice question must wait for the student's attempt and confidence 1–5.
5. Include a self-test view: prompts to recall the formula from words, choose among
   similar methods, explain a pitfall or supply a missing step. Keep these separate
   from worked solutions so the student can cover the reference. Start a practice
   session with 2–3 recall questions on earlier relevant formulas, one at a time.
6. Use worked example → partially completed → independent transfer, skipping help
   already mastered. Hints first for practice; after 2–3 escalating hints give the
   worked solution and another parallel example. Give exact feedback, no flattery.
   For scored practice read references/mcq-rules.md: iimb_quiz_check, repair/recompute
   until valid, iimb_show_quiz, then attempt/confidence/feedback and iimb_record_quiz
   with observed results and the returned attempt. Never record sheet creation as
   a completed quiz. Use the exact argument shapes in that reference.
7. Advance after about 80% independent accuracy or two correct transfer responses;
   ask the student to explain why a method fits, not merely substitute numbers.
   Suggest mixed retrieval around 1/3/7 days. Do not provide an exam answer key or
   complete a graded calculation; offer a parallel example or critique their attempt.

## If the connector isn't connected / sign-in required

If tools are absent, or a call returns signin_required or an OAuth challenge, stop
course retrieval and explain: add https://iimbdbe.rahulkhatri.com/mcp in the AI app's
connectors/MCP settings and sign in with Microsoft. On Claude chat or Cowork, open
this plugin's Connectors tab and connect it there; in Claude Code use /mcp to finish
sign-in. Retry after connection. Never ask for a password, token or personal link.
If transcripts return locked, use available notes and explain that verified IIMB
student access is needed for transcripts. Do not guess unavailable course content.
