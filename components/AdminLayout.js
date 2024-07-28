"use client"
import {
  SignInButton,
  UserButton,
  useUser
} from '@clerk/nextjs';
import React from 'react'
import LinkButton from './LinkButton'
import { MdSpaceDashboard,MdCampaign,MdAccountBalanceWallet,MdVerified   } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { SiGithubsponsors } from "react-icons/si";
import { BiSolidNotification } from "react-icons/bi";
import { ImUsers } from "react-icons/im";
import { FiLogOut } from "react-icons/fi";
import {Toaster} from "react-hot-toast";

function AdminLayout({children,title}) {
  const { user} = useUser();

  return (
    <div className='border h-screen p-4 bg-white'>
        <Toaster
            position="top-right"
            reverseOrder={false}
          />
        <div className='flex items-center justify-between w-full '>

            <div className='w-[50px] bg-[#18B8A8] p-1 rounded-md'>
              <img src='../../logo.png' alt='logo' className='w-full'/>
            </div>

            <div className='flex justify-between w-4/5'>
                <div  className=''>
                  <p className='text-3xl font-bold text-[#18B8A8]'>{title}</p>
                  <p className=''>Hello {user?.fullName}!</p>
                </div>
                <UserButton />
            </div>
        </div>

        <div className='flex justify-between mt-4'>
            <div className='flex flex-col justify-between gap-10'>
              <div className='flex flex-col gap-1'>
                <LinkButton label='Dashboard' link='/' icon={MdSpaceDashboard}/>
                <LinkButton label='Campaigns' link='/campaigns' icon={MdCampaign}/>
                <LinkButton label='Contributions' link='/contributions' icon={MdAccountBalanceWallet}/>
                <LinkButton label='Features' link='/features' icon={AiFillProduct}/>
                <LinkButton label='Sponsors' link='/sponsors' icon={SiGithubsponsors}/>
                <LinkButton label='Verifications' link='/verifications' icon={MdVerified}/>
                <LinkButton label='Notifications' link='/notifications' icon={BiSolidNotification }/>
                <LinkButton label='Users/Memberships' link='/users' icon={ImUsers}/>
              </div>
              <div>
                <LinkButton label='Logout' link='/logout' icon={FiLogOut}/>
              </div>
            </div>
            <div className='rounded-sm w-4/5 overflow-y-auto max-h-[500px] bg-[#f0f2f5] scrollbar'>
              {children}
            </div>
        </div>

    </div>
  )
}

export default AdminLayout