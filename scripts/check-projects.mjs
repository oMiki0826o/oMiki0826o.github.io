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
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug)) fail(`Invalid slug ${project.slug}`);
  if (slugs.has(project.slug)) fail(`Duplicate slug ${project.slug}`);
  slugs.add(project.slug);
  checkText(project.title, `${project.slug}.title`);
  checkText(project.description, `${project.slug}.description`);
  if (project.category !== 'web' && project.category !== 'tools') fail(`Unknown category: ${project.slug}`);
  if (!project.tags.length || project.tags.some((tag) => typeof tag !== 'string' || !tag.trim())) fail(`Invalid tags: ${project.slug}`);
  checkExternalUrl(project.url, `${project.slug}.url`);
  checkExternalUrl(project.imageSource, `${project.slug}.imageSource`);
  if (project.demoUrl) checkExternalUrl(project.demoUrl, `${project.slug}.demoUrl`);
  if (!/^\/assets\/projects\/[a-z0-9-]+\.(?:png|jpe?g|webp|svg)$/.test(project.image)) fail(`Unsafe image path: ${project.slug}`);
  const imagePath = join(process.cwd(), 'public', project.image.slice(1));
  if (!statSync(imagePath).isFile()) fail(`Missing project cover: ${imagePath}`);
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
if (pinnedProjects.length !== 3 || new Set(pinnedProjects.map((project) => project.slug)).size !== 3) fail('Homepage must contain three distinct pinned works');
console.log(`Works registry validated: ${projects.length} projects, ${projectDetails.length} detail pages, ${pinnedProjects.length} featured.`);
