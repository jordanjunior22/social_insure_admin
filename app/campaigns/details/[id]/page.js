'use client'
 
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import dynamic from 'next/dynamic';
const AdminLayout = dynamic(() => import('@/components/AdminLayout'), { ssr: false });
import { IoArrowBackCircle } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
export default function Page() {
  const params = useParams();
  const [foundCampaign, setFoundCampaign] = useState(null); // Initialize as null or an empty object


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/campaigns/find', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: params.id }),
        });
        const data = await response.json();
        setFoundCampaign(data);
      } catch (error) {
        console.error("@Campaign Details", error);
      }
    };
    fetchData();
  }, [params.id]);

  // Render loading state or error message while fetching
  if (!foundCampaign) {
    return(
      <AdminLayout title='Campaign > Details'>
        <p>Loading...</p>;
     </AdminLayout>
    );
  }

  // Destructure campaign details
  const { title, goal, raised, description, details, imageSource, createdAt, endAt } = foundCampaign;
  const percentageRaised = (raised / goal) * 100;
  return (
    <AdminLayout title='Campaign > Details'>
      <div className="campaign-details p-4 text-sm">
        <h1 className='text-4xl mb-4'>{title}</h1>
        <div className='flex gap-4'>
          <div className='w-[200px] h-[200px] rounded-md'>
            <img src={imageSource} alt={title} className='w-full rounded-md' draggable={false}/>
          </div>
          <div className='flex flex-col gap-1'>
            <p className='bg-white shadow-sm shadow-orange-300 px-1'><strong>Goal:</strong> ${goal}</p>
            <p className='bg-white shadow-sm shadow-green-300 px-1'><strong>Raised:</strong> ${raised}</p>
            {/* Progress bar */}
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-orange-600 bg-orange-200">
                    Progress: {percentageRaised.toFixed(2)}%
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-orange-600">
                    {raised} / {goal}
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-orange-200">
                <div style={{ width: `${percentageRaised}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500"></div>
              </div>
            </div>
            {/* End of Progress bar */}
            <p className='bg-white shadow-sm px-1'><strong>Created At:</strong> {new Date(createdAt).toLocaleString()}</p>
            <p className='bg-white shadow-sm px-1'><strong>Ends At:</strong> {new Date(endAt).toLocaleString()}</p>
          </div>
        </div>
        <p className='opacity-60'><strong>Description:</strong> {description}</p>
        <p className='opacity-60'><strong>Details:</strong> {details}</p>
        
        <div className='flex items-center gap-4 mt-4'>
          <Link href={`/campaigns/edit/${params.id}`}>
              <div className='flex items-center gap-3 bg-blue-500 text-white p-2 rounded-lg hover:bg-white hover:text-[#272727] transition duration-300 hover:shadow-md'>
                <FiEdit className="w-[20px] h-[20px]" />
                <p>Edit</p>
              </div>
          </Link>
          <Link href='/campaigns'>
              <div className='flex items-center gap-3 bg-black text-white p-2 rounded-lg hover:bg-white hover:text-[#272727] transition duration-300 hover:shadow-md'>
                <IoArrowBackCircle className='w-[20px] h-[20px]'/>
                <p>Go Back</p>
              </div>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
  
}
