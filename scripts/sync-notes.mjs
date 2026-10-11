/*
 * File: sync-notes.mjs
 * Modification: 2026-10-11 — 從文章資料夾產生靜態清單，避免新增文章時手動修改 import。
 */
import {readdirSync, existsSync, readFileSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';

const folder = join(process.cwd(), 'content', 'notes');
const target = join(folder, 'index.ts');
const folders = readdirSync(folder, {withFileTypes: true})
  .filter((item) => item.isDirectory())
  .map((item) => item.name)
  .sort((left, right) => left.localeCompare(right));
const input = readFileSync(target, 'utf8');
const anchor = 'export const featuredNote = ';
const anchorAt = input.indexOf(anchor);
if (anchorAt < 0) throw new Error('notes/index.ts lacks the manual featured/pinned note section');
const identifiers = folders.map((slug, i) => {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`Invalid note slug: ${slug}`);
  for (const name of ['meta.ts', 'zh-TW.sm', 'en.sm', 'ja.sm']) {
    if (!existsSync(join(folder, slug, name))) throw new Error(`${slug}: missing ${name}`);
  }
  return {slug, alias: `meta_${i}`};
});
const imports = identifiers.map(({slug,alias}) => `import ${alias} from './${slug}/meta';`).join('\n');
const entries = identifiers.map(({alias}) => `  loadStructMarkNote(${alias})`).join(',\n');
const prefix = `/*\n * File: index.ts\n * Modification: 2026-10-11 — 由 npm run notes:sync 根據目錄自動產生文章註冊表。\n */\nimport {loadStructMarkNote} from '../notes-loader';\nimport {projects} from '../projects';\n${imports}\n\nexport const notes = [\n${entries}\n].sort((left, right) => Date.parse(right.date) - Date.parse(left.date));\n\n`;
const projectBridge = `// ── 由 .sm Front Matter 自動對應 Works；不再複製文章 slug 清單 ──
const knownProjects = new Set(projects.map((project) => project.slug));
for (const note of notes) {
  if (note.projectSlug && !knownProjects.has(note.projectSlug)) {
    throw new Error(\`Note \${note.slug} links to a missing project: \${note.projectSlug}\`);
  }
}

export function getNotesForProject(projectSlug: string) {
  return notes.filter((note) => note.projectSlug === projectSlug);
}

`;
const output = prefix + projectBridge + input.slice(anchorAt);
if (input !== output) {
  if (process.argv.includes('--check')) {
    console.error('Notes registry is outdated; run npm run notes:sync and commit content/notes/index.ts.');
    process.exitCode = 1;
  } else {
    writeFileSync(target, output, 'utf8');
    console.log(`Registered ${identifiers.length} notes.`);
  }
} else {
  console.log(`Note registry up-to-date (${identifiers.length} notes).`);
}
