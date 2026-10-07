import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {locales, resolveLocale} from '@/i18n/config';
import {getProjectDetail} from '@/content/project-details';
import {projects} from '@/content/projects';
import {localize, localizedPath} from '@/lib/content';
import {buildPageMetadata} from '@/lib/metadata';
import {ContentPage} from '@/components/layout/content-page';

export function generateStaticParams() { return locales.flatMap((locale) => projects.map((project) => ({locale, slug: project.slug}))); }

export async function generateMetadata({params}: {params: Promise<{locale: string; slug: string}>}): Promise<Metadata> {
  const {locale: rawLocale, slug} = await params; const locale = resolveLocale(rawLocale); const project = getProjectDetail(slug); if (!project) return {};
  return buildPageMetadata({locale, pathname: `/projects/${slug}`, title: localize(project.title, locale), description: localize(project.lead, locale)});
}

export default async function ProjectDetailPage({params}: {params: Promise<{locale: string; slug: string}>}) {
  const {locale: rawLocale, slug} = await params; const locale = resolveLocale(rawLocale); const project = getProjectDetail(slug); const summary = projects.find((item) => item.slug === slug);
  if (!project || !summary) notFound();
  return <ContentPage locale={locale} eyebrow="works / project" title={localize(project.title, locale)} lead={localize(project.lead, locale)} backHref={localizedPath(locale, '/projects')} backLabel="← Works"><div className="project-detail"><img className="project-detail-cover" src={summary.image} alt="" /><div className="project-detail-tags">{summary.tags.join(' · ')}</div>{project.sections.map((section) => <section key={section.heading['zh-TW']}><h2>{localize(section.heading, locale)}</h2><p>{localize(section.body, locale)}</p></section>)}<Link className="project-detail-link" href={summary.url} target="_blank">GitHub →</Link></div></ContentPage>;
}
