# Practice and quiz rules

Read before any scored check, including short or numeric responses inside another
skill. Notes must support the tested content; validation checks structure and real
source locations, not arithmetic or factual correctness.

## Draft

- Default to 6 questions; accept 1–25 per batch. Keep the entire serialized request
  at most 9,500 characters. Split longer quizzes into separately validated batches.
- Use one best MCQ answer with 3 options (4 only when each distractor is plausible).
  State the full task in the stem; avoid all/none, both/combination answers, verbal
  clues and repeating the key in the stem. Avoid negatives; if essential, emphasise
  **NOT** or **EXCEPT**. Keep options parallel in grammar and similar in length.
- Derive distractors from identifiable misconceptions or calculation errors. Supply
  a rationale for every wrong option, in option order excluding the correct option.
  Balance key positions: no position holds more than half of a multi-MCQ batch.
- Aim for roughly 20% remember/understand, 50% apply/analyse and 30% evaluate.
  Small quizzes may vary; inspect validator warnings and explain justified deviations.
- Every item has an id, type (mcq, numeric, short), stem, explanation, concept,
  bloom (remember, understand, apply, analyse, evaluate), and citation. The citation
  is either {chunk_id} from a real retrieved hit/lesson section OR {module, section}
  with an exact existing note heading; never combine both forms. Show a human-readable
  module/section citation and returned module URL beside every presented item.
  Prefer module + section when exact headings are available. With chunk ids,
  retain their retrieved module/section mapping and provide that source list beside
  the card as well, since the card may display only the raw chunk id.
- MCQs additionally have options, zero-based answer_index and distractor_rationales.
  Numeric items have numeric_answer, unit and appropriate nonnegative tolerance.
  State all inputs, units, rounding and timing conventions in their stems. Numeric
  MCQs also need independently checked calculations and consistent keys/options.
  Short items use explanation as a marking guide; assess them conversationally.

## Recompute, validate, repair, then show

1. Independently recompute every numeric key from the stated inputs before showing
   any question, options or answer. Check units, timing, rounding and tolerance.
   If the recomputation disagrees, repair the item or drop it, including its distractors.
2. Call iimb_quiz_check({course, module?, questions, part:1}). Read all returned
   parts with the same payload and increasing part. Fix every problem, inspect
   warnings, and resubmit until valid:true and a quiz_id are returned. Do not show
   an invalid draft. If repeated repairs fail, stop and explain instead of looping.
3. If any text, option, key or citation changes after validation, recompute as needed
   and revalidate. Call iimb_show_quiz({quiz_id}) only for the final validated draft.
   Drafts expire after 24 hours and may disappear on restart/eviction; revalidate
   on expiry. Tool names can have host prefixes: select the connected iimbdbe
   server's tool whose base name matches these names; do not call shell commands.
4. In text hosts ask one question at a time, then wait for an attempt and confidence
   1–5 before revealing feedback. Keep keys, numeric_answer, explanation and
   distractor rationales out of student-visible questions. In card hosts use the
   validated card; do not paste UI-only answer metadata into the conversation.
5. Explain the reasoning and each distractor after the attempt and confidence.
   Adapt subsequent batches: two right → harder; one wrong → easier on that idea.
   New adaptive items must pass this same validation loop before presentation.
6. After completion call iimb_record_quiz({course, module?, quiz_id, attempt,
   results:[{question_id, concept, correct, confidence, bloom}], part:1}). Copy ids,
   concepts and Bloom tags from the validated draft; record only observed answers
   and student-reported confidence. Use the attempt returned by iimb_show_quiz.
   Always obtain a show result for the sitting; do not guess an attempt number.
   Retry the same quiz_id and attempt only for a transport retry; a new sitting
   needs a new attempt.
   Do not record results twice if the card already saved them. If save status is
   uncertain, retry the identical receipt rather than creating a second sitting.
7. Report by concept, flag confident errors first, and set the next retrieval review.
   The server requires one result for every question in the validated batch. If a
   session is incomplete, do not record a partial payload or invent missing answers;
   finish the batch first. Keep future batches short enough to complete.
   Record a hinted/corrected failure honestly, not as an unaided success.

For newly created examples the first validation may need smaller batches. A valid
response does not certify a question's truth, fairness or learning value: review it.
