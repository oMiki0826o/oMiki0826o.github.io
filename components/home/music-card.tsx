'use client';
import {useState} from 'react';
export function MusicCard(){const [open,setOpen]=useState(false);return <section className="music-card"><button onClick={()=>setOpen(!open)} aria-expanded={open}>♫ Now playing <span>{open?'−':'+'}</span></button>{open&&<p>播放清單會在此載入；音樂永遠由你主動開始。</p>}</section>}
