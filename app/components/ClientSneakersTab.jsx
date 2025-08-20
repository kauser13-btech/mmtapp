'use client'

import dynamic from 'next/dynamic'

const SneakersTab = dynamic(() => import('./landing/SneakersTab'))
// 
export default function ClientSneakersTab(props) {
  return <SneakersTab {...props} />
}