import {describe, expect, it} from 'vitest';
import {profile} from '@/content/profile';
import {pinnedProjects, projects} from '@/content/projects';
import {timeline} from '@/content/timeline';
import {getProjectDetail} from '@/content/project-details';
import {getNotesForProject} from '@/content/notes/index';

 describe('site content', () => {
  it('keeps the 5.x homepage identity', () => {
    expect(profile.name).toBe('Miki');
    expect(profile.signature['zh-TW']).toContain('滾滾長江東逝水');
    expect(profile.aboutDetails['zh-TW'].some((section) => section.heading === '簡介' && section.paragraphs.join('').includes('學習日文學到爆炸'))).toBe(true);
  });

  it('keeps the current core projects', () => {
    expect(projects.map((project) => project.slug)).toEqual(['discord-bot', 'miki-website', 'cipher-tool', 'astro-lab', 'stlab', 'cipher-tool-web', 'structmark', 'note-block-tweaks', 'ai-development-governance', 'codex-workspace-web', 'low-y-outpost-finder', 'geyser-floating-points']);
    expect(pinnedProjects.map((project) => project.slug)).toEqual(['discord-bot', 'codex-workspace-web', 'structmark', 'low-y-outpost-finder']);
  });

  it('connects the Discord Bot project with its notes', () => {
    expect(getNotesForProject('discord-bot').map((note) => note.slug).sort()).toEqual([
      'discord-bot-from-zero', 'discord-bot-mod-guide', 'discord-bot-usage-guide'
    ]);
  });

  it('keeps every project linked to a detail page', () => {
    for (const project of projects) {
      expect(getProjectDetail(project.slug)).toBeDefined();
    }
  });

  it('gives every project an authentic local cover image', () => {
    for (const project of projects) {
      expect(project.image).toMatch(/^(\/assets\/projects\/.+\.(png|jpg|jpeg|webp|svg)|https:\/\/(raw\.githubusercontent\.com|opengraph\.githubassets\.com)\/.+)$/);
      expect(project.imageSource).toMatch(/^https:\/\//);
    }
  });

  it('keeps the 2024 Python milestone', () => {
    expect(timeline.some((item) => item.year === '2024')).toBe(true);
  });
});
