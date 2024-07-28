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

export default function Page() {
    const [campaigns, setCampaigns] = useState([])
    const [campaignOption, setCampaignOption] = useState([])
    const [users,setUser] = useState([]);
    const [userOption,setUserOption] = useState([]);
    const [userOptionData,setUserOptionData] = useState({})
    const [campaignOptionData,setcampaignOptionData] = useState({});
    const [amount,setAmount] = useState(0);
    const [paymentId, setPaymentId] = useState('');
    const [createdAt,setCreatedAt] = useState('');
    const router = useRouter();

    const fetchUser = async () => {
        try{
            const userResponse = await fetch('/api/users');
            const users = await userResponse.json();
            setUser(users);
            if(users.length>0){
                setUserOption(users[0]._id)
            }
        }catch(error){
            console.error('@CreatContributions Error fetching users:', error);

        }
    }
    const fetchCampaigns = async () => {
        try {
            const response = await fetch('/api/campaigns');
            const data = await response.json();
            setCampaigns(data);
            if(data.length>0){
                setCampaignOption(data[0]._id)
            }
        } catch (error) {
            console.error('@CreatContributions Error fetching Campaigns:', error);
        }
    }

    useEffect(()=>{
        fetchCampaigns();
        fetchUser();
    },[])
    useEffect(()=>{
        const index = users.findIndex(item => item._id === userOption);
        setUserOptionData(users[index]);
    },[userOption])

    useEffect(()=>{
        const index = campaigns.findIndex(item => item._id === campaignOption);
        setcampaignOptionData(campaigns[index]);
    },[campaignOption])

    //console.log(campaigns)
    //console.log('selected : ',campaignOptionData)
    async function handleCreate() {
        try {
            const promise = new Promise(async (resolve, reject) => {
                const CreateResponse = await fetch('/api/contributions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        campaign_id: campaignOptionData._id,
                        campaign_title: campaignOptionData.title,
                        user_id: userOptionData._id,
                        fullName: userOptionData.lastName + ' ' + userOptionData.firstName,
                        amount: amount,
                        email: userOptionData.email,
                        paymentId: paymentId,
                        createdAt: new Date(createdAt).toISOString()
                    })
                });
    
                if (CreateResponse.ok) {
                    resolve();
                    router.push('/contributions'); // Assuming 'router' is defined elsewhere
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

  return (
    <AdminLayout title='Contributions > New Create'>
        <div className='p-4 text-sm'>

            <div className='flex border w-1/2 bg-white rounded-md hover:shadow-md hover:shadow-[#18B8A8] items-center'>
                <p className='flex-2 bg-[#18B8A8] text-white font-bold p-2 rounded-l-md text-sm'>Campaign ID</p>
                <select className='flex-1 px-1 outline-none rounded-r-md'  value={campaignOption} onChange={(ev)=>{setCampaignOption(ev.target.value)}} required={true}>
                {campaigns.map(campaign => (
                    <option key={campaign._id} value={campaign._id}>{campaign._id}</option>
                ))}
                </select>
            </div>
            <div className='flex border w-1/2 bg-gray-300 rounded-md hover:shadow-md hover:shadow-[#18B8A8] items-center'>
                <p className='flex-2 bg-[#18B8A8] text-white font-bold p-2 rounded-l-md text-sm'>Campaign Title</p>
                <p className='flex-1 px-1 outline-none rounded-r-md '>{campaignOptionData?.title}</p>
            </div>

            <div className='flex border w-1/2 bg-white rounded-md hover:shadow-md hover:shadow-[#18B8A8] items-center'>
                <p className='flex-2 bg-[#18B8A8] text-white font-bold p-2 rounded-l-md text-sm'>User ID</p>
                <select className='flex-1 px-1 outline-none rounded-r-md'  value={userOption} onChange={(ev)=>{setUserOption(ev.target.value)}} required={true}>
                {users.map(user => (
                    <option key={user._id} value={user._id}>{user._id}</option>
                ))}
                </select>
            </div>
            <div className='flex border w-1/2 bg-gray-300 rounded-md hover:shadow-md hover:shadow-[#18B8A8] items-center'>
                <p className='flex-2 bg-[#18B8A8] text-white font-bold p-2 rounded-l-md text-sm'>First Name</p>
                <p className='flex-1 px-1 outline-none rounded-r-md'>{userOptionData?.firstName}</p>
            </div>
            <div className='flex border w-1/2 bg-gray-300 rounded-md hover:shadow-md hover:shadow-[#18B8A8] items-center'>
                <p className='flex-2 bg-[#18B8A8] text-white font-bold p-2 rounded-l-md text-sm'>Last Name</p>
                <p className='flex-1 px-1 outline-none rounded-r-md'>{userOptionData?.lastName}</p>
            </div>
            <div className='flex border w-1/2 bg-gray-300 rounded-md hover:shadow-md hover:shadow-[#18B8A8] items-center'>
                <p className='flex-2 bg-[#18B8A8] text-white font-bold p-2 rounded-l-md text-sm'>Email</p>
                <p className='flex-1 px-1 outline-none rounded-r-md'>{userOptionData?.email}</p>
            </div>
            <div className='flex border w-1/2 bg-white rounded-md hover:shadow-md hover:shadow-[#18B8A8] items-center'>
                <p className='flex-2 bg-[#18B8A8] text-white font-bold p-2 rounded-l-md text-sm'>Amount $</p>
                <input type='text' placeholder='$0' className='flex-1 px-1 outline-none rounded-r-md' value={amount} onChange={(ev)=>{setAmount(ev.target.value)}}/>
            </div>
            <div className='flex border w-1/2 bg-white rounded-md hover:shadow-md hover:shadow-[#18B8A8] items-center'>
                <p className='flex-2 bg-[#18B8A8] text-white font-bold p-2 rounded-l-md text-sm'>Payment ID</p>
                <input type='text' className='flex-1 px-1 outline-none rounded-r-md' value={paymentId} onChange={(ev)=>{setPaymentId(ev.target.value)}}/>
            </div>
            <div className='flex border w-1/2 bg-white rounded-md hover:shadow-md hover:shadow-[#18B8A8] items-center'>
                <p className='flex-2 bg-[#18B8A8] text-white font-bold p-2 rounded-l-md text-sm'>Date</p>
                <input type='date' className='flex-1 px-1 outline-none rounded-r-md' value={createdAt} onChange={(ev)=>{setCreatedAt(ev.target.value)}}/>
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
