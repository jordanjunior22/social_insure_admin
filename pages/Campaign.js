"use client"
import React, { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { IoIosAddCircle } from 'react-icons/io';
import { FaEye } from "react-icons/fa";
import ActionButton from '@/components/ActionButton';
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Link from 'next/link'
import toast,{Toaster} from "react-hot-toast";

export default function Campaign() {
  const [campaigns, setCampaigns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [campaignsPerPage] = useState(5); // Number of campaigns per page
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('createdAt'); // Default sort by createdAt
  const [sortDirection, setSortDirection] = useState('asc'); // Default sort direction

  const fetchData = async () => {
    try {
      const campaignResponse = await fetch('api/campaigns');
      const campaignsData = await campaignResponse.json();
      setCampaigns(campaignsData);

    } catch (error) {
      console.error('@Campaign Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function handleDeleteClick(_id) {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/campaigns?_id='+_id, {
        method: 'DELETE',
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(promise, {
      loading: 'Deleting...',
      success: 'Deleted',
      error: 'Error',
    });

    fetchData();
  }
  // Logic for pagination
  const indexOfLastCampaign = currentPage * campaignsPerPage;
  const indexOfFirstCampaign = indexOfLastCampaign - campaignsPerPage;
  
  const filteredCampaigns = campaigns.filter(campaign =>
    campaign?.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle sorting
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  // Apply sorting to campaigns
  filteredCampaigns.sort((a, b) => {
    const factor = sortDirection === 'asc' ? 1 : -1;
    if (sortBy === 'createdAt') {
      return factor * (new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === 'title') {
      return factor * (a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
    } else if (sortBy === 'goal') {
      return factor * (a.goal - b.goal);
    } else if (sortBy === 'raised') {
      return factor * (a.raised - b.raised);
    }
    return 0;
  });

  // Get current campaigns after sorting
  const currentCampaigns = filteredCampaigns.slice(indexOfFirstCampaign, indexOfLastCampaign);

  // Function to calculate progress percentage
  const calculateProgress = (raised, goal) => {
    if (goal > 0) {
      return Math.min(100, Math.floor((raised / goal) * 100));
    }
    return 0;
  };
  
  // Function to handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-4 text-sm">
      {/* Search Filter Area */}

      <div className="flex items-center justify-between mb-4">
        <div className="border flex items-center w-1/2 p-2 bg-white rounded-lg hover:shadow-md">
          <input
            type="text"
            className="border-none w-full bg-inherit h-full outline-none"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <CiSearch className="w-5 h-5 ml-2 text-gray-400" />
        </div>
        <ActionButton link="/campaigns/create-campaign" icon={IoIosAddCircle} text="New Campaign" />
      </div>

      {/* Table Filter Area */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-gray-300 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="py-2 px-3 border-r cursor-pointer text-sm" onClick={() => handleSort('title')}>
                Title {sortBy === 'title' && (
                  <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th className="py-2 px-3 border-r cursor-pointer text-sm" onClick={() => handleSort('featureType')}>
                Feature Type
              </th>
              <th className="py-2 px-3 border-r cursor-pointer text-sm" onClick={() => handleSort('goal')}>
                Goal {sortBy === 'goal' && (
                  <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th className="py-2 px-3 border-r cursor-pointer text-sm" onClick={() => handleSort('raised')}>
                Raised {sortBy === 'raised' && (
                  <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th className="py-2 px-3 border-r  text-sm">Progress</th>
              <th className="py-2 px-3 border-r cursor-pointer text-sm" onClick={() => handleSort('createdAt')}>
                Created {sortBy === 'createdAt' && (
                  <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th className="py-2 px-3 border-r text-sm">End</th>
              <th className="py-2 px-3 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody className='text-sm'>
            {currentCampaigns.map((campaign) => (
              <tr key={campaign._id} className="text-gray-800">
                <td className="py-2 px-3 border-r">{campaign.title}</td>
                <td className="py-2 px-3 border-r">{campaign.featureType}</td>
                <td className="py-2 px-3 border-r">${campaign.goal}</td>
                <td className="py-2 px-3 border-r">${campaign.raised}</td>
                <td className="py-2 px-3 border-r">
                  <div className="w-full bg-gray-200 rounded-full">
                    <div
                      className="bg-[#18B8A8] text-xs leading-none py-1 text-center text-white rounded-full"
                      style={{ width: `${calculateProgress(campaign.raised, campaign.goal)}%` }}
                    >
                      {calculateProgress(campaign.raised, campaign.goal)}%
                    </div>
                  </div>
                </td>
                <td className="py-2 px-3 border-r">{new Date(campaign.createdAt).toLocaleDateString()}</td>
                <td className="py-2 px-3 border-r">{new Date(campaign.endAt).toLocaleDateString()}</td>
                <td className="py-2 px-3 flex gap-1">
                  <Link href={`/campaigns/details/${campaign._id}`} className="bg-white text-[#18B8A8] hover:text-green-900 shadow-md border border-[#18B8A8]">
                    <div className='flex gap-1 items-center px-2 py-1'>
                      <FaEye className='w-[10px] h-[10px]'/>
                      <p>View</p>
                    </div>
                  </Link>
                  <Link href={`/campaigns/edit/${campaign._id}`} className="bg-white text-[#18B8A8] hover:text-green-900 shadow-md border border-[#18B8A8]">
                    <div className='flex gap-1 items-center px-2 py-1'>
                      <FiEdit className='w-[10px] h-[10px]'/>
                      <p>Edit</p>
                    </div>
                  </Link>

                  <button  onClick={()=>handleDeleteClick(campaign._id)} className="text-red-400 shadow-md hover:text-red-900 flex gap-1 items-center px-2 py-1 border border-red-400">
                    <RiDeleteBin6Line className='w-[10px] h-[10px]'/>
                    <p>Delete</p>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-end">
        <nav className="block">
          <ul className="flex pl-0 rounded list-none flex-wrap">
            {/* Previous Button */}
            <li>
              <button
                onClick={() => paginate(currentPage - 1)}
                className={`relative block py-2 px-3 leading-tight bg-white border border-white text-black border-r-${currentPage === 1 ? '0' : '1'} rounded-l hover:bg-gray-200`}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>
            
            {/* Page Numbers */}
            {Array.from({ length: Math.ceil(filteredCampaigns.length / campaignsPerPage) }, (_, index) => (
              <li key={index}>
                <button
                  onClick={() => paginate(index + 1)}
                  className={`relative block py-2 px-3 leading-tight border border-gray-300 text-black border-r-${index === Math.ceil(filteredCampaigns.length / campaignsPerPage) - 1 ? '0' : '1'} hover:bg-gray-200 ${currentPage === index + 1 ? 'bg-[#18B8A8] text-white' : 'hover:bg-white'}`}
                >
                  {index + 1}
                </button>
              </li>
            ))}

            {/* Next Button */}
            <li>
              <button
                onClick={() => paginate(currentPage + 1)}
                className={`relative block py-2 px-3 leading-tight bg-white border border-white text-black border-l-${currentPage === Math.ceil(filteredCampaigns.length / campaignsPerPage) ? '0' : '1'} rounded-r hover:bg-gray-200`}
                disabled={currentPage === Math.ceil(filteredCampaigns.length / campaignsPerPage)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
