# Study-skill evaluations

These are evaluation specifications, not reports of model runs. Each skill JSON
contains four scenarios: prompt, setup notes and observable assertions. There are
22 routing queries in `triggers.json`, including near misses. No course notes,
transcripts, credentials or student histories are embedded here.

## Manual procedure

1. Use a disposable session with the plugin enabled and a mock connector (or an
   authorised non-production test account). Resolve course/module labels against
   actual metadata. Supply the setup conditions without copying private course text
   into this repository. Fix dates to each scenario's mock clock or adjust future
   dates consistently. Simulate validation errors, missing connections and timeouts.
2. Run the prompt and continue through the specified student turns. Capture visible
   responses and tool-call traces. A multi-turn assertion is not passed just because
   the first response promises to follow it. For record calls use a mock; no evaluation
   should write to a production student's progress. Include card and text-only paths.
3. Mark each assertion pass/fail with the exact turn/tool call as evidence. Verify
   calculations independently. Check citation existence, pre-reveal confidence,
   no premature answers, mastery gate, fairness, accessibility and integrity.
4. Repeat in a fresh session without the plugin with the same connector, metadata,
   clock and student replies. This measures the instruction benefit over the existing
   MCP prompts/tools. Keep scored and unscored checks distinguishable.
5. Repeat with Haiku, Sonnet and Opus; record exact model/version, host, date and
   fixture differences. Use three runs per condition when practical; report assertion
   rates and with/without differences rather than claiming deterministic behaviour.
6. For every trigger query use a fresh session. Inspect which skills are actually
   selected in the trace: all should_trigger entries should load, and no
   should_not_trigger entry should load. A correct topic answer alone is not proof
   of correct routing. Re-test failed near misses after description edits.

Keep traces and result reports outside the distributed plugin tree, redact student
identifiers, and distinguish not-tested assertions from failures. All asserted
behaviours need review; passing these cases is not a security or teaching guarantee.

## Installed CLI support

`claude plugin --help` and `claude plugin eval --help` on Claude Code 2.1.319 confirm
that native plugin evals exist, including `--model`, `--ablation with-without`,
`--concurrency 1`, `--no-publish` and mock-server support. Native discovery expects
`case.yaml` or `prompt.md` plus `graders/*.md`, not these JSON specifications.

This release uses the manual procedure above. To automate later, translate each
scenario into the documented native case layout, implement its multi-turn setup
and connector mocks, and turn assertions into graders before invoking:

```sh
claude plugin eval ./plugin --model sonnet --ablation with-without --concurrency 1 --no-publish
```

That example runs from the website repository's parent of `plugin/`; for this
standalone repository use `.` instead. Do not run it against the JSON files and
interpret zero discovered cases as success. Real servers and scaffold scripts
require explicit CLI opt-ins; do not enable those just to make a case run.
See [native eval documentation](https://code.claude.com/docs/en/plugin-evals).
No model evals were run while preparing this source release.
