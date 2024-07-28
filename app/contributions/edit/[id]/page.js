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
    const params = useParams();
    const router = useRouter();

    const fetchUser = async () => {
        try{
            const userResponse = await fetch('/api/users');
            const users = await userResponse.json();
            setUser(users);
        }catch(error){
            console.error('@CreatContributions Error fetching users:', error);

        }
    }
    const fetchCampaigns = async () => {
        try {
            const response = await fetch('/api/campaigns');
            const data = await response.json();
            setCampaigns(data);
     
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
    async function handleUpdate() {
        try {
            const promise = new Promise(async (resolve, reject) => {
                const CreateResponse = await fetch('/api/contributions', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        _id:params.id,
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
            const response = await fetch('/api/contributions/find', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ id: params.id }),
            });
            if (response.ok) {
              const data = await response.json();
              setAmount(data.amount);
              setPaymentId(data.paymentId);
              setCreatedAt(data.createdAt);
              setUserOption(data.user_id)
              setCampaignOption(data.campaign_id)
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
    <AdminLayout title='Contributions > Edit'>
        <div className='p-4 flex flex-col gap-2 text-sm'>

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
                <p>{new Date(createdAt).toLocaleString()}</p>
                <input type='date' className='flex-1 px-1 outline-none rounded-r-md' value={createdAt} onChange={(ev)=>{setCreatedAt(ev.target.value)}}/>
            </div>

            <div className='flex gap-4 mt-4'>
                <button onClick={handleUpdate} className="bg-blue-500 text-white rounded-lg hover:text-blue-900 shadow-md">
                    <div className="flex gap-1 items-center p-2">
                    <FiEdit className="w-[20px] h-[20px]" />
                    <p>Update</p>
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
