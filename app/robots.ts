import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/about',
          '/practice-areas',
          '/contact',
          '/news',
          '/news/*',
          '/articles',
          '/articles/*',
          '/videos',
          '/videos/*',
        ],
        disallow: [
          '/admin',
          '/admin/*',
          '/api',
          '/api/*',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
