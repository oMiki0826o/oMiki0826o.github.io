'use client';

import {useCallback, useEffect, useRef, useState} from 'react';

type Point = {x: number; y: number};
type Direction = Point;
const size = 18;
const startSnake = [{x: 8, y: 9}, {x: 7, y: 9}, {x: 6, y: 9}];
const startFood = {x: 13, y: 6};

function same(a: Point, b: Point) { return a.x === b.x && a.y === b.y; }
function nextFood(snake: Point[]): Point {
  const open = Array.from({length: size * size}, (_, index) => ({x: index % size, y: Math.floor(index / size)})).filter((point) => !snake.some((part) => same(part, point)));
  return open[Math.floor(Math.random() * open.length)] ?? startFood;
}

export function SnakeGame() {
  const [snake, setSnake] = useState(startSnake);
  const [food, setFood] = useState(startFood);
  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const direction = useRef<Direction>({x: 1, y: 0});
  const nextDirection = useRef<Direction>({x: 1, y: 0});
  const snakeRef = useRef(snake);
  const foodRef = useRef(food);
  snakeRef.current = snake;
  foodRef.current = food;

  const turn = useCallback((next: Direction) => {
    const current = direction.current;
    if (next.x + current.x === 0 && next.y + current.y === 0) return;
    nextDirection.current = next;
    setRunning(true);
  }, []);

  const reset = useCallback(() => {
    direction.current = {x: 1, y: 0};
    nextDirection.current = {x: 1, y: 0};
    setSnake(startSnake); setFood(startFood); setGameOver(false); setRunning(false);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const keys: Record<string, Direction> = {ArrowUp: {x: 0, y: -1}, ArrowDown: {x: 0, y: 1}, ArrowLeft: {x: -1, y: 0}, ArrowRight: {x: 1, y: 0}};
      if (keys[event.key]) { event.preventDefault(); turn(keys[event.key]!); }
      if (event.key === ' ' && gameOver) reset();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [gameOver, reset, turn]);

  useEffect(() => {
    if (!running || gameOver) return;
    const timer = window.setInterval(() => {
      direction.current = nextDirection.current;
      const head = snakeRef.current[0]!;
      const next = {x: head.x + direction.current.x, y: head.y + direction.current.y};
      const hitWall = next.x < 0 || next.x >= size || next.y < 0 || next.y >= size;
      const ate = same(next, foodRef.current);
      const body = ate ? snakeRef.current : snakeRef.current.slice(0, -1);
      if (hitWall || body.some((part) => same(part, next))) { setGameOver(true); setRunning(false); return; }
      const updated = [next, ...body];
      setSnake(updated);
      if (ate) setFood(nextFood(updated));
    }, 145);
    return () => window.clearInterval(timer);
  }, [gameOver, running]);

  const score = Math.max(0, snake.length - startSnake.length);
  return <section className="snake-game" aria-label="Snake game">
    <div className="snake-heading"><div><p className="lab-eyebrow">LAB / 03</p><h2>Snake</h2></div><div className="snake-score"><span>score</span><strong>{String(score).padStart(2, '0')}</strong></div></div>
    <div className="snake-board" aria-hidden="true">{Array.from({length: size * size}, (_, index) => { const point = {x: index % size, y: Math.floor(index / size)}; const head = same(point, snake[0]!); const part = snake.some((item) => same(item, point)); return <i className={head ? 'snake-cell snake-head' : part ? 'snake-cell snake-body' : same(point, food) ? 'snake-cell snake-food' : 'snake-cell'} key={index} />; })}</div>
    <div className="snake-status" role="status" aria-live="polite">{gameOver ? '撞到了。按下重新開始，再來一次。' : running ? '保持移動。' : '按方向鍵或下方按鈕開始。'}</div>
    <div className="snake-controls" aria-label="Snake controls"><button className="snake-up" type="button" onClick={() => turn({x: 0, y: -1})}>↑</button><div className="snake-row"><button type="button" onClick={() => turn({x: -1, y: 0})}>←</button><button type="button" onClick={() => turn({x: 0, y: 1})}>↓</button><button type="button" onClick={() => turn({x: 1, y: 0})}>→</button></div></div>
    <button className="snake-reset" type="button" onClick={reset}>{gameOver ? '重新開始' : '重設'}</button>
  </section>;
}
