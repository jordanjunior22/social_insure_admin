"use client"
import React,{useEffect,useState} from 'react'
import { ImCalculator } from "react-icons/im";
import CampaignStats from '@/components/CampaignStats';
import { IoMdFlame,IoIosCheckmarkCircle } from 'react-icons/io';
import { FaRegPlayCircle } from 'react-icons/fa';
import ContributionChart from '@/components/ContributionChart';
import contributionData from '@/data/contributionData';


function Dashboard() {

  const [campaigns, setCampaigns] = useState([]);
  const [contributions,setContributions] = useState([])
  const [filteredCampaigns,setfilteredCampaigns] = useState([])
  //console.log('contribution data',contributions)
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch campaigns
        const campaignResponse = await fetch('api/campaigns');
        const campaignsData = await campaignResponse.json();
        setCampaigns(campaignsData);

        // Fetch contributions
        const contributionsResponse = await fetch('api/contributions');
        const contributionsData = await contributionsResponse.json();
        setContributions(contributionsData);
      } catch (error) {
        console.error('@Dashboard Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (campaigns.length > 0 && contributions.length > 0) {
      const filteredCampaigns = campaigns.filter(campaign =>
        contributions.some(contribution => contribution.campaign_id === campaign._id)
      );
      setfilteredCampaigns(filteredCampaigns)
      //console.log('Filtered Campaigns:', filteredCampaigns);
    }
    
  }, [campaigns, contributions]);

  //console.log("Campaigns @Dashboard : ",campaigns);
  const currentDate = new Date();
  const activeCampaigns = campaigns.filter(campaign => new Date(campaign.endAt) > currentDate);
  const completedCampaigns = campaigns.filter(campaign => new Date(campaign.endAt) <= currentDate);


  const frequencyMap = {};
  filteredCampaigns.forEach(item => {
    if (item.featureType in frequencyMap) {
      frequencyMap[item.featureType]++;
    } else {
      frequencyMap[item.featureType] = 1;
    }
  });
  const frequencyArray = Object.keys(frequencyMap).map(key => ({
    featureType: key,
    count: frequencyMap[key]
  }));
  //console.log(frequencyArray);



  return (
    <div className='p-4 text-sm'>
        <div className='flex gap-5'>
            <CampaignStats 
                label='Total Campaigns' 
                total={campaigns.length} 
                icon={ImCalculator} 
                description='All active and completed campaigns'
                customClass = 'bg-[#18B8A8] text-white' />

            <CampaignStats 
                label='Active Campaigns' 
                total={activeCampaigns.length} 
                icon={FaRegPlayCircle} 
                description='All active campaigns'
                customClass = 'bg-white ' />
                        
            <CampaignStats 
                label='Completed Campaigns' 
                total={completedCampaigns.length}
                icon={IoIosCheckmarkCircle} 
                description='All completed campaigns'
                customClass = 'bg-white' />                           
        </div>
        <ContributionChart contributionData={contributions} pieData={frequencyArray}/>
    </div>
  )
}

export default Dashboard