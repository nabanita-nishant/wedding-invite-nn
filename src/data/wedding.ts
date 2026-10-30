export type DressCode = {
  wear: string;
  wearSwatches: string[];
  avoid?: string;
  avoidReason?: string;
  avoidSwatches?: string[];
};

export type WeddingEvent = {
  id: string;
  name: string;
  partOfDay: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
  time: string;
  description: string;
  dressCode?: DressCode;
};

export type Venue = {
  name?: string;
  address?: string;
  mapUrl: string;
};

export type WeddingDay = {
  id: string;
  weekday: string;
  date: string;
  shortDate: string;
  title: string;
  venue: Venue;
  events: WeddingEvent[];
};

export type RsvpStep = {
  title: string;
  text: string;
  tags?: string[];
};

export type RichText = (string | { text: string; href?: string; strong?: boolean })[];

export type FaqItem = {
  question: string;
  answer: RichText;
};

export const wedding = {
  couple: {
    firstName: 'Nabanita',
    secondName: 'Nishant',
  },
  date: '4–5 December 2026',
  location: 'Tezpur, Assam',
  countdown: {
    start: '2026-12-04T00:00:00+05:30',
    end: '2026-12-06T00:00:00+05:30',
  },
  hero: {
    eyebrow: 'A familiar beginning',
    invitation: 'invite you to celebrate a new chapter together',
  },
  welcome: {
    eyebrow: 'Welcome to our wedding',
    title: 'A familiar beginning. A new chapter. A future together.',
    copy: 'From being school classmates to choosing to move forward together, life has brought us to a new beginning. We are delighted to celebrate this special chapter with our family and friends and look forward to sharing these intimate moments with the people who matter most to us.',
    signoff: 'With love, Nabanita & Nishant',
  },
  days: [
    {
      id: 'friday',
      weekday: 'Friday',
      date: '4 December 2026',
      shortDate: '4 Dec',
      title: 'Colour, music & a little magic',
      venue: {
        name: "The bride's residence",
        address: 'Shreebhumi Enclave, Tiger Hill Road, Lalmati, Tezpur, Assam',
        mapUrl: 'https://maps.app.goo.gl/7Q8EdLYiVf6ajSXP8',
      },
      events: [
        {
          id: 'mehendi',
          name: 'Mehendi ceremony',
          partOfDay: 'Morning',
          time: '',
          description: 'An intimate celebration with the women of both families, filled with colour, laughter, and the beautiful beginning of the celebrations.',
          dressCode: {
            wear: 'Any shade of pink',
            wearSwatches: ['#f7c6d0', '#e9879f', '#c8467a'],
          },
        },
        {
          id: 'haldi',
          name: 'Haldi ceremony',
          partOfDay: 'Evening',
          time: '',
          description: "An intimate Haldi celebration with the bride's family and friends.",
          dressCode: {
            wear: 'Any shade of yellow',
            wearSwatches: ['#fbe7a1', '#f6cb45', '#e3a21a'],
          },
        },
      ],
    },
    {
      id: 'saturday',
      weekday: 'Saturday',
      date: '5 December 2026',
      shortDate: '5 Dec',
      title: 'Rings, rituals & forever',
      venue: {
        mapUrl: 'https://maps.app.goo.gl/whE3vhVsqQGJEjyeA',
      },
      events: [
        {
          id: 'ring-exchange',
          name: 'Ring exchange & court marriage',
          partOfDay: 'Morning',
          time: '',
          description: 'A special morning as we exchange rings and begin our next chapter together.',
          dressCode: {
            wear: 'Soft pastels and light, subtle colours',
            wearSwatches: ['#cfe6d8', '#f8dccd', '#ddd7f1', '#d3e5f3'],
            avoid: 'White',
            avoidReason: 'The bride and groom will be wearing white.',
            avoidSwatches: ['#ffffff'],
          },
        },
        {
          id: 'wedding-lunch',
          name: 'Wedding lunch',
          partOfDay: 'Afternoon',
          time: '',
          description: 'Good food, familiar faces, and time to enjoy being together.',
        },
        {
          id: 'bengali-wedding',
          name: 'Bengali wedding & dinner',
          partOfDay: 'Night',
          time: '',
          description: 'An intimate Bengali wedding ceremony followed by dinner, celebrating love, family, and tradition.',
          dressCode: {
            wear: 'Any colour you love',
            wearSwatches: ['#2f7d8c', '#e2a23b', '#6a4c9c', '#3f8a5a'],
            avoid: 'Red and maroon',
            avoidSwatches: ['#c0262d', '#6f1726'],
          },
        },
      ],
    },
  ] satisfies WeddingDay[],
  dressCodeGuide: {
    title: 'Dress code at a glance',
    intro: 'Each celebration has its own colours. Tap one for the details.',
  },
  rsvp: {
    title: 'Will you celebrate with us?',
    intro: "One reply per household is perfect. Tell us who is coming, which celebrations you'll join, and what each guest would like to eat.",
    formUrl: '',
    steps: [
      {
        title: 'One reply per household',
        text: 'One person can reply for everyone in your household, with up to six guests in a single response.',
      },
      {
        title: "Which celebrations you'll join",
        text: 'Let us know which celebrations your household will be joining, so we can plan the food, seating, and arrangements.',
        tags: ['Mehendi', 'Haldi', 'Ring exchange', 'Bengali wedding'],
      },
      {
        title: 'A little something for everyone',
        text: 'We will have both vegetarian and non-vegetarian options for our guests. Please choose one for each guest.',
        tags: ['Vegetarian', 'Non-vegetarian'],
      },
      {
        title: 'Allergies and preferences',
        text: 'Please let us know if you have any food allergies, including nut allergies, dietary restrictions, intolerances, or ingredients you prefer to avoid. We will do our best to accommodate your needs.',
      },
    ] satisfies RsvpStep[],
  },
  faq: {
    eyebrow: 'Good to know',
    title: 'Quick questions',
    lead: 'A few things to know before the celebrations',
    items: [
      {
        question: 'Can I bring someone along?',
        answer: [
          "We're keeping our wedding celebrations small and intimate, with arrangements planned around our invited guest list. If you'd like to bring an additional guest, please check with us beforehand. We'd love to accommodate whenever possible!",
        ],
      },
      {
        question: 'Do I need to RSVP?',
        answer: [
          'Yes, please! Kindly ',
          { text: 'confirm your attendance', href: '#rsvp' },
          " and let us know which celebrations you'll be joining. This will help us plan the food, seating, and other arrangements to make everything special for you.",
        ],
      },
      {
        question: 'What should I wear?',
        answer: [
          'Each celebration has its own dress code! Please check the ',
          { text: 'dress code', href: '#dress-code' },
          " section for the suggested colours and details for each event. We can't wait to see you all dressed up!",
        ],
      },
      {
        question: 'What if my plans change and I can no longer attend?',
        answer: [
          "We completely understand that plans can change! Since we're keeping things intimate, we'd really appreciate it if you could let us know as early as possible if you're unable to make it. Ideally, please give us ",
          { text: "7–10 days' notice", strong: true },
          '. If something unexpected comes up, we understand. Just let us know at least ',
          { text: '3–4 days before the event', strong: true },
          ', whenever possible.',
        ],
      },
    ] satisfies FaqItem[],
    outro: "We're so excited to celebrate these special moments with you and make beautiful memories together!",
  },
  contact: {
    name: 'Koyel',
    message: 'For any questions, please reach out to Koyel.',
  },
};
