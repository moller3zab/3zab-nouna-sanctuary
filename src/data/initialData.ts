import type { Milestone, Memory, Song, LoveReason, Letter, OpenWhen, Thing21, FutureDream, ChatMessage, Favorite, Polaroid } from '../types';

export const INITIAL_MILESTONES: Milestone[] = [
  {
    id: 'm1',
    title: 'The Beginning',
    subtitle: 'A Science Lesson at Ahmed\'s House',
    date: 'Summer 2025',
    location: 'Our Neighborhood',
    description: 'Anfal first arrived at Ahmed\'s house for a science lesson. We weren\'t instantly close; in fact, we didn\'t speak for a season. But living streets apart, every accidental glance dissolved the distance until conversations restarted, deeper and sweeter than before.',
    tags: ['First Meeting', 'Science Lesson', 'Destiny'],
    createdBy: '3zab',
    createdAt: Date.now() - 1000000
  },
  {
    id: 'm2',
    title: 'Our Historic First Date',
    subtitle: 'Zamalek & The Nile Corniche',
    date: '04.09.2026',
    location: 'Zamalek, Cairo',
    description: 'Our very first official date. The world moved in slow motion as we walked alongside the Nile breeze, shared quiet laughs over hot drinks, snuck into the cinema, and realized four hours felt like four seconds. The day our forever gained its permanent date stamp.',
    tags: ['First Date', 'Zamalek', 'Nile Walk', 'Cinema'],
    photos: [
      '/first-date.jpeg',
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80'
    ],
    createdBy: '3zab',
    createdAt: Date.now() - 500000
  }
];

export const INITIAL_MEMORIES: Memory[] = [
  {
    id: 'mem1',
    title: 'First Glance in Zamalek',
    date: '04.09.2026',
    caption: 'You turned around by the sidewalk near the river trees, and your smile made the entire city noise disappear.',
    imageUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80',
    tag: 'Zamalek Date',
    createdBy: '3zab',
    likes: 12,
    createdAt: Date.now() - 400000
  },
  {
    id: 'mem2',
    title: 'Iced Coffee & Endless Laughter',
    date: 'Recent Afternoon',
    caption: 'Nouna holding her iced coffee, teasing Ahmed about his energy drinks, laughing until her cheeks turned rosy.',
    imageUrl: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
    tag: 'Sweet Snaps',
    createdBy: 'Nouna',
    likes: 24,
    createdAt: Date.now() - 300000
  },
  {
    id: 'mem3',
    title: 'Streets When Everyone Slept',
    date: 'Late Evening',
    caption: 'Walking close through our neighborhood streets, feeling that the whole night belonged to just the two of us.',
    imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
    tag: 'Special Days',
    createdBy: '3zab',
    likes: 19,
    createdAt: Date.now() - 200000
  }
];

export const INITIAL_POLAROIDS: Polaroid[] = [
  {
    id: 'polaroid-1',
    imageUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=700&q=85',
    note: 'The first look that stayed with me.',
    date: '04.09.2026',
    createdBy: '3zab',
    x: 34,
    y: 54,
    rotation: -7,
    createdAt: Date.now() - 400000,
  },
  {
    id: 'polaroid-2',
    imageUrl: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=700&q=85',
    note: 'Coffee, teasing, and that laugh.',
    date: 'A sweet afternoon',
    createdBy: 'Nouna',
    x: 276,
    y: 76,
    rotation: 5,
    createdAt: Date.now() - 300000,
  },
  {
    id: 'polaroid-3',
    imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=700&q=85',
    note: 'Our city after everyone slept.',
    date: 'Late evening',
    createdBy: '3zab',
    x: 522,
    y: 37,
    rotation: -3,
    createdAt: Date.now() - 200000,
  },
  {
    id: 'polaroid-4',
    imageUrl: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=700&q=85',
    note: 'A little piece of us to keep.',
    date: 'Forever favorite',
    createdBy: 'Nouna',
    x: 760,
    y: 116,
    rotation: 8,
    createdAt: Date.now() - 100000,
  },
];

export const INITIAL_SONGS: Song[] = [
  {
    id: 's1',
    title: 'Until I Found You',
    artist: 'Stephen Sanchez',
    platform: 'spotify',
    url: 'https://open.spotify.com/track/7i2Qm7EayF3hJ6N6Lq64wR',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80',
    note: 'Because the lyrics literally describe the quiet feeling of waiting without knowing my heart was just waiting for Anfal.',
    duration: '03:42',
    createdBy: '3zab',
    createdAt: Date.now() - 100000
  },
  {
    id: 's2',
    title: 'Yellow',
    artist: 'Coldplay',
    platform: 'youtube',
    url: 'https://www.youtube.com/watch?v=yKNxeF4KMsY',
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=300&q=80',
    note: 'Look at the stars, look how they shine for you. Reminds me of our late night walks when the streetlights glow yellow.',
    duration: '04:15',
    createdBy: 'Nouna',
    createdAt: Date.now() - 90000
  },
  {
    id: 's3',
    title: 'Those Eyes',
    artist: 'New West',
    platform: 'spotify',
    url: 'https://open.spotify.com/track/544498305',
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=300&q=80',
    note: 'Nouna\'s eyes are my favorite refuge. Every time this chorus drops, it feels like looking into her gaze.',
    duration: '02:58',
    createdBy: '3zab',
    createdAt: Date.now() - 80000
  }
];

export const INITIAL_REASONS: LoveReason[] = [
  {
    id: 'r1',
    author: '3zab',
    text: 'She is completely herself around me — no filters, pure heart.',
    note: 'You never have to perform or pretend. The real Anfal is the one I adore.',
    createdAt: Date.now() - 70000
  },
  {
    id: 'r2',
    author: '3zab',
    text: 'I feel genuinely at peace and comfortable whenever she\'s near.',
    note: 'The noise of the outside world turns to absolute silence when you sit beside me.',
    createdAt: Date.now() - 65000
  },
  {
    id: 'r3',
    author: '3zab',
    text: 'Her presence brings an instant sense of safety and calm.',
    note: 'No matter how chaotic the day is, one voice note or touch resets my nervous system.',
    createdAt: Date.now() - 60000
  },
  {
    id: 'r4',
    author: '3zab',
    text: 'I love her personality in general, and her eyes are my favorite refuge.',
    note: 'There is a warmth in your eyes that makes me feel home every single time.',
    createdAt: Date.now() - 55000
  },
  {
    id: 'r5',
    author: '3zab',
    text: 'She is my absolute type in every single way imaginable.',
    note: 'From the way you laugh to your quiet thoughts — you are everything I ever wished for.',
    createdAt: Date.now() - 50000
  },
  {
    id: 'r6',
    author: 'Nouna',
    text: 'Ahmed makes me feel listened to, cherished, and deeply protected.',
    note: 'Even in the smallest moments, 3zab shows up for me with his whole heart.',
    createdAt: Date.now() - 45000
  }
];

export const INITIAL_LETTERS: Letter[] = [
  {
    id: 'l1',
    author: '3zab',
    recipient: 'Nouna',
    title: 'To My Sanctuary & Forever',
    message: 'My dearest Anfal,\n\nLooking back at that science lesson, I never imagined that the girl who walked into my house would become the center of my world. Living streets apart wasn\'t a coincidence — it was destiny giving us multiple chances to meet until our hearts aligned.\n\nOn 04.09.2026 in Zamalek, when we walked by the Nile and sat in that cinema hall, I knew there was no going back. You are my safe place, my peace, and my favorite person in the entire universe.\n\nWith all my love,\n3zab',
    createdAt: Date.now() - 40000
  },
  {
    id: 'l2',
    author: 'Nouna',
    recipient: '3zab',
    title: 'My Favorite Comfort',
    message: 'Ahmed,\n\nThank you for being my constant comfort and my calmest harbor. Walking with you, talking about everything and nothing, sharing coffee and smiles — these are the moments I hold closest to my heart.\n\nHere is to our forever,\nNouna',
    createdAt: Date.now() - 35000
  }
];

export const INITIAL_OPEN_WHEN: OpenWhen[] = [
  {
    id: 'ow1',
    author: '3zab',
    category: 'Open when you\'re sad',
    title: 'Remember That You Are Never Alone',
    message: 'My love Anfal, if you\'re feeling down right now, pause for a second. Take a deep breath. Remember how much you mean to me and how bright your smile makes my entire life. Close your eyes, I am holding your hand right now.',
    createdAt: Date.now() - 30000
  },
  {
    id: 'ow2',
    author: '3zab',
    category: 'Open when you miss me',
    title: 'Look At The Sky & Count 3 Seconds',
    message: 'I miss you just as much. Distance is just a temporary measurement. Play our song "Until I Found You", close your eyes, and know I\'m thinking of you right at this exact moment.',
    createdAt: Date.now() - 28000
  },
  {
    id: 'ow3',
    author: 'Nouna',
    category: 'Open when you can\'t sleep',
    title: 'A Soft Hug For Your Mind',
    message: 'Relax your shoulders, 3zab. Turn off the bright screens, sip some water, and remember that tomorrow is a fresh start filled with new memories together.',
    createdAt: Date.now() - 25000
  },
  {
    id: 'ow4',
    author: '3zab',
    category: 'Open when you need a hug',
    title: 'Virtual Arms Wrapped Around You',
    message: 'Wrapping my arms around you tight right now. Squeeze your pillow, take a slow breath, and feel the warmth. You are so loved.',
    createdAt: Date.now() - 22000
  },
  {
    id: 'ow5',
    author: '3zab',
    category: 'Open when you need to remember how much I love you',
    title: 'More Than All Words Can Measure',
    message: 'If you ever doubt how deeply you are loved, look at our relationship counter. Every single second that ticks by is a second I am grateful for you.',
    createdAt: Date.now() - 20000
  }
];

export const INITIAL_THINGS21: Thing21[] = [
  {
    id: 't1',
    number: 1,
    title: 'Our First Nile Walk',
    description: 'Walking by the Zamalek Corniche on 04.09.2026, losing track of time as the sunset reflected on the water.',
    imageUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=500&q=80',
    createdAt: Date.now() - 15000
  },
  {
    id: 't2',
    number: 2,
    title: 'The Monster vs Iced Coffee Debates',
    description: 'Ahmed with his energy drinks and Anfal with her iced coffee — our iconic signature drinks.',
    createdAt: Date.now() - 14000
  },
  {
    id: 't3',
    number: 3,
    title: 'Science Lesson Coincidence',
    description: 'How a simple lesson at Ahmed\'s house eventually turned into our private universe.',
    createdAt: Date.now() - 13000
  }
];

export const INITIAL_FUTURE_DREAMS: FutureDream[] = [
  {
    id: 'fd1',
    title: 'Get a dedicated Monster fridge for 3zab',
    completed: false,
    createdBy: 'Nouna',
    createdAt: Date.now() - 10000
  },
  {
    id: 'fd2',
    title: 'Create a cozy aesthetic coffee corner in our future home',
    completed: false,
    createdBy: '3zab',
    createdAt: Date.now() - 9000
  },
  {
    id: 'fd3',
    title: 'Go fishing together on a quiet morning lake',
    completed: false,
    createdBy: 'Nouna',
    createdAt: Date.now() - 8000
  },
  {
    id: 'fd4',
    title: 'Travel abroad together to Spain, Italy & Canada',
    completed: false,
    createdBy: '3zab',
    createdAt: Date.now() - 7000
  }
];

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg1',
    sender: '3zab',
    text: 'Good morning Anfal! Checking our sanctuary page today ♡',
    createdAt: Date.now() - 3600000
  },
  {
    id: 'msg2',
    sender: 'Nouna',
    text: 'Good morning 3zab! It looks so beautiful! 😍',
    createdAt: Date.now() - 3500000
  }
];

export const INITIAL_FAVORITES: Favorite[] = [
  {
    id: 'fav1',
    author: 'Nouna',
    category: 'FAVORITE FOOD',
    item: 'Pizza 🍕',
    icon: 'utensils',
    color: 'red',
    createdAt: Date.now() - 80000
  },
  {
    id: 'fav2',
    author: 'Nouna',
    category: 'FAVORITE DRINK',
    item: 'Iced Coffee / Mango Juice ☕🥭',
    icon: 'coffee',
    color: 'amber',
    createdAt: Date.now() - 70000
  },
  {
    id: 'fav3',
    author: 'Nouna',
    category: 'FAVORITE SERIES',
    item: 'Gilmore Girls 🎬',
    icon: 'tv',
    color: 'purple',
    createdAt: Date.now() - 60000
  },
  {
    id: 'fav4',
    author: 'Nouna',
    category: 'DREAM DESTINATIONS',
    item: 'Spain & Italy 🇪🇸🇮🇹',
    icon: 'globe',
    color: 'blue',
    createdAt: Date.now() - 50000
  },
  {
    id: 'fav5',
    author: '3zab',
    category: 'FAVORITE FOOD',
    item: 'Shawarma 🌯',
    icon: 'utensils',
    color: 'orange',
    createdAt: Date.now() - 40000
  },
  {
    id: 'fav6',
    author: '3zab',
    category: 'FAVORITE DRINK',
    item: 'Monster Energy ⚡',
    icon: 'zap',
    color: 'emerald',
    createdAt: Date.now() - 30000
  },
  {
    id: 'fav7',
    author: '3zab',
    category: 'FAVORITE SERIES',
    item: 'Vikings ⚔️',
    icon: 'tv',
    color: 'stone',
    createdAt: Date.now() - 20000
  },
  {
    id: 'fav8',
    author: '3zab',
    category: 'DREAM DESTINATION',
    item: 'Canada 🇨🇦',
    icon: 'globe',
    color: 'teal',
    createdAt: Date.now() - 10000
  }
];
