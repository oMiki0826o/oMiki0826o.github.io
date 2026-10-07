'use client';

import {useState} from 'react';

type TributeFlower = {
  id: number;
  left: number;
  top: number;
  glyph: string;
  start: number;
  end: number;
  scale: number;
};

const tributeFlowers = ['🥀', '❤️‍🩹', '🎆', '🥵'];

export default function RipMiki() {
  const [flowers, setFlowers] = useState<TributeFlower[]>([]);

  function leaveTribute(event: React.MouseEvent<HTMLElement>) {
    const start = Math.floor(Math.random() * 60) - 30;
    const end = Math.floor(Math.random() * 360);
    setFlowers((current) => [...current, {
      id: Date.now() + current.length,
      left: event.clientX,
      top: event.clientY,
      glyph: tributeFlowers[Math.floor(Math.random() * tributeFlowers.length)],
      start,
      end,
      scale: Number((Math.random() * 0.5 + 0.75).toFixed(2))
    }]);
  }

  return (
    <main className="rip" onClick={leaveTribute}>
      <div className="rip-side-line rip-side-line-left" aria-hidden="true" />
      <div className="rip-side-line rip-side-line-right" aria-hidden="true" />

      <div className="grave-layout">
        <div className="rip-left-space">
          <p className="rip-vertical-text rip-couplet-left">襲擊各服一舉之力收編眾生</p>
          <p className="rip-vertical-text rip-descendants-main"><span>列祖列宗</span>首都媽媽 牢魏 水藍色洋蔥 胎裡</p>
          <p className="rip-vertical-text rip-descendants-main rip-descendants-offset">暨嬌生慣養全體世子孫仝立</p>
        </div>

        <div className="rip-center-tombstone">
          <div className="rip-engraved-frame">
            <div className="rip-black-ribbon" aria-hidden="true" />
            <div className="rip-photo-mask">
              <img src="/assets/miki-avatar.jpeg" alt="omiki" width="169" height="219" />
            </div>
          </div>
          <h1 className="rip-grave-main-name">故 菜菜之墓</h1>
        </div>

        <div className="rip-right-space">
          <p className="rip-vertical-text rip-date-text">民 國 一 一 五 年 五 月 十 六 日 子 時 壽 終</p>
          <p className="rip-vertical-text rip-couplet-right">手握小男娘之衣服</p>
        </div>
      </div>

      <p className="rip-silence-notice">【 全體成員 默哀 2 分鐘 · 願 omiki 安息 】</p>

      {flowers.map((flower) => (
        <span
          className="rip-flower"
          key={flower.id}
          aria-hidden="true"
          style={{
            left: flower.left,
            top: flower.top,
            '--rip-rotate-start': `${flower.start}deg`,
            '--rip-rotate-end': `${flower.end}deg`,
            '--rip-scale': flower.scale
          } as React.CSSProperties}
        >
          {flower.glyph}
        </span>
      ))}
    </main>
  );
}
