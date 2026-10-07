import {fireEvent, render, screen, within} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {NotesIndex} from '@/components/notes/notes-index';
import {featuredNote, notes} from '@/content/notes';

describe('NotesIndex', () => {
  it('filters the editorial list without hiding the selected note', () => {
    render(<NotesIndex locale="zh-TW" notes={notes} featuredNote={featuredNote} />);

    fireEvent.click(screen.getByRole('button', {name: 'Astronomy'}));

    expect(screen.getByRole('heading', {name: '夜空入門：從北極星開始認星'})).toBeInTheDocument();
    expect(screen.queryByRole('heading', {name: 'Discord Bot 使用教學'})).not.toBeInTheDocument();
  });

  it('restores every note from the all filter', () => {
    const {container} = render(<NotesIndex locale="zh-TW" notes={notes} featuredNote={featuredNote} />);

    fireEvent.click(within(container).getByRole('button', {name: 'Astronomy'}));
    fireEvent.click(within(container).getByRole('button', {name: '全部'}));

    expect(within(container).getByRole('heading', {name: 'Discord Bot 使用教學'})).toBeInTheDocument();
  });
});
