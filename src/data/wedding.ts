export type DressCode = {
  wear: string;
  wearSwatches: string[];
  avoid?: string;
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
            avoid: 'White, as the bride and groom will be wearing white',
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
  rsvp: {
    title: 'Will you celebrate with us?',
    intro: 'One reply per household is perfect. Tell us who is coming and what each guest would like to eat, so we can look after everyone.',
    steps: [
      {
        title: 'One reply per household',
        text: 'One person can reply for everyone in your household, with up to six guests in a single response.',
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
  contact: {
    name: 'Koyel',
    message: 'For any questions, please reach out to Koyel.',
  },
};
