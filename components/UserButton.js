"use client"
import React from 'react'
import { FaEdit } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";
import { CgProfile } from "react-icons/cg";
import Link from 'next/link'

export default function UserButton({imageUrl,name,data}) {

  return (
    <div className='bg-gray-100 flex items-center justify-between p-2 gap-3 border-b-2 rounded-md hover:shadow-md'>
      
      <div className='flex items-center gap-2'>
        <div className='border h-[40px] w-[40px] rounded-lg'>
        {imageUrl ? (
            <img src={imageUrl} alt={name} className='h-full w-full rounded-lg' />
          ) : (
            <CgProfile className='h-full w-full text-slate-500' />
          )}
        </div>
        <p>{name}</p>
      </div>

      <div className='flex gap-2'>
        <Link href={`/users/edit/${data?._id}`}>
          <FaEdit className='h-[20px] w-[20px] cursor-pointer text-gray-500 hover:text-green-500'/>
        </Link>
        <Link href={`mailto:${data?.email}`}>
          <MdEmail className='h-[20px] w-[20px] cursor-pointer text-gray-500 hover:text-green-500'/>
        </Link>
        <Link href={`/users/details/${data?._id}`}>
          <CgDetailsMore className='h-[20px] w-[20px] cursor-pointer text-gray-500 hover:text-green-500'/>
        </Link>
      </div>

    </div>
  )
}
