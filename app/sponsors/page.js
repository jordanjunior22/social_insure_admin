import React from 'react'
import dynamic from 'next/dynamic'
// import AdminLayout from '@/components/AdminLayout'
const AdminLayout = dynamic(() => import('@/components/AdminLayout'), { ssr: false })
import Sponsor from '@/pages/Sponsor'

function Page() {
  return (
    <AdminLayout title='Sponsor'>
        <Sponsor/>
    </AdminLayout>
  )
}

export default Page