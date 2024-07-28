"use client"
import React, { useState,useEffect } from 'react'
import dynamic from 'next/dynamic'
const AdminLayout = dynamic(() => import('@/components/AdminLayout'), { ssr: false })
import { ImCloudUpload } from "react-icons/im";
import Link from 'next/link'
import { IoArrowBackCircle } from 'react-icons/io5';
import { MdOutlineDataSaverOff } from "react-icons/md";
import PuffLoader from 'react-spinners/PuffLoader'
import { useRouter } from 'next/navigation'
import toast,{Toaster} from "react-hot-toast";

function Page() {
  const [title,setTitle] = useState('')
  const [images,setImages] = useState([]);   
  const [loading, setLoading] = useState(false);
  const [features,setFeatures] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [goal,setGoal] = useState('')
  const [fees,setFees] = useState('');
  const [endAt,setendAt] = useState('');
  const [des,setDes] = useState('');
  const [details,setDetails] = useState('');
  const router = useRouter();
  const [foundFeatures, setFoundFeatures] = useState({});

  useEffect(()=>{
    const fetchData = async () => {
        try {
            const FeaturesResponse = await fetch('/api/features'); // Adjust URL as per your server setup
            const FeaturesData = await FeaturesResponse.json();
            setFeatures(FeaturesData);
            if(FeaturesData.length>0){
                setSelectedOption(FeaturesData[0]._id)
            }
        } catch (error) {
            console.error('@Features Error fetching data:', error);
        }
    }

    fetchData();
  },[])

  useEffect(()=>{
    const fetchFeatures = async () => {
        try {
            const response = await fetch(`/api/features/findbyId`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ _id: selectedOption })
            });
    
            // Check if the fetch operation was successful
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
    
            const data = await response.json();
            setFoundFeatures(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    fetchFeatures();
  },[selectedOption])
  
  //console.log("Features",foundFeatures);

  async function handleCreate() {
    if (!foundFeatures) {
        return alert('Please wait until features are loaded.');
    }
    if (!title || !goal || !des || !details || !selectedOption || !images.length > 0 || !endAt) {
        return alert('Make sure all fields are not empty');
    }

    try {
        const promise = new Promise(async (resolve, reject) => {
            const CreateResponse = await fetch('/api/campaigns', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: title,
                    goal: parseFloat(goal),
                    fees: parseFloat(fees), // fees is not defined in the provided code snippet
                    description: des,
                    details: details,
                    feature_id: selectedOption,
                    featureType: foundFeatures.title,
                    imageSource: images[0],
                    endAt: new Date(endAt).toISOString()
                })
            });

            if (CreateResponse.ok) {
                resolve();
                router.push('/campaigns'); // Assuming 'router' is defined elsewhere
            } else {
                reject();
            }
        });
   
        await toast.promise(promise, {
            loading: 'Creating...',
            success: 'Created',
            error: 'Error',
        });
    } catch (error) {
        // Handle any errors here
        // console.error("@Post-Create Campaign:",error)
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
        setLoading(false);
        return alert('Failed To Upload');
    }

  }
  //console.log(images);
  return (
    <AdminLayout title='Campaign > Create Campaign'>
        <div className='p-4 flex flex-col gap-2 text-sm'>

            <div className='flex border w-1/2 bg-white rounded-md hover:shadow-md hover:shadow-[#18B8A8] '>
                <p className='flex-2 bg-[#18B8A8] text-white font-bold p-2 rounded-l-md text-sm'>CAMPAIGN TITLE</p>
                <input className='flex-1 px-1 outline-none rounded-r-md' type='text' value={title} onChange={(ev)=>{setTitle(ev.target.value)}} required={true}/>
            </div>

            <div className='flex border w-1/2 bg-white rounded-md hover:shadow-md hover:shadow-[#18B8A8]'>
                <p className='flex-2 bg-[#18B8A8] text-white font-bold p-2 rounded-l-md text-sm'>CAMPAIGN TYPE</p>
                <select className='flex-1 px-1 outline-none rounded-r-md' value={selectedOption} onChange={(ev)=>{setSelectedOption(ev.target.value)}} required={true}>
                {features.map(feature => (
                    <option key={feature._id} value={feature._id}>{feature.title}</option>
                ))}
                </select>
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

            <div className='flex border w-1/2 bg-white rounded-md hover:shadow-md hover:shadow-[#18B8A8]'>
                <p className='flex-2 bg-[#18B8A8] text-white font-bold p-2 rounded-l-md text-sm'>CAMPAIGN GOAL $</p>
                <input className='flex-1 px-1 outline-none rounded-r-md' type='text' value={goal} onChange={(ev)=>{setGoal(ev.target.value)}} required={true}/>
            </div>
            {selectedOption === '664c9a60ff37a060cd82674f' && (
                <div className='flex border w-1/2 bg-white rounded-md hover:shadow-md hover:shadow-[#18B8A8]'>
                    <p className='flex-2 bg-[#18B8A8] text-white font-bold p-2 rounded-l-md text-sm'>CONTRIBUTION PER PERSON $</p>
                    <input className='flex-1 px-1 outline-none rounded-r-md' type='text' placeholder='Goal / Users' value={fees} onChange={(ev)=>{setFees(ev.target.value)}} required={true}/>
                </div>
            )}

            <div className='flex border w-1/2 bg-white rounded-md hover:shadow-md hover:shadow-[#18B8A8]'>
                <p className='flex-2 bg-[#18B8A8] text-white font-bold p-2 rounded-l-md text-sm'>CAMPAIGN END DATE</p>
                <input className='flex-1 px-1 outline-none rounded-r-md' type="datetime-local" value={endAt} onChange={(ev)=>{setendAt(ev.target.value)}} required={true}/>
            </div>

            <div className='flex border w-1/2 bg-white rounded-md hover:shadow-md hover:shadow-[#18B8A8]'>
                <p className='flex-2 bg-[#18B8A8] text-white font-bold p-2 rounded-l-md text-sm'>CAMPAIGN DESCCRIPTION</p>
                <textarea className='flex-1 px-1 outline-none rounded-r-md' type='text' value={des} onChange={(ev)=>{setDes(ev.target.value)}} required={true}/>
            </div>
            <div className='flex border w-1/2 bg-white rounded-md hover:shadow-md hover:shadow-[#18B8A8]'>
                <p className='flex-2 bg-[#18B8A8] text-white font-bold p-2 rounded-l-md text-sm'>CAMPAIGN DETAILS</p>
                <textarea className='flex-1 px-1 outline-none rounded-r-md' type='text' value={details} onChange={(ev)=>{setDetails(ev.target.value)}} required={true}/>
            </div>

            <div className='flex gap-4 mt-4'>
                <button onClick={handleCreate}>
                    <div className='flex items-center gap-3 bg-blue-500 text-white p-2 rounded-lg hover:bg-white hover:text-[#272727] transition duration-300 hover:shadow-md'>
                    <MdOutlineDataSaverOff className="w-[20px] h-[20px]" />
                    <p>Create Campaign</p>
                    </div>
                </button>
                <Link href='/campaigns' >
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

export default Page