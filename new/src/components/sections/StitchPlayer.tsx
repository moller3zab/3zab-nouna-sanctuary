import { useEffect, useState } from 'react';
import { Music, Play, X, SkipBack, SkipForward, Shuffle, Plus } from 'lucide-react';
import type { Song } from '../../types';
export function StitchPlayer({song,songs,onSelect,onAdd,embedUrl}:{song:Song|null;songs:Song[];onSelect:(song:Song)=>void;onAdd:()=>void;embedUrl:string|null}) {
  const [opened,setOpened]=useState(false);
  const [playing,setPlaying]=useState(false);
  useEffect(()=>{setOpened(false);setPlaying(false);},[song?.id]);
  const select=(offset:number)=>{const index=songs.findIndex(s=>s.id===song?.id);onSelect(songs[(index+offset+songs.length)%songs.length]);};
  return <div className="stitch-studio">
    <div className="stitch-vinyl-side"><div className={`stitch-vinyl ${playing?'is-playing':''}`}><i/><i/><div><span>3zab ♡ Nouna</span><small>SIDE A</small></div></div><p>Squidward’s Music Studio</p><small>A little melody for our little world.</small></div>
    <div className="stitch-track"><div className="stitch-track-heading"><div><p className="ocean-eyebrow">CURRENTLY RESONATING</p><h3>{song?.title||'Our next favorite song'}</h3><p>{song?.artist||'Add a song to start our soundtrack.'}</p></div><button onClick={onAdd}><Plus size={15}/> Add Song</button></div>
      <div className={`stitch-wave ${playing?'is-playing':''}`} aria-hidden="true">{[18,34,44,26,39,20,32,46,23,36,27,18].map((height,i)=><span key={i} style={{height,animationDelay:`${i*.11}s`}}/>)}</div>
      <div className="stitch-controls"><button aria-label="Shuffle songs" disabled={songs.length<2} onClick={()=>{const other=songs.filter(s=>s.id!==song?.id);onSelect(other[Math.floor(Math.random()*other.length)]);}}><Shuffle size={19}/></button><button aria-label="Previous song" disabled={songs.length<2} onClick={()=>select(-1)}><SkipBack size={21}/></button><button className="stitch-play" aria-label={opened?'Close music player':'Open music player'} disabled={!song} onClick={()=>setOpened(v=>!v)}>{opened?<X size={22}/>:<Play size={23}/>}</button><button aria-label="Next song" disabled={songs.length<2} onClick={()=>select(1)}><SkipForward size={21}/></button><span>{opened?'Use the player below to listen':'Press play to open your track'}</span></div>
      {opened&&song&&<div className="stitch-provider">{embedUrl?<iframe title="Music player" src={embedUrl} allow="encrypted-media; fullscreen; picture-in-picture" allowFullScreen/>:/\.(mp3|wav|ogg|m4a)(\?|$)/i.test(song.url)?<audio controls src={song.url} onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)} onEnded={()=>setPlaying(false)}/>:<a href={song.url} target="_blank" rel="noopener noreferrer"><Music size={18}/> Listen on the original service</a>}</div>}
    </div>
  </div>;
}
