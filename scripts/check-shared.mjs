import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const skillNames = ['teach-me', 'quiz-me', 'revision-plan', 'concept-map', 'formula-sheet'];
export const referenceNames = ['tutor-principles.md', 'mcq-rules.md', 'bias-checklist.md'];

// Runs without npm or the website repository after plugin/ is published as-is.
export async function checkShared(root = fileURLToPath(new URL('../', import.meta.url))) {
  for (const file of referenceNames) {
    const canonical = await readFile(path.join(root, 'skills/shared', file === 'tutor-principles.md' ? file : `references/${file}`));
    for (const skill of skillNames) {
      const copy = await readFile(path.join(root, 'skills', skill, 'references', file));
      if (!canonical.equals(copy)) throw new Error(`Shared reference differs: ${skill}/references/${file}`);
    }
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await checkShared();
  console.log('Shared tutor references match in all five skills.');
}
