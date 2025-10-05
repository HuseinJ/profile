export const prerender = true;

export async function load() {
  return {
    seo: {
      siteName: 'HJusic',
      siteUrl: 'https://hjusic.com',
      author: 'Husein Jusic',
      description: 'A personal learning blog about dev stuff',
    }
  };
}