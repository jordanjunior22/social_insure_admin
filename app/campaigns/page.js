import React from 'react'
import dynamic from 'next/dynamic'
// import AdminLayout from '@/components/AdminLayout'
const AdminLayout = dynamic(() => import('@/components/AdminLayout'), { ssr: false })
import Campaign from '@/pages/Campaign'

export default function Page() {
  return (
    <AdminLayout title='Campaigns'>
      <Campaign />
    </AdminLayout>
  )
}
