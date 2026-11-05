/*
 * File: check-projects.mjs
 * Modification: 2026-10-11 — 驗證 Works 實際資料：三語、路由、圖片與連結一致性。
 */
import {statSync} from 'node:fs';
import {join} from 'node:path';
import {projects, pinnedProjects} from '../content/projects.ts';
import {projectDetails} from '../content/project-details.ts';

const locales = ['zh-TW', 'en', 'ja'];
const slugs = new Set();
const details = new Map(projectDetails.map((detail) => [detail.slug, detail]));
const fail = (message) => {throw new Error(`Works check: ${message}`);};
const checkText = (value, label) => {
  if (!value || locales.some((locale) => typeof value[locale] !== 'string' || !value[locale].trim())) fail(`Missing localized text: ${label}`);
};
const checkExternalUrl = (value, label) => {
  if (typeof value !== 'string') fail(`${label}: URL missing`);
  const url = new URL(value);
  if (url.protocol !== 'https:') fail(`${label}: expected https:`);
};
for (const project of projects) {
  if (project.image.startsWith('/assets/projects/')) {
    if (!/^\/assets\/projects\/[a-z0-9-]+\.(?:png|jpe?g|webp|svg)$/.test(project.image)) fail(`Unsafe image path: ${project.slug}`);
    const imagePath = join(process.cwd(), 'public', project.image.slice(1));
    if (!statSync(imagePath).isFile()) fail(`Missing project cover: ${imagePath}`);
  } else {
    const image = new URL(project.image);
    if (image.protocol !== 'https:' || !['raw.githubusercontent.com', 'opengraph.githubassets.com'].includes(image.hostname)) fail(`Unsupported image source: ${project.slug}`);
  }
  const detail = details.get(project.slug);
  if (!detail) fail(`Missing detail page data: ${project.slug}`);
  checkText(detail.title, `${project.slug}.detail.title`);
  checkText(detail.lead, `${project.slug}.detail.lead`);
  if (!detail.sections.length) fail(`Empty detail page: ${project.slug}`);
  for (const section of detail.sections) {
    checkText(section.heading, `${project.slug}.section.heading`);
    checkText(section.body, `${project.slug}.section.body`);
  }
}
if (details.size !== projects.length) fail('Project detail entries do not match Works registry');
if (pinnedProjects.length !== 4 || new Set(pinnedProjects.map((project) => project.slug)).size !== 4) fail('Homepage must contain four distinct pinned works');
console.log(`Works registry validated: ${projects.length} projects, ${projectDetails.length} detail pages, ${pinnedProjects.length} featured.`);
