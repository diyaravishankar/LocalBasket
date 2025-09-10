export async function GET() {
  const baseUrl = 'https://localbasket.com';

  // Static pages
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/directory', priority: '0.9', changefreq: 'daily' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/blog', priority: '0.8', changefreq: 'daily' },
    { url: '/submit-business', priority: '0.8', changefreq: 'weekly' },
    { url: '/seo-summary', priority: '0.7', changefreq: 'monthly' },
  ];

  // Business listing pages
  const businessPages = [
    { url: '/bangalore/food/priyas-kitchen', priority: '0.8', changefreq: 'weekly' },
    { url: '/chennai/crafts/artisan-crafts-maya', priority: '0.8', changefreq: 'weekly' },
    { url: '/delhi/food/bakers-delight-home', priority: '0.8', changefreq: 'weekly' },
    { url: '/hyderabad/crafts/handwoven-heritage', priority: '0.8', changefreq: 'weekly' },
    { url: '/mumbai/services/home-tutor-excellence', priority: '0.8', changefreq: 'weekly' },
    { url: '/pune/services/beauty-wellness-home', priority: '0.8', changefreq: 'weekly' },
  ];

  // City category pages
  const cityPages = [
    { url: '/bangalore', priority: '0.7', changefreq: 'weekly' },
    { url: '/bangalore/food', priority: '0.7', changefreq: 'weekly' },
    { url: '/chennai', priority: '0.7', changefreq: 'weekly' },
    { url: '/chennai/crafts', priority: '0.7', changefreq: 'weekly' },
    { url: '/delhi', priority: '0.7', changefreq: 'weekly' },
    { url: '/delhi/food', priority: '0.7', changefreq: 'weekly' },
    { url: '/hyderabad', priority: '0.7', changefreq: 'weekly' },
    { url: '/hyderabad/crafts', priority: '0.7', changefreq: 'weekly' },
    { url: '/mumbai', priority: '0.7', changefreq: 'weekly' },
    { url: '/mumbai/services', priority: '0.7', changefreq: 'weekly' },
    { url: '/pune', priority: '0.7', changefreq: 'weekly' },
    { url: '/pune/services', priority: '0.7', changefreq: 'weekly' },
  ];

  const allPages = [...staticPages, ...businessPages, ...cityPages];
  const lastMod = new Date().toISOString().split('T')[0];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${allPages
  .map(
    (page) => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
    },
  });
}
