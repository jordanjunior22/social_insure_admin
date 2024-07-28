import Link from 'next/link';

const ActionButton = ({link,icon: Icon, text }) => {
  return (
    <Link href={link}>
      <div className='flex items-center gap-3 bg-blue-500 text-white p-2 rounded-lg hover:bg-white hover:text-[#272727] transition duration-300 hover:shadow-md'>
        <Icon className='w-[20px] h-[20px]' />
        <p>{text}</p>
      </div>
    </Link>
  );
};

export default ActionButton;