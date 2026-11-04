import {describe, expect, it} from 'vitest';
import {profile} from '@/content/profile';
import {pinnedProjects, projects} from '@/content/projects';
import {timeline} from '@/content/timeline';
import {getProjectDetail} from '@/content/project-details';
import {getNotesForProject} from '@/content/notes/index';

describe('personal website content', () => {
  it('keeps the original personal identity', () => {
    expect(profile.name).toBe('Miki');
    expect(profile.signature['zh-TW']).toContain('滾滾長江東逝水');
    expect(profile.aboutDetails['zh-TW'].some((section) => section.heading === '簡介' && section.paragraphs.join('').includes('學習日文學到爆炸'))).toBe(true);
  });

  it('keeps authentic public projects and selected works', () => {
    expect(projects.map((project) => project.slug)).toEqual(['discord-bot', 'miki-website', 'cipher-tool', 'astro-lab', 'stlab', 'cipher-tool-web', 'structmark', 'note-block-tweaks', 'ai-development-governance']);
    expect(pinnedProjects.map((project) => project.slug)).toEqual(['discord-bot', 'structmark', 'astro-lab', 'stlab']);
  });

  it('links technical writing to related works', () => {
    expect(getNotesForProject('discord-bot').map((note) => note.slug).sort()).toEqual([
      'discord-bot-from-zero', 'discord-bot-mod-guide', 'discord-bot-usage-guide'
    ]);
  });

  it('keeps each project detail and real local cover', () => {
    for (const project of projects) {
      expect(getProjectDetail(project.slug)).toBeDefined();
      expect(project.image).toMatch(/^\/assets\/projects\/.+\.(png|jpg|jpeg|webp|svg)$/);
      expect(project.imageSource).toMatch(/^https:\/\//);
    }
  });

  it('keeps historic milestones for the About page', () => {
    expect(timeline.some((item) => item.year === '2024')).toBe(true);
  });
});
