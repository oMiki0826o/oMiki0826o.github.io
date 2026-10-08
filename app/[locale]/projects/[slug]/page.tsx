import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {locales, resolveLocale} from '@/i18n/config';
import {getProjectDetail} from '@/content/project-details';
import {projects} from '@/content/projects';
import {notes} from '@/content/notes/index';
import {localize, localizedPath} from '@/lib/content';
import {buildPageMetadata} from '@/lib/metadata';
import {ContentPage} from '@/components/layout/content-page';
import {ui} from '@/i18n/ui';

export function generateStaticParams() { return locales.flatMap((locale) => projects.map((project) => ({locale, slug: project.slug}))); }

export async function generateMetadata({params}: {params: Promise<{locale: string; slug: string}>}): Promise<Metadata> {
  const {locale: rawLocale, slug} = await params; const locale = resolveLocale(rawLocale); const project = getProjectDetail(slug); if (!project) return {};
  return buildPageMetadata({locale, pathname: `/projects/${slug}`, title: localize(project.title, locale), description: localize(project.lead, locale)});
}

export default async function ProjectDetailPage({params}: {params: Promise<{locale: string; slug: string}>}) {
  const {locale: rawLocale, slug} = await params; const locale = resolveLocale(rawLocale); const project = getProjectDetail(slug); const summary = projects.find((item) => item.slug === slug);
  if (!project || !summary) notFound();
  const relatedNotes = (project.relatedNoteSlugs ?? []).map((noteSlug) => notes.find((note) => note.slug === noteSlug)).filter((note): note is typeof notes[number] => Boolean(note));
  return <ContentPage locale={locale} eyebrow="works / project" title={localize(project.title, locale)} lead={localize(project.lead, locale)} backHref={localizedPath(locale, '/projects')} backLabel={`← ${ui[locale].common.backProjects}`}><div className="project-detail"><img className="project-detail-cover" src={summary.image} alt="" /><div className="project-detail-tags">{summary.tags.join(' · ')}</div>{project.sections.map((section) => <section key={section.heading['zh-TW']}><h2>{localize(section.heading, locale)}</h2><p>{localize(section.body, locale)}</p></section>)}{relatedNotes.length > 0 ? <aside className="related-notes" aria-label={ui[locale].projects.related}><h2>{ui[locale].projects.related}</h2>{relatedNotes.map((note) => <Link href={localizedPath(locale, `/notes/${note.slug}`)} key={note.slug}>{localize(note.title, locale)} <b className="note-arrow" aria-hidden="true">→</b></Link>)}</aside> : null}<Link className="project-detail-link" href={summary.url} target="_blank">GitHub →</Link></div></ContentPage>;
}
