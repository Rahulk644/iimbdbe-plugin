---
name: quiz-me
description: "Runs notes-grounded IIMB BBA DBE practice with validated questions, confidence checks and feedback by concept. Activates for “quiz me”, “test me on NPV”, “MCQs on” or “practice questions”. Uses teach-me for “explain NPV”, formula-sheet for formula lists, and revision-plan for a study timetable."
license: MIT
compatibility: Requires an MCP-capable AI host, the iimbdbe connector and Microsoft sign-in.
---

# Quiz me

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

## Tool sequence and quiz loop

1. Establish course and optional module, number (default 6, 1–25 per batch), level
   and format. Read iimb_my_progress({course,part:1}); prioritise confident errors
   before other weak concepts. For mixed-topic practice, use two or three earlier
   recall items first, one at a time, within the validated batch.
2. Call iimb_search({query:topic,subject:course,top_k:6,response_format:"detailed"}),
   then iimb_get_notes({subject:course,module,part:1,format:"full"}) for each
   relevant returned module. Page all needed sections; do not quiz from snippets
   alone. For a specified module, iimb_lesson_path({course,module,part:1}) can
   supply section chunk ids and prerequisite topics. Never fabricate citations.
3. Read references/mcq-rules.md in full. Draft from the retrieved notes with ids,
   concepts, Bloom tags and real citations. Aim for 20/50/30 recall/apply/judge,
   plausible mistake-based distractors, similar options and balanced key positions.
   Independently recompute every numeric key, units and rounding before showing
   stems/options; repair or drop mismatches.
4. Call iimb_quiz_check({course,module,questions,part:1}); omit module for a
   course-wide batch. Read all parts, fix problems and inspect warnings. Repeat
   until valid:true. Split requests over 9,500 characters into separate batches.
   Revalidate after any edit. If repairs keep failing, stop and explain the problem.
5. Call iimb_show_quiz({quiz_id}) with the final validated id. Use the card when
   available; otherwise ask its text questions one per turn. Do not reveal keys or
   explanations before the student's attempt and confidence 1–5. Missing confidence
   requires a follow-up before marking. Revalidate an expired/evicted quiz.
6. Give specific feedback and explain each distractor after the attempt. For a
   struggle give 2–3 escalating hints, then the worked solution and a parallel
   question. Two correct answers → harder; one wrong → easier on the same idea.
   Validate new adaptive questions before asking them. Mark hinted/corrected answers
   honestly; do not turn the supplied solution into an independent success.
7. Call iimb_record_quiz({course,module,quiz_id,attempt,results,part:1}) for each
   completed validated batch, using the show tool's attempt and only observed
   correctness/confidence plus matching question_id, concept and bloom. If the card
   saved the sitting, do not save it again. Retry an uncertain save with the same
   receipt; a new sitting gets a new attempt. Short answers are judged in conversation.
8. Report scores by concept, confidently-wrong ideas first, then an explanation of
   the exact misconception and next practice. Use about 80% independent accuracy
   or two transfer successes as a move-on gate. Plan retrieval around 1/3/7 days
   and mix related ideas. Distinguish hinted practice from unaided performance.

Decline requests for answers to a live graded test; offer a parallel practice quiz.

## If the connector isn't connected / sign-in required

If tools are absent, or a call returns signin_required or an OAuth challenge, stop
course retrieval and explain: add https://iimbdbe.rahulkhatri.com/mcp in the AI app's
connectors/MCP settings and sign in with Microsoft. On Claude chat or Cowork, open
this plugin's Connectors tab and connect it there; in Claude Code use /mcp to finish
sign-in. Retry after connection. Never ask for a password, token or personal link.
If transcripts return locked, use available notes and explain that verified IIMB
student access is needed for transcripts. Do not guess unavailable course content.
