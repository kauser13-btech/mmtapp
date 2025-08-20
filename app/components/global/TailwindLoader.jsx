import React from 'react'

const TailwindLoader = ({height}) => {
  return (
    <div className={`animate-pulse bg-slate-200 rounded-md w-full ${height}`}/>
  )
}

export default TailwindLoader