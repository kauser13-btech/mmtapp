const axios = require('axios');
export async function GET(req, { params }) {
    if (!params || !params.id) {
      return new Response('Not Found', { status: 404 });
    }
  
    const { id } = params;
    const indexValue=id.slice(0, -4);
    const start = indexValue * 10000;
    const end = start + 10000;

  const sneakersResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/sneaker-slugs`);
  const sneakersData = sneakersResponse.data;

  // const designResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/design-slugs`);
  // const designsData = await designResponse.json();

  const designResponse = await axios.get(`https://api.matchmytees.com/api/v1/design-slugs`);
  const designsData = designResponse.data;
  
  

  const collectionPageFields = sneakersData.data.map((_index) => ({
    url: escapeForXML(`https://www.matchmytees.com/collection/?brand=&model=&sub_model_category=&sneaker=${_index}&product_type=T-shirt&product_colors=&designs`),
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
  }));

  const colors=['Black'];
  const productPageFields = [];
  colors.forEach(color =>{
    sneakersData.data.forEach((_index) => {
      designsData.data.forEach((_design, key) => {
        // console.log(key)
        productPageFields.push({
          url: escapeForXML(`https://www.matchmytees.com/product/?type=T-shirt&color=${color}&sneaker=${_index}&design=${_design}`),
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 1,
        });
      });
    });
  })

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

  
  const sitemapEntries = allFields.slice(start, end);
  
  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${sitemapEntries
      .map(entry => `
      <url>
        <loc>${entry.url}</loc>
        <lastmod>${entry.lastModified.toISOString()}</lastmod>
        <changefreq>${entry.changeFrequency}</changefreq>
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
  
  export async function generateStaticParams() {
    const totalURLs = await getTotalURLs();
    const numberOfSitemaps = Math.ceil(totalURLs / 10000);
  
    return Array.from({ length: numberOfSitemaps }, (_, index) => ({
      id: index.toString()+".xml"
    }));
  }
  

  function escapeForXML(str) {
    return str.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#039;');
  }


async function getTotalURLs() {
  const sneakersResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/sneaker-slugs`);
  const sneakersData =  sneakersResponse.data;

  const designResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/design-slugs`);
  const designsData =  designResponse.data;

  return (sneakersData.data.length * designsData.data.length * 1) + sneakersData.data.length;
}