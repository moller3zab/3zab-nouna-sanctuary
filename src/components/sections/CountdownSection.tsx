import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Heart, Plane, Star, Plus, Trash2, X } from 'lucide-react';
import { subscribeCollection, addItem, removeItem } from '../../lib/store';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import type { Countdown } from '../../types';

const ICON_MAP: Record<string, React.ReactNode> = {
  calendar: <Calendar className="w-5 h-5" />,
  heart: <Heart className="w-5 h-5" />,
  plane: <Plane className="w-5 h-5" />,
  star: <Star className="w-5 h-5" />,
};

const INITIAL_COUNTDOWNS: Countdown[] = [
  {
    id: 'c1',
    title: 'ذكرى أول خروجة',
    targetDate: '2027-09-04T00:00:00',
    icon: 'heart',
    createdAt: Date.now() - 50000,
  },
];

function getTimeLeft(targetDate: string) {
  const now = new Date().getTime();
  const target = new Date(targetDate).getTime();
  const diff = target - now;

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, passed: true };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    passed: false,
  };
}

export const CountdownSection: React.FC = () => {
  const [countdowns, setCountdowns] = useState<Countdown[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newIcon, setNewIcon] = useState<'calendar' | 'heart' | 'plane' | 'star'>('heart');
  const [_, setTick] = useState(0);

  useEffect(() => {
    const unsub = subscribeCollection<Countdown>('countdowns', INITIAL_COUNTDOWNS, setCountdowns);
    return () => unsub();
  }, []);

  // Tick every second for live countdown
  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAdd = async () => {
    if (!newTitle.trim() || !newDate) return;
    await addItem('countdowns', {
      title: newTitle.trim(),
      targetDate: new Date(newDate).toISOString(),
      icon: newIcon,
    });
    setNewTitle('');
    setNewDate('');
    setShowAdd(false);
  };

  const handleDelete = async (id: string) => {
    await removeItem('countdowns', id);
    setCountdowns(prev => prev.filter(c => c.id !== id));
  };

  return (
    <section id="countdowns" className="py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-primary dark:text-surface-bright">
            ⏳ العد التنازلي
          </h2>
          <p className="text-sm text-ink-muted dark:text-ink-dark-muted mt-1">
            أحداثنا القادمة
          </p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {countdowns.map((cd) => {
          const time = getTimeLeft(cd.targetDate);
          return (
            <motion.div
              key={cd.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-surface-lowest dark:bg-surface-dark-card p-5 rounded-2xl border border-primary/10 dark:border-white/10 shadow-soft relative group"
            >
              <button
                onClick={() => handleDelete(cd.id)}
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-500 transition-all hover:scale-110"
              >
                <Trash2 className="w-3 h-3" />
              </button>

              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-secondary/10 dark:bg-secondary/20 flex items-center justify-center text-secondary">
                  {ICON_MAP[cd.icon] || ICON_MAP.heart}
                </div>
                <h3 className="text-sm font-bold text-ink dark:text-surface-bright">{cd.title}</h3>
              </div>

              {time.passed ? (
                <div className="text-center py-2">
                  <span className="text-lg font-bold text-secondary">🎉 حان الوقت!</span>
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { val: time.days, label: 'يوم' },
                    { val: time.hours, label: 'ساعة' },
                    { val: time.minutes, label: 'دقيقة' },
                    { val: time.seconds, label: 'ثانية' },
                  ].map((unit) => (
                    <div key={unit.label} className="flex flex-col items-center bg-surface-low dark:bg-white/5 p-2 rounded-xl">
                      <span className="font-serif text-xl sm:text-2xl font-bold text-primary dark:text-surface-bright">
                        {unit.val}
                      </span>
                      <span className="text-[9px] font-bold tracking-wider text-ink-subtle dark:text-ink-dark-muted uppercase">
                        {unit.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Add Modal */}
      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="إضافة حدث جديد">
        <div className="space-y-4">
          <Input label="اسم الحدث" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="مثلاً: عيد ميلاد أنفال" />
          <div>
            <label className="block text-xs font-semibold text-ink-muted dark:text-ink-dark-muted mb-1.5 uppercase tracking-wider">التاريخ</label>
            <input
              type="datetime-local"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="w-full bg-surface-low dark:bg-white/5 border border-primary/10 dark:border-white/10 rounded-xl px-3 py-2.5 text-sm text-ink dark:text-surface-bright focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-ink-muted dark:text-ink-dark-muted mb-1.5 uppercase tracking-wider">الأيقونة</label>
            <div className="flex gap-2">
              {(['heart', 'calendar', 'plane', 'star'] as const).map((icon) => (
                <button
                  key={icon}
                  onClick={() => setNewIcon(icon)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all ${newIcon === icon ? 'border-primary bg-primary/5 dark:bg-primary/20 text-primary' : 'border-transparent bg-surface-low dark:bg-white/5 text-ink-muted hover:bg-surface-high'}`}
                >
                  {ICON_MAP[icon]}
                </button>
              ))}
            </div>
          </div>
          <Button onClick={handleAdd} disabled={!newTitle.trim() || !newDate}>إضافة</Button>
        </div>
      </Modal>
    </section>
  );
};
