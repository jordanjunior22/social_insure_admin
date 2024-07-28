import React from 'react'
import dynamic from 'next/dynamic'
// import AdminLayout from '@/components/AdminLayout'
const AdminLayout = dynamic(() => import('@/components/AdminLayout'), { ssr: false })
import Features from '@/pages/Features'

function Page() {
  return (
    <AdminLayout title='Features'>
        <Features/>
    </AdminLayout>
  )
}

export default Page