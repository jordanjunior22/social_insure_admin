"use client"
import React, { useEffect, useState } from 'react';
import ActionButton from '@/components/ActionButton';
import { IoIosAddCircle } from 'react-icons/io';
import { CiSearch } from 'react-icons/ci';
import Link from 'next/link'
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrStatusGood } from "react-icons/gr";
import { FaEye } from "react-icons/fa";
import toast,{Toaster} from "react-hot-toast";
import { IoIosCloseCircle } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";


function Verification() {
    const [searchTerm, setSearchTerm] = useState('');
    const [verifications, setVerification] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [VerificationsPerPage] = useState(5); // Number of features per page
    const [sortBy, setSortBy] = useState('title'); // Default sort by createdAt
    const [sortDirection, setSortDirection] = useState('asc'); // Default sort direction
    const [isOpen, setIsOpen] = useState(false);
    const [image,setImage] = useState('')
    const openModal = (imageurl) => {
      setIsOpen(true);
      setImage(imageurl)
    };
  
    const closeModal = () => {
      setIsOpen(false);
    };
  

    const fetchData = async () => {
        try {
          const verificationResponse = await fetch('api/verification');
          const verificationData = await verificationResponse.json();
          setVerification(verificationData);
        } catch (error) {
          console.error('@verification Error fetching data:', error);
        }
      };
    
      useEffect(() => {
        fetchData();
      }, []);

      //console.log('sponsors : ',sponsors)

      const filteredVerification = verifications.filter(verification =>
        verification &&
        (
            verification.fullName.toLowerCase().includes(searchTerm.toLowerCase())
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

    filteredVerification.sort((a, b) => {
    const factor = sortDirection === 'asc' ? 1 : -1;
    if (sortBy === 'Full Name') {
        return factor * (a.fullName.toLowerCase().localeCompare(b.fullName.toLowerCase()));
    } else if (sortBy === 'createdAt') {
      return factor * (new Date(a.createdAt) - new Date(b.createdAt));
    }
    return 0;
  });
  
    // Logic for pagination
    const indexOfLastVerifications = currentPage * VerificationsPerPage;
    const indexOfFirstVerifications = indexOfLastVerifications - VerificationsPerPage;
    const currentVerifications = filteredVerification.slice(indexOfFirstVerifications, indexOfLastVerifications);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    
    async function handleApprove(verifications) {
      const promise = new Promise(async (resolve, reject) => {
        const response = await fetch('/api/verification', {
          method: 'PUT',
          body: JSON.stringify({ 
            _id:verifications._id, 
            user_id:verifications.userId,
            newStatus:'Approved',
          }),
        });
        if (response.ok) {
          resolve();
        } else {
          reject();
        }
      });
  
      await toast.promise(promise, {
        loading: 'Approving...',
        success: 'Approved',
        error: 'Error',
      });
  
      fetchData();
    }

    async function handleReject(verifications) {
      const promise = new Promise(async (resolve, reject) => {
        const response = await fetch('/api/verification/reject', {
          method: 'PUT',
          body: JSON.stringify({ 
            _id:verifications._id, 
            user_id:verifications.userId,
            newStatus:'Rejected',
          }),
        });
        if (response.ok) {
          resolve();
        } else {
          reject();
        }
      });
  
      await toast.promise(promise, {
        loading: 'Rejecting...',
        success: 'Rejected',
        error: 'Error',
      });
  
      fetchData();
    }


  return (
    <div className="p-4 text-sm">
        {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay" onClick={closeModal}></div>

          <div className="relative modal-content bg-gray-500 w-1/2 p-4 rounded-lg shadow-lg">
            <span
              className="modal-close absolute top-0 right-0 cursor-pointer text-3xl leading-none px-3 py-1"
              onClick={closeModal}
            >
              <IoIosCloseCircle className='w-[30px] h-[30px] text-red-500 pointer'/>
            </span>

            <div className="modal-body">
              <div className='h-[300px]'>
                <img src={image} alt='id image' className='w-full rounded-md h-full' draggable={false}/>
              </div>
            </div>
          </div>
        </div>
      )}
        <div className="flex items-center justify-between mb-4">
            <div className="border flex items-center w-1/2 p-2 bg-white rounded-lg hover:shadow-md">
            <input
                type="text"
                className="border-none w-full bg-inherit h-full outline-none"
                placeholder="Search Full Name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <CiSearch className="w-5 h-5 ml-2 text-gray-400" />
            </div>
        </div>

        {/* Table Filter Area */}
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border-gray-300 shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="py-2 px-3 border-r  text-sm">User ID</th>
                  <th className="py-2 px-3 border-r cursor-pointer text-sm" onClick={() => handleSort('Full Name')}>
                    Full Name {sortBy === 'Full Name' && (
                      <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th className="py-2 px-3 border-r  text-sm">Country</th>
                  <th className="py-2 px-3 border-r  text-sm">Verification Method</th>
                  <th className="py-2 px-3 border-r text-sm">Status</th>
                  <th className="py-2 px-3 border-r cursor-pointer text-sm" onClick={() => handleSort('createdAt')}>
                    Created At {sortBy === 'createdAt' && (
                      <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th className="py-2 px-3 border-r  text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
              {currentVerifications.map((verifications) => (
                <tr key={verifications._id} className="text-gray-800 text-sm">
                  <td className="py-2 px-3 border-r">{verifications.userId}</td>
                  <td className="py-2 px-3 border-r">{verifications.fullName}</td>
                  <td className="py-2 px-3 border-r">{verifications.country}</td>
                  <td className="py-2 px-3 border-r">{verifications.verificationMethod}</td>
                  {verifications.status === 'Approved' && (
                    <td className="py-2 px-3 border-r bg-green-500 text-white">{verifications.status}</td>
                  )}
                  {verifications.status === 'Pending' && (
                    <td className="py-2 px-3 border-r bg-orange-200 text-white">{verifications.status}</td>
                  )}
                  {verifications.status === 'Rejected' && (
                    <td className="py-2 px-3 border-r bg-red-500 text-white">{verifications.status}</td>
                  )}
                  
                  <td className="py-2 px-3 border-r">{new Date(verifications.createdAt).toLocaleDateString()}</td>
                              
                  <td className="py-2 px-3 flex gap-1">
                    <button onClick={()=>openModal(verifications.idImageUrl)} className="bg-blue-500 text-white hover:text-green-900 shadow-md">
                        <div className='flex gap-1 items-center px-2 py-1'>
                          <CiImageOn className='w-[20px] h-[20px]'/>
                        </div>
                    </button>
                    <button onClick={()=>handleApprove(verifications)} className="bg-white text-[#18B8A8] hover:text-green-900 shadow-md border border-[#18B8A8]">
                        <div className='flex gap-1 items-center px-2 py-1'>
                        <GrStatusGood className='w-[10px] h-[10px]'/>
                        <p>Approve</p>
                        </div>
                    </button>
                    <button onClick={()=>handleReject(verifications)}  >
                      <div className="text-red-400 shadow-md hover:text-red-900 flex gap-1 items-center px-2 py-1 border border-red-400">
                        <FiEdit className='w-[10px] h-[10px]'/>
                        <p>Reject</p>
                      </div>
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
            {Array.from({ length: Math.ceil(filteredVerification.length / VerificationsPerPage) }, (_, index) => (
              <li key={index}>
                <button
                  onClick={() => paginate(index + 1)}
                  className={`relative block py-2 px-3 leading-tight border border-gray-300 text-black border-r-${index === Math.ceil(filteredVerification.length / VerificationsPerPage) - 1 ? '0' : '1'} hover:bg-gray-200 ${currentPage === index + 1 ? 'bg-[#18B8A8] text-white' : 'hover:bg-white'}`}
                >
                  {index + 1}
                </button>
              </li>
            ))}

            {/* Next Button */}
            <li>
              <button
                onClick={() => paginate(currentPage + 1)}
                className={`relative block py-2 px-3 leading-tight bg-white border border-white text-black border-l-${currentPage === Math.ceil(filteredVerification.length / VerificationsPerPage) ? '0' : '1'} rounded-r hover:bg-gray-200`}
                disabled={currentPage === Math.ceil(filteredVerification.length / VerificationsPerPage)}
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

export default Verification