export const wedding = {
  couple: {
    firstName: 'Nabanita',
    secondName: 'Nishant',
  },
  date: '04 - 05 December 2026',
  location: 'Tezpur, Assam',
  welcome: {
    eyebrow: 'Welcome to our wedding',
    title: 'A familiar beginning. A new chapter. A future together.',
    copy: 'From being school classmates to choosing to move forward together, life has brought us to a new beginning. We are delighted to celebrate this special chapter with our family and friends and look forward to sharing these intimate moments with the people who matter most to us.',
    signoff: 'With love, Nabanita & Nishant',
  },
  locations: {
    friday: {
      label: 'Friday celebrations',
      address: 'Shreebhumi Enclave, Tiger Hill Road, Lalmati, Tezpur, Assam',
      mapUrl: 'https://maps.app.goo.gl/7Q8EdLYiVf6ajSXP8',
    },
    saturday: {
      label: 'Saturday celebrations',
      mapUrl: 'https://maps.app.goo.gl/whE3vhVsqQGJEjyeA',
    },
  },
  events: {
    friday: [
      {
        number: '01',
        name: 'Mehendi ceremony',
        time: '',
        description: 'An intimate celebration with the women of both families, filled with colour, laughter, and the beautiful beginning of the celebrations.',
        dressCode: 'Pink - any shade of pink',
        locationKey: 'friday',
      },
      {
        number: '02',
        name: 'Haldi ceremony',
        time: '',
        description: 'An intimate Haldi celebration with the bride\'s family and friends.',
        dressCode: 'Yellow - any shade of yellow',
        locationKey: 'friday',
      },
    ],
    saturday: [
      {
        number: '03',
        name: 'Ring exchange & court marriage',
        time: '',
        description: 'A special morning as we exchange rings and begin our next chapter together.',
        dressCode: 'Soft pastels and light, subtle colours. Kindly avoid white, as the bride and groom will be wearing white.',
        locationKey: 'saturday',
      },
      {
        number: '04',
        name: 'Wedding lunch',
        time: '',
        description: 'Good food, familiar faces, and time to enjoy being together.',
        dressCode: '',
        locationKey: 'saturday',
      },
      {
        number: '05',
        name: 'Bengali wedding & dinner',
        time: '',
        description: 'An intimate Bengali wedding ceremony followed by dinner, celebrating love, family, and tradition.',
        dressCode: 'Wear any colour you love, except red and maroon.',
        locationKey: 'saturday',
      },
    ],
  },
  food: {
    title: 'A little something for everyone',
    copy: 'We will have both vegetarian and non-vegetarian options for our guests. Please let us know in your RSVP if you have any food allergies, including nut allergies, dietary restrictions, intolerances, or ingredients you prefer to avoid. We will do our best to accommodate your needs.',
  },
  contact: 'For any questions, please reach out to Koyel.',
} as const;

export type WeddingEvent = {
  number: string;
  name: string;
  time: string;
  description: string;
  dressCode: string;
  locationKey: keyof typeof wedding.locations;
};
