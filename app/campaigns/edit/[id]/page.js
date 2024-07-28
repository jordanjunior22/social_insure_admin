'use client';

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { IoArrowBackCircle } from 'react-icons/io5';
import { FiEdit } from 'react-icons/fi';
import AdminLayout from '@/components/AdminLayout'; // Assuming AdminLayout is a custom component
import { useRouter } from 'next/navigation'
import toast,{Toaster} from "react-hot-toast";

export default function Page() {
  const params = useParams();
  const router = useRouter();
  // State variables
  const [foundCampaign, setFoundCampaign] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editGoal, setEditGoal] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editDes, setEditDes] = useState('');
  const [editDetails, setEditDetails] = useState('');
  const [changeEndDate, setChangeEndDate] = useState(false);

  const handleUpdate = async() =>{
    try{
      const promise = new Promise(async (resolve, reject)=>{
        const UpdateResponse = await fetch('/api/campaigns' ,{
          method:'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: _id, // Assuming _id is available in scope
            title: editTitle,
            goal: parseFloat(editGoal), // Convert to number if necessary
            endAt: new Date(editDate).toISOString(), // Assuming editDate is in correct format (e.g., YYYY-MM-DDTHH:MM)
            description: editDes,
            details: editDetails,
          }),
        });
        if(UpdateResponse.ok){
          //console.log("successfully updated");
          resolve();
          router.push('/campaigns');
        }else{
          reject();
        }
  
      });
      await toast.promise(promise, {
        loading: 'Updating...',
        success: 'Updated',
        error: 'Error',
    });
    }catch(error){
      console.error("Error @Edit-Camapaign :", error);
    }
  }

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
        if (response.ok) {
          const data = await response.json();
          setFoundCampaign(data);
          setEditTitle(data.title);
          setEditGoal(String(data.goal));
          setEditDate(data.endAt);
          setEditDes(data.description);
          setEditDetails(data.details);
        } else {
          throw new Error('Failed to fetch campaign');
        }
      } catch (error) {
        console.error('@Campaign Details', error);
        // Handle error state or redirect to error page
      }
    };

    if (params.id) {
      fetchData();
    }
  }, [params.id]);

  // Loading state
  if (!foundCampaign) {
    return (
      <AdminLayout title="Campaign > Edit">
        <p>Loading...</p>
      </AdminLayout>
    );
  }

  // Destructuring campaign details
  const { _id, title, goal, raised, description, details, imageSource, createdAt, endAt } = foundCampaign;
  const percentageRaised = (raised / goal) * 100;

  return (
    <AdminLayout title="Campaign > Edit">
      <div className='p-4 text-sm'> {/* Example of applying styles using CSS modules */}
        {/* Campaign Title */}
        <div className="flex h-8 gap-2 items-center mb-2 bg-white w-1/2 px-1 border rounded-md hover:shadow-md">
          <strong className="flex-2">Campaign Title</strong>
          <input
            className="outline-none flex-1"
            value={editTitle}
            placeholder={title}
            onChange={(ev) => setEditTitle(ev.target.value)}
          />
        </div>

        {/* Campaign Image */}
        <div className="flex gap-4">
          <div className="w-[200px] h-[200px] rounded-md">
            <img src={imageSource} alt={title} className="w-full rounded-md" draggable={false} />
          </div>
          {/* Goal and Raised */}
          <div className="flex flex-col gap-1 w-1/2">
            {/* Goal */}
            <div className="flex gap-2 bg-white shadow-sm hover:shadow-md border rounded-md px-1 items-center h-8">
              <strong className="flex-2">Goal</strong>
              <input
                value={editGoal}
                placeholder={goal}
                onChange={(ev) => setEditGoal(ev.target.value)}
                className="w-full border-none outline-none flex-1"
              />
            </div>
            {/* Raised */}
            <p className="bg-gray-300 shadow-sm shadow-green-300 px-1 flex gap-2">
              <span>Raised: ${raised}</span>
            </p>
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
            {/* Created At */}
            <p className="flex gap-2 bg-gray-300 shadow-sm px-1">
              <span>Created At: {new Date(createdAt).toLocaleString()}</span>
            </p>
            {/* Ends At */}
            <div className="flex bg-white shadow-sm px-1 items-center h-8 gap-2 rounded-md">
              <strong>Ends At</strong>
              {!changeEndDate ? (
                <div className="flex gap-2 items-center justify-between">
                  <p className='flex-1'>{new Date(editDate).toLocaleString()}</p>
                  <button className="bg-green-500 text-white p-1" onClick={() => setChangeEndDate(true)}>
                    Change End Date
                  </button>
                </div>
              ) : (
                <div className="flex gap-2 items-center justify-between">
                  <input type="datetime-local" value={editDate} onChange={(e) => setEditDate(e.target.value)} className="border-none outline-none" />
                  <button className="bg-red-500 text-white p-1" onClick={() => setChangeEndDate(false)}>
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-2 flex gap-2 items-center">
          <strong>Description:</strong>
          <textarea
            placeholder={description}
            value={editDes}
            onChange={(ev) => setEditDes(ev.target.value)}
            className="w-full p-1 bg-white rounded-md"
          />
        </div>

        {/* Details */}
        <div className="mt-2 flex gap-2 items-center">
          <strong>Details:</strong>
          <textarea
            placeholder={details}
            value={editDetails}
            onChange={(ev) => setEditDetails(ev.target.value)}
            className="w-full p-1 bg-white rounded-md"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4 mt-4">
          <button onClick={handleUpdate}>
              <div className='flex items-center gap-3 bg-blue-500 text-white p-2 rounded-lg hover:bg-white hover:text-[#272727] transition duration-300 hover:shadow-md'>
                <FiEdit className="w-[20px] h-[20px]" />
                <p>Update</p>
              </div>
          </button>
          <Link href="/campaigns" className="bg-black rounded-lg text-white hover:bg-white hover:text-[#272727] transition duration-300 hover:shadow-md ">
            <div className="flex gap-1 items-center p-2">
              <IoArrowBackCircle className="w-[20px] h-[20px]" />
              <p>Go Back</p>
            </div>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
}
