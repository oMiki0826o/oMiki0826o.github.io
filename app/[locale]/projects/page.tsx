import {resolveLocale} from '@/i18n/config';
import {getProfile} from '@/lib/content';
import {projects} from '@/content/projects';
import {localize} from '@/lib/content';

export default async function ProjectsPage({params}: {params: Promise<{locale: string}>}) {
  const {locale: rawLocale} = await params; const locale = resolveLocale(rawLocale);
  const profile = getProfile(locale);
  const label = locale === 'ja' ? '選んだ制作' : '精選作品';
  return <main className="content-page"><p className="eyebrow">{label}</p><h1>{profile.status}</h1><div className="project-list">{projects.map((project) => <article className="project-card" key={project.slug}><p>{project.stack.join(' · ')}</p><h2>{localize(project.title, locale)}</h2><p>{localize(project.summary, locale)}</p><a href={project.href} target="_blank" rel="noreferrer">GitHub ↗</a></article>)}</div></main>;
}
