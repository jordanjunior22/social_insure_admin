"use client"
import React,{useEffect,useState} from 'react'
import UserButton from '../components/UserButton' 
import { CiSearch } from 'react-icons/ci';

export default function Users() {
    const [users,setUsers] = useState([])
    const [members, setMembers] = useState([])
    const [searchTerm,setSearchTerm] =useState('')

    const filteredUsersBySearch = users.filter(user =>
      user?.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?._id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredMembersBySearch = members.filter(user =>
      user?.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?._id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const fetchData = async () => {
        try {
          const usersResponse = await fetch('api/users');
          const usersData = await usersResponse.json();
          const wellBeingSubscribers = usersData.filter(user => user.isAWellBeingSubscriber);
          setMembers(wellBeingSubscribers)
          setUsers(usersData);
    
        } catch (error) {
          console.error('@users Error fetching data:', error);
        }
      };
    
      useEffect(() => {
        fetchData();
      }, []);
  return (
    <div className='p-4 text-sm'>
        <div className='flex justify-betweeng gap-1'>
            <div className='bg-white p-2 border w-1/2 rounded-md overflow-y-auto h-[250px]'>
                <p className=' font-bold text-xl text-gray-400'>All Users</p>
                <div className="border flex items-center p-2 bg-white rounded-lg hover:shadow-md mb-2">
                  <input
                    type="text"
                    className="border-none w-full bg-inherit h-full outline-none "
                    placeholder="Search By First Name, Last Name, ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <CiSearch className="w-5 h-5 ml-2 text-gray-400" />
                </div>
                <div className='flex flex-col gap-1'>
                {filteredUsersBySearch.map((user) => (
                <UserButton key={user.id} imageUrl={user.imageUrl} name={user.firstName} data={user}/>
                ))}
                </div>
            </div>
            <div className='p-2 border w-1/2 rounded-md overflow-y-auto h-[250px] bg-[#18B8A8]'>
                <p className='text-white font-bold text-xl'>Social Well-Being Members</p>
                <div className="border flex items-center p-2 bg-white rounded-lg hover:shadow-md mb-2">
                  <input
                    type="text"
                    className="border-none w-full bg-inherit h-full outline-none "
                    placeholder="Search By First Name, Last Name, ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <CiSearch className="w-5 h-5 ml-2 text-gray-400" />
                </div>
                <div className='flex flex-col gap-1'>
                {filteredMembersBySearch.map((user) => (
                <UserButton key={user.id} imageUrl={user.imageUrl} name={user.firstName} data={user}/>
                ))}
                </div>
            </div>
        </div>

    </div>
  )
}
