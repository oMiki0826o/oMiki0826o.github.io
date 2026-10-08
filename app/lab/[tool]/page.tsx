import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {AstroCompare} from '@/components/lab/astro-compare';
import {GithubGalaxy} from '@/components/lab/github-galaxy';
import {MinecraftTools} from '@/components/lab/minecraft-tools';
import {SnakeGame} from '@/components/lab/snake-game';

const tools = ['pearl-cannon', 'astro-compare', 'snake', 'github-galaxy'] as const;
type Tool = typeof tools[number];

export function generateStaticParams() { return tools.map((tool) => ({tool})); }

export async function generateMetadata({params}: {params: Promise<{tool: string}>}): Promise<Metadata> {
  const {tool} = await params;
  const titles: Record<string, string> = {'pearl-cannon': 'Pearl cannon calculator', 'astro-compare': 'Astro compare', snake: 'Snake', 'github-galaxy': 'GitHub galaxy'};
  return {title: titles[tool] ?? 'Lab', robots: {index: false, follow: false}};
}

function titleFor(tool: Tool) { return ({'pearl-cannon': 'Pearl cannon calculator', 'astro-compare': 'Astro compare', snake: 'Snake', 'github-galaxy': 'GitHub galaxy'} as const)[tool]; }

export default async function LabToolPage({params}: {params: Promise<{tool: string}>}) {
  const {tool: rawTool} = await params;
  if (!tools.includes(rawTool as Tool)) notFound();
  const tool = rawTool as Tool;
  return <main className="lab-shell lab-tool-page"><header className="lab-header"><a className="lab-back" href="/lab/">← Lab</a><p className="lab-mark">{titleFor(tool)}</p></header><div className="lab-tool-content">{tool === 'pearl-cannon' ? <MinecraftTools /> : tool === 'astro-compare' ? <AstroCompare /> : tool === 'snake' ? <SnakeGame /> : <GithubGalaxy />}</div><footer className="lab-footer"><span>lab / 2026</span><a href="/lab/">back to lab</a></footer></main>;
}
