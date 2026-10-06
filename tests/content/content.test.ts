import {describe, expect, it} from 'vitest';
import {profile} from '@/content/profile';
import {projects} from '@/content/projects';
import {timeline} from '@/content/timeline';

 describe('site content', () => {
  it('keeps the 5.x homepage identity', () => {
    expect(profile.name).toBe('Miki');
    expect(profile.signature['zh-TW']).toContain('欲買桂花同載酒');
  });

  it('contains the three core projects', () => {
    expect(projects).toHaveLength(3);
  });

  it('keeps the 2024 Python milestone', () => {
    expect(timeline.some((item) => item.year === '2024')).toBe(true);
  });
});
