import React from 'react'
import dynamic from 'next/dynamic'
// import AdminLayout from '@/components/AdminLayout'
const AdminLayout = dynamic(() => import('@/components/AdminLayout'), { ssr: false })
import Contribution from '@/pages/Contribution'

function Page() {
  return (
    <AdminLayout title='Contributions'>
        <Contribution/>
    </AdminLayout>
  )
}

export default Page