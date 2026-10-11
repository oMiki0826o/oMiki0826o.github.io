/*
 * File: page.tsx
 * Modification: 2026-10-11 — Deduplicate Lab routes and metadata using the shared registry.
 */
import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {AstroCompare} from '@/components/lab/astro-compare';
import {GithubGalaxy} from '@/components/lab/github-galaxy';
import {MinecraftTools} from '@/components/lab/minecraft-tools';
import {SnakeGame} from '@/components/lab/snake-game';
import {StructMarkPlayground} from '@/components/lab/structmark-playground';
import {getLabTool, labTools, type LabToolId} from '@/content/lab-tools';

const components = {
  'pearl-cannon': MinecraftTools,
  'astro-compare': AstroCompare,
  snake: SnakeGame,
  'github-galaxy': GithubGalaxy,
  structmark: StructMarkPlayground
} satisfies Record<LabToolId, React.ComponentType>;

export const dynamicParams = false;
export function generateStaticParams() {
  return labTools.map((item) => ({tool: item.slug}));
}

export async function generateMetadata({params}: {params: Promise<{tool: string}>}): Promise<Metadata> {
  const {tool} = await params;
  return {title: getLabTool(tool)?.title ?? 'Lab', robots: {index: false, follow: false}};
}

export default async function LabToolPage({params}: {params: Promise<{tool: string}>}) {
  const {tool: slug} = await params;
  const item = getLabTool(slug);
  if (!item) notFound();
  const Component = components[item.slug];
  return <main className="lab-shell lab-tool-page">
    <header className="lab-header"><a className="lab-back" href="/lab/">← Lab</a><p className="lab-mark">{item.title}</p></header>
    <div className="lab-tool-content"><Component /></div>
    <footer className="lab-footer"><span>lab / 2026</span><a href="/lab/">back to lab</a></footer>
  </main>;
}
