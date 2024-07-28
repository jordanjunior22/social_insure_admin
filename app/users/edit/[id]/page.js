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
    const [firstName,setfirstName] = useState('')
    const [lastName,setlastName] = useState('')
    const [email,setEmail] = useState('')
    const [phoneNumber,setPhoneNumber] = useState('')
    const [isAWellBeingSubscriber,setIsAWellBeingSubscriber] = useState('');  
    const [isVerified,setIsVerified] = useState('');  
    const [balance,setBalance] = useState(''); 
    const [isBlackListed,setIsBlackListed] = useState(''); 
    const [emailVerified,setEmailVerified] = useState(''); 
    const [createdAt,setCreatedAt] = useState(''); 
    const [imageUrl,setImageUrl] = useState(''); 

    const params = useParams();
    const router = useRouter();

    async function handleUpdate() {
        try {
            const promise = new Promise(async (resolve, reject) => {
                const CreateResponse = await fetch('/api/users', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        _id: params.id,
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        phoneNumber: phoneNumber,
                        isAWellBeingSubscriber:isAWellBeingSubscriber,
                        isVerified:isVerified,
                        balance:parseFloat(balance),
                        isBlackListed:isBlackListed,
                        emailVerified:emailVerified,
                        createdAt:createdAt,
                        imageUrl:imageUrl,

                    })
                });
    
                if (CreateResponse.ok) {
                    resolve();
                    router.push('/users'); // Assuming 'router' is defined elsewhere
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
            const response = await fetch('/api/users/findbyId', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ _id: params.id }),
            });
            if (response.ok) {
              const data = await response.json();
              setfirstName(data.firstName);
              setlastName(data.lastName);
              setEmail(data.email)
              setPhoneNumber(data.phoneNumber)
              setIsVerified(data.isVerified);
              setBalance(data.balance);
              setIsAWellBeingSubscriber(data.isAWellBeingSubscriber);
              setIsBlackListed(data.isBlackListed);
              setEmailVerified(data.emailVerified);
              setCreatedAt(data.createdAt);
              setImageUrl(data.imageUrl)

            } else {
              throw new Error('Failed to fetch users');
            }
          } catch (error) {
            console.error('@users edit Details ', error);
            // Handle error state or redirect to error page
          }
        };
    
        if (params.id) {
          fetchData();
        }
      }, [params.id]);

  return (
    <AdminLayout title='Users > Edit User'>
        <div className='p-4 text-sm'>

        <div className='flex border w-1/2 bg-white rounded-md hover:shadow-md hover:shadow-[#18B8A8] items-center'>
            <p className='flex-2 bg-[#18B8A8] text-white font-bold p-2 rounded-l-md text-sm'>First Name</p>
            <input type='text' className='flex-1 px-1 outline-none rounded-r-md' value={firstName} onChange={(ev)=>{setfirstName(ev.target.value)}}/>
        </div>

        <div className='flex border w-1/2 bg-white rounded-md hover:shadow-md hover:shadow-[#18B8A8] items-center'>
            <p className='flex-2 bg-[#18B8A8] text-white font-bold p-2 rounded-l-md text-sm'>First Name</p>
            <input type='text' className='flex-1 px-1 outline-none rounded-r-md' value={lastName} onChange={(ev)=>{setlastName(ev.target.value)}}/>
        </div>
        <div className='w-[200px] h-[200px] rounded-md'>
            <img src={imageUrl} alt='photo' className='w-full rounded-md' draggable={false}/>
        </div>
        <div className='flex border bg-white w-1/2 rounded-md hover:shadow-md hover:shadow-[#18B8A8] items-center'>
            <p className='flex-2 bg-[#18B8A8] text-white font-bold p-2 rounded-l-md text-sm'>Email</p>
            <input type='text' className='flex-1 px-1 outline-none rounded-r-md' value={email} onChange={(ev)=>{setEmail(ev.target.value)}}/>
        </div>
        <div className='flex border w-1/2 bg-white rounded-md hover:shadow-md hover:shadow-[#18B8A8] '>
            <p className='flex-2 bg-[#18B8A8] text-white font-bold p-2 rounded-l-md text-sm'>Phone Number</p>
            <input className='flex-1 px-1 outline-none rounded-r-md' type='text' value={phoneNumber} onChange={(ev)=>{setPhoneNumber(ev.target.value)}} required={true}/>
        </div>

        <div className='flex border w-1/2 bg-white rounded-md hover:shadow-md hover:shadow-[#18B8A8]'>
            <p className='flex-2 bg-[#18B8A8] text-white font-bold p-2 rounded-l-md text-sm'>Well Being Subscriber</p>
            <select className='flex-1 px-1 outline-none rounded-r-md'  value={isAWellBeingSubscriber} onChange={(ev)=>{setIsAWellBeingSubscriber(ev.target.value)}} required={true}>
                <option value="true">true</option>
                <option value="false">false</option>
            </select>        </div>

        {/* <div className='flex border w-1/2 bg-white rounded-md hover:shadow-md hover:shadow-[#18B8A8]'>
            <p className='flex-2 bg-[#18B8A8] text-white font-bold p-2 rounded-l-md text-sm'>Verification</p>
            <input className='flex-1 px-1 outline-none rounded-r-md' type='text' value={isVerified} onChange={(ev)=>{setIsVerified(ev.target.value)}} required={true}/>
        </div> */}

        <div className='flex border w-1/2 bg-white rounded-md hover:shadow-md hover:shadow-[#18B8A8]'>
            <p className='flex-2 bg-[#18B8A8] text-white font-bold p-2 rounded-l-md text-sm'>Balance $</p>
            <input className='flex-1 px-1 outline-none rounded-r-md' type='text' value={balance} onChange={(ev)=>{setBalance(ev.target.value)}} required={true}/>
        </div>

        {/* <div className='flex border w-1/2 bg-white rounded-md hover:shadow-md hover:shadow-[#18B8A8]'>
            <p className='flex-2 bg-[#18B8A8] text-white font-bold p-2 rounded-l-md text-sm'>Black Listed</p>
            <input className='flex-1 px-1 outline-none rounded-r-md' type='text' value={isBlackListed} onChange={(ev)=>{setIsBlackListed(ev.target.value)}} required={true}/>
        </div> */}

        <div className='flex border w-1/2 bg-white rounded-md hover:shadow-md hover:shadow-[#18B8A8]'>
            <p className='flex-2 bg-[#18B8A8] text-white font-bold p-2 rounded-l-md text-sm'>Joined Since</p>
            <input className='flex-1 px-1 outline-none rounded-r-md' type='text' value={ new Date(createdAt).toLocaleString()} onChange={(ev)=>{setCreatedAt(ev.target.value)}} required={true}/>
        </div>

        <div className='flex gap-4 mt-4'>
            <button onClick={handleUpdate}>
                <div className='flex items-center gap-3 bg-blue-500 text-white p-2 rounded-lg hover:bg-white hover:text-[#272727] transition duration-300 hover:shadow-md'>
                <FiEdit className="w-[20px] h-[20px]" />
                <p>Update</p>
                </div>
            </button>
            <Link href='/users' >
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
