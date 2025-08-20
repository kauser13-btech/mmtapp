import React from 'react'

const PageSubHead = ({title, customClass}) => {
  return (
    <h4 className={'font-medium text-slate-950 font-black font-bold font-roboto text-base text-title-work-card max-md:text-center md:font-medium xl:text-[22px] '+customClass}>{title}</h4>
  )
}

export default PageSubHead