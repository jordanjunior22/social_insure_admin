"use client"
import React, { useEffect, useState } from 'react';
import ActionButton from '@/components/ActionButton';
import { IoIosAddCircle } from 'react-icons/io';
import { CiSearch } from 'react-icons/ci';
import Link from 'next/link'
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import toast,{Toaster} from "react-hot-toast";

function Contribution() {
    const [searchTerm, setSearchTerm] = useState('');
    const [contributions, setContributions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [contributionsPerPage] = useState(5); // Number of contributions per page
    const [sortBy, setSortBy] = useState('createdAt'); // Default sort by createdAt
    const [sortDirection, setSortDirection] = useState('asc'); // Default sort direction

    const fetchData = async () => {
        try {
          const contributionsResponse = await fetch('api/contributions');
          const contributionsData = await contributionsResponse.json();
          setContributions(contributionsData);
    
        } catch (error) {
          console.error('@contributions Error fetching data:', error);
        }
      };
    
      useEffect(() => {
        fetchData();
      }, []);

      console.log('Contributions : ',contributions)

      const filteredContribution = contributions.filter(contribution =>
        contribution &&
        (
            contribution.campaign_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contribution.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contribution.user_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contribution.paymentId.toLowerCase().includes(searchTerm.toLowerCase())
        )
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

    filteredContribution.sort((a, b) => {
    const factor = sortDirection === 'asc' ? 1 : -1;
    if (sortBy === 'createdAt') {
      return factor * (new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === 'title') {
      return factor * (a.campaign_title.toLowerCase().localeCompare(b.campaign_title.toLowerCase()));
    } else if (sortBy === 'amount') {
      return factor * (a.amount - b.amount);
    }
    return 0;
  });
  
    // Logic for pagination
    const indexOfLastContribution = currentPage * contributionsPerPage;
    const indexOfFirstContribution = indexOfLastContribution - contributionsPerPage;
    const currentContributions = filteredContribution.slice(indexOfFirstContribution, indexOfLastContribution);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    
    async function handleDeleteClick(_id) {
      const promise = new Promise(async (resolve, reject) => {
        const response = await fetch('/api/contributions?_id='+_id, {
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

  return (
    <div className="p-4 text-sm">
        
        <div className="flex items-center justify-between mb-4">
            <div className="border flex items-center w-1/2 p-2 bg-white rounded-lg hover:shadow-md">
            <input
                type="text"
                className="border-none w-full bg-inherit h-full outline-none"
                placeholder="Search Contributions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <CiSearch className="w-5 h-5 ml-2 text-gray-400" />
            </div>
            <ActionButton link="/contributions/create-contribution" icon={IoIosAddCircle} text="New Contribution" />
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
                  {/* <th className="py-2 px-3 border-r  text-sm">User ID</th> */}
                  <th className="py-2 px-3 border-r  text-sm">Payment ID</th>
                  <th className="py-2 px-3 border-r  text-sm">User</th>
                  <th className="py-2 px-3 border-r  text-sm">Email</th>
                  <th className="py-2 px-3 border-r cursor-pointer text-sm" onClick={() => handleSort('goal')}>
                      Amount {sortBy === 'amount' && (
                      <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th className="py-2 px-3 border-r cursor-pointer text-sm" onClick={() => handleSort('createdAt')}>
                      Created {sortBy === 'createdAt' && (
                      <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th className="py-2 px-3 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
              {currentContributions.map((constribution) => (
                <tr key={constribution._id} className="text-gray-800 text-sm">
                  <td className="py-2 px-3 border-r">{constribution.campaign_title}</td>
                  {/* <td className="py-2 px-3 border-r">{constribution.user_id}</td> */}
                  <td className="py-2 px-3 border-r">{constribution.paymentId}</td>
                  <td className="py-2 px-3 border-r">{constribution.fullName}</td>
                  <td className="py-2 px-3 border-r">{constribution.email}</td>
                  <td className="py-2 px-3 border-r">
                    <p className='bg-blue-500 p-1 text-white rounded-md text-center'>${constribution.amount}</p> 
                  </td>
                  <td className="py-2 px-3 border-r">{new Date(constribution.createdAt).toLocaleDateString()}</td>
                              
                  <td className="py-2 px-3 flex gap-1">

                    <Link href={`/contributions/edit/${constribution._id}`} className="bg-white text-[#18B8A8] hover:text-green-900 shadow-md border border-[#18B8A8]">
                      <div className='flex gap-1 items-center px-2 py-1'>
                        <FiEdit className='w-[10px] h-[10px]'/>
                        <p>Edit</p>
                      </div>
                    </Link>
                    <button  onClick={()=>handleDeleteClick(constribution._id)} className="text-red-400 shadow-md hover:text-red-900 flex gap-1 items-center px-2 py-1 border border-red-400">
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
            {Array.from({ length: Math.ceil(filteredContribution.length / contributionsPerPage) }, (_, index) => (
              <li key={index}>
                <button
                  onClick={() => paginate(index + 1)}
                  className={`relative block py-2 px-3 leading-tight border border-gray-300 text-black border-r-${index === Math.ceil(filteredContribution.length / contributionsPerPage) - 1 ? '0' : '1'} hover:bg-gray-200 ${currentPage === index + 1 ? 'bg-[#18B8A8] text-white' : 'hover:bg-white'}`}
                >
                  {index + 1}
                </button>
              </li>
            ))}

            {/* Next Button */}
            <li>
              <button
                onClick={() => paginate(currentPage + 1)}
                className={`relative block py-2 px-3 leading-tight bg-white border border-white text-black border-l-${currentPage === Math.ceil(filteredContribution.length / contributionsPerPage) ? '0' : '1'} rounded-r hover:bg-gray-200`}
                disabled={currentPage === Math.ceil(filteredContribution.length / contributionsPerPage)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>

    </div>
  )
}

export default Contribution