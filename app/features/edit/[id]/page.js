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
    const [features, setFeatures] = useState([])
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [subReq,setSubReq] = useState('No');
    const [details,setDetails] = useState('')
    const [fees,setFees] = useState('')
    const [terms, setTerms] = useState('')
    const [images,setImages] = useState('');   
    const params = useParams();
    const router = useRouter();

    async function handleUpdate() {
        try {
            const promise = new Promise(async (resolve, reject) => {
                const CreateResponse = await fetch('/api/features', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        _id: params.id,
                        title: title,
                        description: description,
                        subReq: subReq,
                        details: details,
                        fees: parseFloat(fees),
                        terms: terms,
                        imageSource:images
                    })
                });
    
                if (CreateResponse.ok) {
                    resolve();
                    router.push('/features'); // Assuming 'router' is defined elsewhere
                } else {
                    reject();
                }
            });
       
            await toast.promise(promise, {
                loading: 'Updating...',
                success: 'Updated',
                error: 'Error',
            });

        }catch(error){

        }
    }
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('/api/features/findbyId', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ _id: params.id }),
            });
            if (response.ok) {
              const data = await response.json();
              console.log(data);
              setTitle(data.title);
              setDescription(data.description);
              setSubReq(data.subReq);
              setDetails(data.details)
              setFees(data.fees)
              setTerms(data.terms)
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
    <AdminLayout title='Features > Edit Feauters'>
        <div className='p-4 text-sm'>

        <div className='flex border w-1/2 bg-white rounded-md hover:shadow-md hover:shadow-[#18B8A8] items-center'>
            <p className='flex-2 bg-[#18B8A8] text-white font-bold p-2 rounded-l-md text-sm'>Feature Title</p>
            <input type='text' className='flex-1 px-1 outline-none rounded-r-md' value={title} onChange={(ev)=>{setTitle(ev.target.value)}}/>
        </div>
     
        <div className='flex border bg-white w-1/2 rounded-md hover:shadow-md hover:shadow-[#18B8A8] items-center'>
            <p className='flex-2 bg-[#18B8A8] text-white font-bold p-2 rounded-l-md text-sm'>Subscription Required</p>
            <select className='flex-1 px-1 outline-none rounded-r-md'  value={subReq} onChange={(ev)=>{setSubReq(ev.target.value)}} required={true}>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>
        </div>
        {subReq === 'Yes' && (
        <div className='flex border w-1/2 bg-white rounded-md hover:shadow-md hover:shadow-[#18B8A8] '>
            <p className='flex-2 bg-[#18B8A8] text-white font-bold p-2 rounded-l-md text-sm'>Subscription Fee</p>
            <input type='text' className='flex-1 px-1 outline-none rounded-r-md' value={fees} onChange={(ev)=>{setFees(ev.target.value)}} required={true}/>
        </div>
        )}
        {subReq === 'Yes' && (
        <div className='flex border w-1/2 bg-white rounded-md hover:shadow-md hover:shadow-[#18B8A8] '>
            <p className='flex-2 bg-[#18B8A8] text-white font-bold p-2 rounded-l-md text-sm'>Terms</p>
            <textarea className='flex-1 px-1 outline-none rounded-r-md' type='text' value={terms} onChange={(ev)=>{setTerms(ev.target.value)}} required={true}/>
        </div>
        )}
        <div className='flex border w-1/2 bg-white rounded-md hover:shadow-md hover:shadow-[#18B8A8] '>
            <p className='flex-2 bg-[#18B8A8] text-white font-bold p-2 rounded-l-md text-sm'>Details</p>
            <textarea className='flex-1 px-1 outline-none rounded-r-md' type='text' value={details} onChange={(ev)=>{setDetails(ev.target.value)}} required={true}/>
        </div>

        <div className='flex border w-1/2 bg-white rounded-md hover:shadow-md hover:shadow-[#18B8A8]'>
            <p className='flex-2 bg-[#18B8A8] text-white font-bold p-2 rounded-l-md text-sm'>Description</p>
            <textarea className='flex-1 px-1 outline-none rounded-r-md' type='text' value={description} onChange={(ev)=>{setDescription(ev.target.value)}} required={true}/>
        </div>


        <div className='flex gap-4 mt-4'>
            <button onClick={handleUpdate}>
                <div className='flex items-center gap-3 bg-blue-500 text-white p-2 rounded-lg hover:bg-white hover:text-[#272727] transition duration-300 hover:shadow-md'>
                <FiEdit className="w-[20px] h-[20px]" />
                <p>Update</p>
                </div>
            </button>
            <Link href='/features' >
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
