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
    const [description,setDescription] = useState('')
    const [subReq,setSubReq] = useState('No');
    const [details,setDetails] = useState('')
    const [fees,setFees] = useState('')
    const [terms, setTerms] = useState('')
    const [images,setImages] = useState([]);   
    const [loading, setLoading] = useState(false);


    async function handleCreate() {
        if (!title || !description || !subReq || !details || !images.length > 0) {
            return alert('Make sure all fields are not empty');
        }
        try {
            const promise = new Promise(async (resolve, reject) => {
                const CreateResponse = await fetch('/api/features', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title: title,
                        description: description,
                        subReq: subReq,
                        details: details,
                        fees: parseFloat(fees),
                        terms: terms,
                        imageUrl: images[0],
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
                loading: 'Creating...',
                success: 'Created',
                error: 'Error',
            });

        }catch(error){

        }
    }
    async function handleUploadImage(ev){
        const files = ev.target.files;
        const formData = new FormData();
    
        //console.log(files);
        for (const file of Array.from(files)) {
          setLoading(true);
          formData.append('files', file);
        }
        formData.append('otherData', 'some data');
        try{
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
              });
              const res = await response.json();
              if(res.data.links){
                setImages(oldImages =>{
                    return [...oldImages, ...res.data.links]
                })
                setLoading(false);
                }else{
                    return alert('Failed To Upload');
                }
        }catch(error){
            setLoading(false);
        }


    
      }
  return (
    <AdminLayout title='Feature > New Create'>
        <div className='p-4 text-sm'>

            <div className='flex border w-1/2 bg-white rounded-md hover:shadow-md hover:shadow-[#18B8A8] items-center'>
                <p className='flex-2 bg-[#18B8A8] text-white font-bold p-2 rounded-l-md text-sm'>Feature Title</p>
                <input type='text' className='flex-1 px-1 outline-none rounded-r-md' value={title} onChange={(ev)=>{setTitle(ev.target.value)}}/>
            </div>
            <div className='border w-[200px] h-[200px] flex items-center justify-center rounded-md relative'>
                {images.length > 0 ? (
                    <div className="flex flex-wrap gap-4 rounded-md">
                        {images.map((image, index) => (
                            <img key={index} src={image} alt={`Image ${index}`} className="max-w-[200px] max-h-[200px] rounded-md" draggable={false}/>
                        ))}
                    </div>
                ) : (
                    <label htmlFor="file-upload" className='bg-white cursor-pointer text-white py-2 px-4 rounded-md flex flex-col items-center justify-center border h-full w-full hover:shadow-[#18B8A8] hover:shadow-md'>
                        <ImCloudUpload className='w-[50px] h-[50px] text-gray-700' />
                        <p className='text-gray-700'>Upload Image</p>
                        <input id="file-upload" onChange={handleUploadImage} className='hidden' type='file' accept='image/*' required={true}/>
                    </label>
                )}
                {loading &&(
                    <div className='absolute bg-white'>
                        <PuffLoader
                            color= 'green'
                            loading={loading}
                            size={150}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                            />
                    </div>
                )
                }
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
                <button onClick={handleCreate}>
                    <div className='flex items-center gap-3 bg-blue-500 text-white p-2 rounded-lg hover:bg-white hover:text-[#272727] transition duration-300 hover:shadow-md'>
                    <MdOutlineDataSaverOff className="w-[20px] h-[20px]" />
                    <p>Create Contribution</p>
                    </div>
                </button>
                <Link href='/contributions' >
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
