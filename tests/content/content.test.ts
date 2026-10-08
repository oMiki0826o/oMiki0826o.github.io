import {describe, expect, it} from 'vitest';
import {profile} from '@/content/profile';
import {pinnedProjects, projects} from '@/content/projects';
import {timeline} from '@/content/timeline';
import {getProjectDetail} from '@/content/project-details';
import {calculatePearlCannon, createPearlSettings, genericFtlVersions} from '@/lib/pearl-calculator';

 describe('site content', () => {
  it('keeps the 5.x homepage identity', () => {
    expect(profile.name).toBe('Miki');
    expect(profile.signature['zh-TW']).toContain('滾滾長江東逝水');
    expect(profile.aboutDetails['zh-TW'].some((section) => section.heading === '簡介' && section.paragraphs.join('').includes('學習日文學到爆炸'))).toBe(true);
  });

  it('keeps only the two current core projects', () => {
    expect(projects.map((project) => project.slug)).toEqual(['discord-bot', 'miki-website', 'cipher-tool']);
    expect(pinnedProjects.map((project) => project.slug)).toEqual(['discord-bot', 'cipher-tool', 'miki-website']);
  });

  it('connects the Discord Bot project with its notes', () => {
    expect(getProjectDetail('discord-bot')?.relatedNoteSlugs).toEqual([
      'discord-bot-from-zero',
      'discord-bot-usage-guide',
      'discord-bot-mod-guide'
    ]);
  });

  it('keeps every project linked to a detail page', () => {
    for (const project of projects) {
      expect(getProjectDetail(project.slug)).toBeDefined();
    }
  });

  it('gives every project an authentic local cover image', () => {
    for (const project of projects) {
      expect(project.image).toMatch(/^\/assets\/projects\/.+\.(png|jpg|jpeg|webp)$/);
      expect(project.imageSource).toMatch(/^https:\/\//);
    }
  });

  it('keeps the 2024 Python milestone', () => {
    expect(timeline.some((item) => item.year === '2024')).toBe(true);
  });

  it('calculates pearl cannon direction and two-side charge', () => {
    const results = calculatePearlCannon([0, 170, 0], [1000, 1000]);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0]?.direction).toBe('E');
    expect(results[0]?.sideA).toBeTypeOf('number');
    expect(results[0]?.sideB).toBeTypeOf('number');
  });

  it('keeps generic FTL presets extensible without changing the UI inputs', () => {
    expect(genericFtlVersions.length).toBeGreaterThanOrEqual(3);
    expect(createPearlSettings({maxCharge: 80}).maxCharge).toBe(80);
  });
});
