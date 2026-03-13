export const prerender = true;

export async function load() {
  return {
    seo: {
      siteName: 'HJusic',
      siteUrl: 'https://hjusic.com',
      author: 'Husein Jusic',
      image: '/profile.jpeg',
      description: 'Software engineer writing about software architecture, cybersecurity, and modern backend development.',
    }
  };
}