const axios = require('axios');
export async function GET() {
    const totalURLs = await getTotalURLs();
    const numberOfSitemaps = Math.ceil(totalURLs / 10000);
    const sitemapIndex = Array.from({ length: numberOfSitemaps }, (_, index) => {
      return `https://www.matchmytees.com/sitemap/${index}.xml`;
    });
  
    const sitemapIndexXML = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemapIndex
        .map(url => `
        <sitemap>
          <loc>${url}</loc>
        </sitemap>
      `)
        .join('')}
    </sitemapindex>`;
  
    return new Response(sitemapIndexXML, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  }
  

async function getTotalURLs() {
  const sneakersResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/sneaker-slugs`);
  const sneakersData = sneakersResponse.data;

  const designResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/design-slugs`);
  const designsData = designResponse.data;

  return (sneakersData.data.length * designsData.data.length * 1) + sneakersData.data.length;
}