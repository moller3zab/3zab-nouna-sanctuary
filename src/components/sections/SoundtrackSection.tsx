import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, Plus, Play, Pause, Disc, ExternalLink, Trash2, Edit3 } from 'lucide-react';
import type { Song } from '../../types';
import { INITIAL_SONGS } from '../../data/initialData';
import { subscribeCollection, addItem, updateItem, removeItem } from '../../lib/store';
import { Modal } from '../ui/Modal';
import { Input, TextArea } from '../ui/Input';
import { Button } from '../ui/Button';
import { useIdentity } from '../../context/IdentityContext';

export const SoundtrackSection: React.FC = () => {
  const { identity } = useIdentity();
  const [songs, setSongs] = useState<Song[]>(INITIAL_SONGS);
  const [activeSong, setActiveSong] = useState<Song>(INITIAL_SONGS[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState<'spotify' | 'youtube' | 'sound-cloud' | 'other'>('spotify');
  const [note, setNote] = useState('');

  useEffect(() => {
    const unsub = subscribeCollection<Song>('songs', INITIAL_SONGS, (data) => {
      setSongs(data);
      if (data.length > 0 && !activeSong) {
        setActiveSong(data[0]);
      }
    });
    return () => unsub();
  }, []);

  const resetForm = () => {
    setTitle('');
    setArtist('');
    setUrl('');
    setPlatform('spotify');
    setNote('');
    setEditingId(null);
  };

  const handleAddSong = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !artist) return;

    const data = {
      title,
      artist,
      platform,
      url: url || '#',
      coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80',
      note: note || 'A special track added to our sacred sanctuary playlist.',
      duration: '03:30',
      createdBy: identity,
    };

    if (editingId) {
      await updateItem('songs', editingId, data);
    } else {
      await addItem<Partial<Song>>('songs', data);
    }

    resetForm();
    setIsModalOpen(false);
  };

  const handleEditSong = (item: Song) => {
    setTitle(item.title);
    setArtist(item.artist);
    setUrl(item.url);
    setPlatform(item.platform);
    setNote(item.note || '');
    setEditingId(item.id);
    setIsModalOpen(true);
  };

  const handleDeleteSong = (id: string) => {
    if (window.confirm("Are you sure you want to delete this song?")) {
      removeItem('songs', id);
    }
  };

  const getEmbedUrl = (url: string, platform: string) => {
    if (!url || url === '#') return null;
    
    try {
      if (platform === 'youtube' || url.includes('youtube.com') || url.includes('youtu.be')) {
        let videoId = '';
        if (url.includes('youtu.be/')) {
          videoId = url.split('youtu.be/')[1].split('?')[0];
        } else if (url.includes('youtube.com/watch')) {
          const urlParams = new URL(url).searchParams;
          videoId = urlParams.get('v') || '';
        } else if (url.includes('youtube.com/embed/')) {
          videoId = url.split('youtube.com/embed/')[1].split('?')[0];
        }
        if (videoId) return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      }
      
      if (platform === 'spotify' || url.includes('spotify.com')) {
        if (url.includes('/track/')) {
          const trackId = url.split('/track/')[1].split('?')[0];
          return `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`;
        }
      }
    } catch (e) {
      return null;
    }
    
    return null;
  };

  const embedUrl = activeSong ? getEmbedUrl(activeSong.url, activeSong.platform) : null;

  return (
    <section id="soundtrack" className="py-16 flex flex-col gap-8 scroll-mt-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold tracking-widest text-secondary uppercase block mb-1">
            ACOUSTIC SANCTUARY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary dark:text-surface-bright tracking-tight">
            Our Soundtrack
          </h2>
          <p className="text-sm text-ink-muted dark:text-ink-dark-muted mt-1">
            "Every love story needs its own melody."
          </p>
        </div>

        <Button onClick={() => setIsModalOpen(true)} className="gap-2 shadow-md">
          <Plus className="w-4 h-4" />
          <span>Add Song</span>
        </Button>
      </div>

      {/* Active Vinyl Player Strip */}
      {embedUrl ? (
        <div className="bg-surface-container dark:bg-surface-dark-card p-4 sm:p-6 rounded-3xl shadow-elevated border border-primary/10 dark:border-white/10 w-full max-w-3xl mx-auto overflow-hidden">
          {embedUrl.includes('youtube') ? (
            <div className="w-full aspect-video rounded-xl overflow-hidden shadow-inner">
              <iframe width="100%" height="100%" src={embedUrl} title="YouTube player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
          ) : (
            <div className="w-full rounded-xl overflow-hidden shadow-inner" style={{ height: '152px' }}>
              <iframe src={embedUrl} width="100%" height="100%" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-surface-container dark:bg-surface-dark-card p-6 sm:p-8 rounded-3xl shadow-elevated border border-primary/10 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 w-full md:w-auto">
            {/* Vinyl Visual */}
            <div className="relative w-20 h-20 rounded-full bg-[#1a1618] flex items-center justify-center shrink-0 shadow-2xl">
              <motion.div
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                className="w-full h-full rounded-full flex items-center justify-center border-4 border-[#2d2426]"
              >
                <div className="w-8 h-8 rounded-full bg-secondary-light flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-surface-lowest" />
                </div>
              </motion.div>
            </div>

            {/* Song info */}
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-bold tracking-widest text-secondary uppercase">
                CURRENT HARMONY
              </span>
              <h3 className="font-serif text-2xl font-bold text-primary dark:text-surface-bright">
                {activeSong ? activeSong.title : 'Until I Found You'}
              </h3>
              <span className="text-xs text-ink-muted dark:text-ink-dark-muted font-medium">
                {activeSong ? activeSong.artist : 'Stephen Sanchez'}
              </span>
            </div>
          </div>

          {/* Dynamic Soundwave Bars */}
          <div className="flex items-center gap-1.5 h-10 px-6 py-2 bg-surface-low dark:bg-white/5 rounded-2xl w-full md:w-64 justify-center">
            {[...Array(10)].map((_, i) => (
              <motion.span
                key={i}
                animate={{ height: isPlaying ? [10, 32, 14, 28, 10] : 10 }}
                transition={{ repeat: Infinity, duration: 1 + i * 0.1, ease: 'easeInOut' }}
                className={`w-1 rounded-full ${i % 2 === 0 ? 'bg-primary dark:bg-secondary-light' : 'bg-secondary'}`}
              />
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-12 h-12 rounded-full bg-primary dark:bg-primary-container text-white flex items-center justify-center shadow-md hover:scale-105 transition-all"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
            </button>
            <span className="text-xs font-semibold text-ink-subtle dark:text-ink-dark-muted hidden sm:inline">
              {isPlaying ? 'Playing in sanctuary' : 'Paused'}
            </span>
          </div>
        </div>
      )}

      {/* Song Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {songs.map((song) => (
          <div
            key={song.id}
            role="button"
            tabIndex={0}
            onClick={() => {
              setActiveSong(song);
              setIsPlaying(true);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setActiveSong(song);
                setIsPlaying(true);
              }
            }}
            aria-label={`Play ${song.title} by ${song.artist}`}
            className="group cursor-pointer bg-surface-lowest dark:bg-surface-dark-card p-6 rounded-2xl shadow-soft border border-primary/10 dark:border-white/10 flex flex-col justify-between transition-all hover:-translate-y-0.5 hover:shadow-elevated focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-secondary-light dark:focus-visible:ring-offset-surface-dark"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full bg-surface-low dark:bg-white/10 text-primary dark:text-secondary-light text-[10px] font-bold tracking-widest uppercase flex items-center gap-1">
                  <Music className="w-3 h-3 text-secondary" />
                  <span>{song.platform}</span>
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-ink-subtle">{song.duration || '03:30'}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={(event) => { event.stopPropagation(); handleEditSong(song); }}
                      className="text-ink-subtle hover:text-primary transition-colors"
                      title="Edit Song"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(event) => { event.stopPropagation(); handleDeleteSong(song.id); }}
                      className="text-ink-subtle hover:text-red-500 transition-colors"
                      title="Delete Song"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <h4 className="font-serif text-xl font-bold text-primary dark:text-surface-bright">
                {song.title}
              </h4>
              <span className="text-xs text-ink-muted dark:text-ink-dark-muted block mb-3 font-medium">
                {song.artist}
              </span>

              {song.note && (
                <div className="p-3 rounded-xl bg-surface-low dark:bg-white/5 border border-primary/5 text-xs">
                  <span className="text-[10px] font-bold text-secondary uppercase block mb-1">
                    WHY THIS SONG?
                  </span>
                  <p className="text-ink dark:text-surface-bright italic">"{song.note}"</p>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-primary/5 dark:border-white/5 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-bold text-primary dark:text-secondary-light">
                <Play className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                <span>Tap to play</span>
              </span>
              {song.url && song.url !== '#' && (
                <a
                  href={song.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => event.stopPropagation()}
                  className="text-ink-subtle hover:text-primary transition-colors"
                  aria-label={`Open ${song.title} on ${song.platform}`}
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {songs.length === 0 && (
        <div className="p-12 text-center bg-surface-low dark:bg-white/5 rounded-2xl border border-dashed border-primary/20 text-ink-muted">
          <p className="font-serif italic text-lg">"Every love story needs a soundtrack."</p>
        </div>
      )}

      {/* Add Song Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); resetForm(); }}
        title={editingId ? "Edit Song" : "Add Song to Playlist"}
        subtitle="OUR MELODY"
      >
        <form onSubmit={handleAddSong} className="flex flex-col gap-4">
          <Input
            label="Song Title"
            placeholder="e.g. Until I Found You"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Input
            label="Artist Name"
            placeholder="e.g. Stephen Sanchez"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">
                Platform
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as any)}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-low dark:bg-white/5 border border-primary/10 text-ink dark:text-surface-bright text-xs font-semibold"
              >
                <option value="spotify">Spotify</option>
                <option value="youtube">YouTube</option>
                <option value="sound-cloud">SoundCloud</option>
                <option value="other">Other</option>
              </select>
            </div>
            <Input
              label="Song Link URL"
              placeholder="https://..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <TextArea
            label="Why this song? (Optional)"
            rows={3}
            placeholder="Why is this track special to us..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <Button type="submit" className="mt-2" fullWidth>
            Save Song
          </Button>
        </form>
      </Modal>
    </section>
  );
};
