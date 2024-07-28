import React from 'react'
import dynamic from 'next/dynamic'
const AdminLayout = dynamic(() => import('@/components/AdminLayout'), { ssr: false })
import Verification from '@/pages/Verification'


export default function     Page() {
  return (
    <AdminLayout title='Verification'>
        <Verification/>
    </AdminLayout>
  )
}
