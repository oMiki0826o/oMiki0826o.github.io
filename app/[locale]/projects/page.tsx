import {resolveLocale} from '@/i18n/config';
import {getProfile} from '@/lib/content';
import {projects} from '@/content/projects';
import {localize} from '@/lib/content';

export default async function ProjectsPage({params}: {params: Promise<{locale: string}>}) {
  const {locale: rawLocale} = await params;
  const profile = getProfile(resolveLocale(rawLocale));
  return <main className="content-page"><p className="eyebrow">selected work</p><h1>{profile.status}</h1><div className="project-list">{projects.map((project) => <article className="project-card" key={project.slug}><p>{project.stack.join(' · ')}</p><h2>{localize(project.title, resolveLocale(rawLocale))}</h2><p>{localize(project.summary, resolveLocale(rawLocale))}</p><a href={project.href} target="_blank" rel="noreferrer">GitHub ↗</a></article>)}</div></main>;
}
