import Link from "next/link";
import { usePathname } from 'next/navigation'

function LinkButton({ link, icon: Icon, label }) {
  const pathname = usePathname();

  // Determine if the link is active based on the current pathname
  let isActive = false;
  
  // Exact match case
  if (pathname === link) {
    isActive = true;
  }
  // Subroute case
  else if (pathname.startsWith(`${link}/`)) {
    isActive = true;
  }

  // Define the className based on isActive
  const buttonClassName = `rounded-md flex gap-3 items-center px-6 py-3 text-sm hover:bg-gray-100 ${isActive ? 'bg-[#18B8A8] text-white shadow-sm' : ''}`;

  return (
    <Link href={link}>
      <div className={buttonClassName}>
        <Icon className='min-w-[20px] min-h-[20px]'/> {/* Render the icon */}
        <p>{label}</p> {/* Render the name */}
      </div>
    </Link>
  );
}

export default LinkButton;
