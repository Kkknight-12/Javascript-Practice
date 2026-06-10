export default {
  title: 'JavaScript Practice',
  description: 'Organized JavaScript revision notes and runnable examples.',
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/' },
      { text: 'Fundamentals', link: '/fundamentals/' },
      { text: 'Arrays', link: '/arrays/' },
      { text: 'Objects', link: '/objects/' },
      { text: 'Strings', link: '/strings/' },
      { text: 'Async', link: '/async/' },
    ],
    sidebar: [
      {
        text: 'Start',
        items: [
          { text: 'Overview', link: '/' },
          { text: 'Content Migration', link: '/reference/content-migration' },
        ],
      },
      {
        text: 'Core JavaScript',
        items: [
          { text: 'Fundamentals', link: '/fundamentals/' },
          { text: 'Functions', link: '/functions/' },
          { text: 'Arrays', link: '/arrays/' },
          { text: 'Objects', link: '/objects/' },
          { text: 'Strings', link: '/strings/' },
        ],
      },
      {
        text: 'Beyond Basics',
        items: [
          { text: 'Async JavaScript', link: '/async/' },
          { text: 'Collections', link: '/collections/' },
          { text: 'Advanced Topics', link: '/advanced/' },
          { text: 'Playground', link: '/playground/' },
        ],
      },
    ],
    search: {
      provider: 'local',
    },
  },
};
