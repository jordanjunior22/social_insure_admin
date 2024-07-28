import React from 'react'
import dynamic from 'next/dynamic'
// import AdminLayout from '@/components/AdminLayout'
const AdminLayout = dynamic(() => import('@/components/AdminLayout'), { ssr: false })
import Users from '@/pages/Users'

function Page() {
  return (
    <AdminLayout title='Users'>
        <Users/>
    </AdminLayout>
  )
}

export default Page