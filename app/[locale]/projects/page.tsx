import {resolveLocale} from '@/i18n/config';
import {projects} from '@/content/projects';
import {localize} from '@/lib/content';
import {ContentPage} from '@/components/layout/content-page';
import type {Metadata} from 'next';
import {buildPageMetadata} from '@/lib/metadata';
import {ui} from '@/i18n/ui';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale: rawLocale} = await params;
  const locale = resolveLocale(rawLocale);
  return buildPageMetadata({locale, pathname: '/projects', title: ui[locale].pages.projectsTitle, description: ui[locale].pages.projectsLead});
}

export default async function ProjectsPage({params}: {params: Promise<{locale: string}>}) {
  const {locale: rawLocale} = await params;
  const locale = resolveLocale(rawLocale);
  return (
    <ContentPage
      locale={locale}
      eyebrow="works"
      title={ui[locale].pages.projectsTitle}
      lead={ui[locale].pages.projectsLead}
    >
      <div className="page-projects">
        {projects.map((project) => (
          <article className="page-project" key={project.slug}>
            <a className="page-project-cover" href={project.url} target="_blank" rel="noreferrer" aria-label={`${localize(project.title, locale)} GitHub`}>
              <img src={project.image} alt="" loading="lazy" />
            </a>
            <small>{project.tags.join(' · ')}</small>
            <h2>{localize(project.title, locale)}</h2>
            <p>{localize(project.description, locale)}</p>
            <a href={project.url} target="_blank" rel="noreferrer">GitHub →</a>
          </article>
        ))}
      </div>
    </ContentPage>
  );
}
