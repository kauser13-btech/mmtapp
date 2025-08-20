import ProductContent from '@/app/components/product/ProductContent'
import React from 'react'

// export async function generateMetadata({ searchParams }) {
//   const type = searchParams.type
//   const color = searchParams.color
//   const sneaker =  searchParams.sneaker
//   const design = searchParams.design


//   const response = await fetch(`https://api.matchmytees.com/api/v1/view-product?type=${type}&color=${color}&sneaker=${sneaker}&design=${design}`)
 
// const product = await response.json()

//   // Assuming productData structure is something like { sneaker: { title: '', description: '' } }
//   return {
//     title: product.data.sneaker.title,
//     description: product.data.sneaker.description
//   };
// }


const ProductPage = () => {
  return (
<>
<ProductContent />
</>
  )
}

export default ProductPage