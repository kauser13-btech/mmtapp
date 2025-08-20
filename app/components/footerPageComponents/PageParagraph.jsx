import React from 'react'

const PageParagraph = ({text}) => {
  return (
    <div className='text-base font-roboto text-sub-work-card max-sm:text-center md:text-sm xl:text-xl text-slate-500 font-normal' 
    dangerouslySetInnerHTML={{__html: text}}
    />
  )
}

export default PageParagraph