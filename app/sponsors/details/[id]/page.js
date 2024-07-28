"use client"
import React,{useState,useEffect} from 'react'
import dynamic from 'next/dynamic'
const AdminLayout = dynamic(() => import('@/components/AdminLayout'), { ssr: false })
import toast,{Toaster} from "react-hot-toast";
import Link from 'next/link'
import { IoArrowBackCircle } from 'react-icons/io5';
import { MdOutlineDataSaverOff } from "react-icons/md";
import PuffLoader from 'react-spinners/PuffLoader'
import { useRouter } from 'next/navigation'
import { FiEdit } from 'react-icons/fi';
import { useParams } from 'next/navigation';
import { ImCloudUpload } from "react-icons/im";

export default function Page() {
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [details,setDetails] = useState('')
    const [website,setWebsite] = useState('')
    const [images,setImages] = useState([]);   
    const params = useParams();
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('/api/sponsors/findbyId', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ _id: params.id }),
            });
            if (response.ok) {
              const data = await response.json();
              setTitle(data.title);
              setDescription(data.description);
              setDetails(data.details)
              setWebsite(data.website)
              setImages(data.imageSource);
            } else {
              throw new Error('Failed to fetch contributions');
            }
          } catch (error) {
            console.error('@contributions edit Details ', error);
            // Handle error state or redirect to error page
          }
        };
    
        if (params.id) {
          fetchData();
        }
      }, [params.id]);

  return (
    <AdminLayout title='Sponsor > Details'>
      <div className='p-4 text-sm'>

        <div className='flex border w-1/2 bg-white rounded-md hover:shadow-md hover:shadow-[#18B8A8] items-center'>
            <p className='flex-2 bg-[#18B8A8] text-white font-bold p-2 rounded-l-md text-sm'>Sponsor ID</p>
            <p className='flex-1 px-1 outline-none rounded-r-md'>{params.id}</p>
        </div>
        <div className='flex border w-1/2 bg-white rounded-md hover:shadow-md hover:shadow-[#18B8A8] items-center'>
            <p className='flex-2 bg-[#18B8A8] text-white font-bold p-2 rounded-l-md text-sm'>Sponsor Title</p>
            <input type='text' className='flex-1 px-1 outline-none rounded-r-md' value={title} onChange={(ev)=>{setTitle(ev.target.value)}} readOnly={true}/>
        </div>
        <div className='w-[200px] h-[200px] rounded-md'>
            <img src={images} alt={title} className='w-full rounded-md' draggable={false}/>
        </div>
        <div className='flex border bg-white w-1/2 rounded-md hover:shadow-md hover:shadow-[#18B8A8] items-center'>
            <p className='flex-2 bg-[#18B8A8] text-white font-bold p-2 rounded-l-md text-sm'>Website</p>
            <input type='text' className='flex-1 px-1 outline-none rounded-r-md' value={website} onChange={(ev)=>{setWebsite(ev.target.value)}} readOnly={true}/>
        </div>
        <div className='flex border w-1/2 bg-white rounded-md hover:shadow-md hover:shadow-[#18B8A8] '>
            <p className='flex-2 bg-[#18B8A8] text-white font-bold p-2 rounded-l-md text-sm'>Details</p>
            <textarea className='flex-1 px-1 outline-none rounded-r-md' type='text' value={details} onChange={(ev)=>{setDetails(ev.target.value)}} required={true} readOnly={true}/>
        </div>
        <div className='flex border w-1/2 bg-white rounded-md hover:shadow-md hover:shadow-[#18B8A8]'>
            <p className='flex-2 bg-[#18B8A8] text-white font-bold p-2 rounded-l-md text-sm'>Description</p>
            <textarea className='flex-1 px-1 outline-none rounded-r-md' type='text' value={description} onChange={(ev)=>{setDescription(ev.target.value)}} required={true} readOnly={true}/>
        </div>


        <div className='flex gap-4 mt-4'>
            <Link href={`/sponsors/edit/${params.id}`}>
                <div className='flex items-center gap-3 bg-blue-500 text-white p-2 rounded-lg hover:bg-white hover:text-[#272727] transition duration-300 hover:shadow-md'>
                <FiEdit className="w-[20px] h-[20px]" />
                <p>Edit</p>
                </div>
            </Link>
            <Link href='/sponsors' >
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
