
export async function generateSitemaps() {
  // Fetch the total number of URLs
  const totalURLs = await getTotalURLs();
  const numberOfSitemaps = Math.ceil(totalURLs / 50000);

  // Generate sitemap indices
  return Array.from({ length: numberOfSitemaps }, (_, index) => ({ id: index }));
}

// Fetch the total number of URLs
async function getTotalURLs() {
  const sneakersResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/sneaker-slugs`);
  const sneakersData = await sneakersResponse.json();

  const designResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/design-slugs`);
  const designsData = await designResponse.json();

  return (sneakersData.data.length * designsData.data.length) + sneakersData.data.length;
}

function escapeForXML(str) {
  return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
}


export default async function sitemap({ id  }) {
  const start = id * 50000;
  const end = start + 50000;

  // Fetch data
  const sneakersResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/sneaker-slugs`);
  const sneakersData = await sneakersResponse.json();

  const designResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/design-slugs`);
  const designsData = await designResponse.json();

  const collectionPageFields = sneakersData.data.map((_index) => ({
    url: escapeForXML(`https://www.matchmytees.com/collection/?brand=&model=&sub_model_category=&sneaker=${_index}&product_type=T-shirt&product_colors=&designs`),
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
  }));

  const productPageFields = [];
  sneakersData.data.forEach((_index) => {
    designsData.data.forEach((_design) => {
      productPageFields.push({
        url: escapeForXML(`https://www.matchmytees.com/product/?type=T-shirt&color=Black&sneaker=${_index}&design=${_design}`),
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1,
      });
    });
  });

  const allFields = [
    {
      url: 'https://www.matchmytees.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    ...collectionPageFields,
    ...productPageFields
  ];

  // Slice the data for the current sitemap
  const sitemapEntries = allFields.slice(start, end);

  return sitemapEntries;
  // Build XML content
  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${sitemapEntries
      .map(entry => `
      <url>
        <loc>${entry.url}</loc>
        <lastmod>${entry.lastModified.toISOString()}</lastmod>
        <changefreq>${entry.changeFrequency}</changefreq>
        <priority>${entry.priority}</priority>
      </url>
    `)
      .join('')}
  </urlset>`;

  return new Response(xmlContent, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}