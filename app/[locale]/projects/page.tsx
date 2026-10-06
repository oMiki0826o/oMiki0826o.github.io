import {resolveLocale} from '@/i18n/config';
import {projects} from '@/content/projects';
import {localize} from '@/lib/content';
import {ContentPage} from '@/components/layout/content-page';

export default async function ProjectsPage({params}: {params: Promise<{locale: string}>}) {
  const {locale: rawLocale} = await params;
  const locale = resolveLocale(rawLocale);
  return (
    <ContentPage
      locale={locale}
      eyebrow="works"
      title={locale === 'ja' ? '制作実績' : '做過的東西'}
      lead={locale === 'ja' ? 'いま作っているものと、これまで形にしてきたもの。' : '正在做的東西，以及一路整理成形的作品。'}
    >
      <div className="page-projects">
        {projects.map((project) => (
          <article className="page-project" key={project.slug}>
            <small>{project.tags.join(' · ')}</small>
            <h2>{localize(project.title, locale)}</h2>
            <p>{localize(project.description, locale)}</p>
            <a href={project.url} target="_blank" rel="noreferrer">GitHub ↗</a>
          </article>
        ))}
      </div>
    </ContentPage>
  );
}
