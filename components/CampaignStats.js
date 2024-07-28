
const CampaignStats = ({label, total , icon: Icon, description,customClass}) => {
  return (
    <div className={`flex shadow-sm	items-start p-2 rounded-md ${customClass}`}>
      <div className='w-[30px] h-[30px]'>
        <Icon className='w-full mt-1' />
      </div>
      <div className='ml-4'>
        <p className="font-bold">{label}</p>
        <p className='text-2xl'>{total}</p>
        <p className="opacity-70 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default CampaignStats;