"use client"
import React,{useState,useEffect} from 'react'
import dynamic from 'next/dynamic'
const AdminLayout = dynamic(() => import('@/components/AdminLayout'), { ssr: false })
import toast,{Toaster} from "react-hot-toast";
import Link from 'next/link'
import { IoArrowBackCircle } from 'react-icons/io5';
import { MdOutlineDataSaverOff } from "react-icons/md";
import { ImCloudUpload } from "react-icons/im";
import PuffLoader from 'react-spinners/PuffLoader'
import { useRouter } from 'next/navigation'

export default function Page() {
    const router = useRouter();
    const [title,setTitle] = useState('')
    const [message,setMessage] = useState('')


    async function handleCreate() {
        if (!title || !message ) {
            return alert('Make sure all fields are not empty');
        }
        try {
            const promise = new Promise(async (resolve, reject) => {
                const CreateResponse = await fetch('/api/notifications', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title: title,
                        message: message,
                    })
                });
    
                if (CreateResponse.ok) {
                    resolve();
                    router.push('/notifications'); // Assuming 'router' is defined elsewhere
                } else {
                    reject();
                }
            });
       
            await toast.promise(promise, {
                loading: 'Creating...',
                success: 'Created',
                error: 'Error',
            });

        }catch(error){
            console.error('error at @Create-sponsor',error)
        }
    }
   
  return (
    <AdminLayout title='Notification > New Create'>
        <div className='p-4 text-sm'>

            <div className='flex border w-1/2 bg-white rounded-md hover:shadow-md hover:shadow-[#18B8A8] items-center'>
                <p className='flex-2 bg-[#18B8A8] text-white font-bold p-2 rounded-l-md text-sm'>Notification Title</p>
                <input type='text' className='flex-1 px-1 outline-none rounded-r-md' value={title} onChange={(ev)=>{setTitle(ev.target.value)}}/>
            </div>

            <div className='flex border w-1/2 bg-white rounded-md hover:shadow-md hover:shadow-[#18B8A8] '>
                <p className='flex-2 bg-[#18B8A8] text-white font-bold p-2 rounded-l-md text-sm'>Messsage</p>
                <textarea className='flex-1 px-1 outline-none rounded-r-md' type='text' value={message} onChange={(ev)=>{setMessage(ev.target.value)}} required={true}/>
            </div>


            <div className='flex gap-4 mt-4'>
                <button onClick={handleCreate}>
                    <div className='flex items-center gap-3 bg-blue-500 text-white p-2 rounded-lg hover:bg-white hover:text-[#272727] transition duration-300 hover:shadow-md'>
                    <MdOutlineDataSaverOff className="w-[20px] h-[20px]" />
                    <p>Create Notification</p>
                    </div>
                </button>
                <Link href='/notifications' >
                    <div className='flex items-center gap-3 bg-black text-white p-2 rounded-lg hover:bg-white hover:text-[#272727] transition duration-300 hover:shadow-md'>
                    <IoArrowBackCircle className='w-[20px] h-[20px]'/>
                    <p>Go Back</p>
                    </div>
                </Link>
            </div>
        </div>


    </AdminLayout>
  )
}
