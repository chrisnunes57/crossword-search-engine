const dev = process.env.NODE_ENV !== 'production';

export const server = dev ? 'http://localhost:3000' : 'https://crossword-search-engine-iufqescw3-chrisnunes57.vercel.app';