import {describe, expect, it} from 'vitest';
import {profile} from '@/content/profile';
import {projects} from '@/content/projects';
import {timeline} from '@/content/timeline';

 describe('site content', () => {
  it('keeps the 5.x homepage identity', () => {
    expect(profile.name).toBe('Miki');
    expect(profile.signature['zh-TW']).toContain('滾滾長江東逝水');
    expect(profile.aboutDetails['zh-TW'].some((section) => section.heading === '簡介' && section.paragraphs.join('').includes('學習日文學到爆炸'))).toBe(true);
  });

  it('keeps only the two current core projects', () => {
    expect(projects.map((project) => project.slug)).toEqual(['discord-bot', 'miki-website']);
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
});
