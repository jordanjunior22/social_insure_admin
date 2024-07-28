import React from 'react'
import dynamic from 'next/dynamic'
// import AdminLayout from '@/components/AdminLayout'
const AdminLayout = dynamic(() => import('@/components/AdminLayout'), { ssr: false })
import Notification from '@/pages/Notification'

function Page() {
  return (
    <AdminLayout title='Notification'>
        <Notification/>
    </AdminLayout>
  )
}

export default Page