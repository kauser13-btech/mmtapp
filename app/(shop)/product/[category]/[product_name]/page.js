"use server";
import BreadcrumbResponsive from "@/app/components/global/BreadcrumbResponsive";
import Head from "next/head";
import ProductImageWrapper from "./components/ProductImageWrapper";
import ProductDetailsTab from "@/app/components/product/ProductDetailsTab";
import ProductContainerv1 from "./components/ProductContainerv1";
import Service from "@/app/components/product/Service";
// import DesignCollection from "@/app/components/product/MoreDesignCollection/DesignCollection";

async function fetchProduct(queryParams) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL +
      `/api/v1/view-product?type=${queryParams.type}&color=${queryParams.color}&sneaker=${queryParams.sneaker}&design=${queryParams.design}`,
    {
      next: {
        tags: [`detail_${queryParams.sneaker}`],
        revalidate: 60, // Revalidate every hour
      },
    },
  );

  if (res.status === 404) {
    return null; // Return null for 404 to handle in component
  }

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function ProductPage({ params, searchParams }) {
  const { category, product_name } = await params;
  const parts = product_name.split("-matching-");  
  const { color } = await searchParams;
  const sneaker = parts?.[0] || '';
  const design = parts?.[1] || '';
  const queryParams = {
    type: category,
    color: color,
    sneaker: sneaker,
    design: design,
  };

  const product = await fetchProduct(queryParams);
  const { data } = product;

  return (
    <>
      <Head>
        <title>My page title</title>
        <link rel="canonical" href={``} />
      </Head>
      <div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: data.title,
              image: data && data.image_urls ? data.image_urls[0].url : "",
              description:
                "Perfectly matches with your Jordans. High-quality material.",
              // "sku": data.design ? `D${data.design.id}S${data.sneaker.id}P${searchParams.get("type")=="T-shirt"?1:2}` : '',
              brand: {
                "@type": "Brand",
                name: "MatchMyTees",
              },
              // "offers": {
              //   "@type": "Offer",
              //   "url": data.sneaker ? `https://matchmytees.com/product/?type=${data.type}&color=${data.color}&sneaker=${data.sneaker.slug}&design=${data.design.slug}`:'',
              //   "priceCurrency": "USD",
              //   "price": data.price,
              //   "itemCondition": "https://schema.org/NewCondition",
              //   "availability": "https://schema.org/InStock"
              // },
              offers: [
                {
                  "@type": "Offer",
                  url: data.sneaker
                    ? `https://matchmytees.com/product/?type=${data.type}&color=${data.color}&sneaker=${data.sneaker.slug}&design=${data.design.slug}`
                    : "",
                  priceCurrency: "USD",
                  price: data.price
                    ? parseFloat(data.price.replace(/[^\d.]/g, ""))
                    : 0,
                  // "priceValidUntil": "2025-12-31",
                  itemCondition: "https://schema.org/NewCondition",
                  availability: "https://schema.org/InStock",
                },
                {
                  "@type": "Offer",
                  url: data.sneaker
                    ? `https://matchmytees.com/product/?type=${data.type}&color=${data.color}&sneaker=${data.sneaker.slug}&design=${data.design.slug}`
                    : "",
                  priceCurrency: "USD",
                  price: "59.99",
                  itemCondition: "https://schema.org/NewCondition",
                  availability: "https://schema.org/InStock",
                },
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5",
                bestRating: "5",
                worstRating: "1",
                ratingCount: "500",
              },
            }),
          }}
        />
        <BreadcrumbResponsive
          title={`Home > ${data.type} > ${data.title || ""}`}
        />
        <div className="grid gap-7 md:gap-5 xl:gap-12 w-full h-full md:px-[40px] md:grid-cols-2 lg:grid-cols-[1fr_415px] xl:grid-cols-[1fr_558px] my-container pt-0 sm:pt-[30px]">
          <ProductImageWrapper
            data={data}
            isLoading={false}
            imageLoaded={true}
          />
          <ProductContainerv1
            data={data}
            queryParams={queryParams}
            isLoading={false}
            sneaker={sneaker}
            design={design}
          />
          <ProductDetailsTab
            data={data}
            isLoading={false}
            customClass="md:col-span-2 lg:hidden"
          />
        </div>
        <Service/>
        
        {/* <DesignCollection
          data={data?.similar_designs ?? []}
          isLoading={isLoading}
          imageLoaded={imageLoadedArray}
          // handleImageLoaded={handleArrayImageLoaded}
          type="similar_design"
        /> */}
      </div>
    </>
  );
}
