import Link from 'next/link';
import Image from 'next/image';
import logo from '../public/logo.png';
import Man from '../public/man.png';
import { HiSearch, HiBell, HiChat } from 'react-icons/hi';

export default function Header() {
  return (
    // <header>
    //   <div className="container">
    //     <h1>My Blog App</h1>
    //     <nav>
    //       <Link href="/">Home</Link>
    //       <Link href="/blogs">All Blogs</Link>
    //       <Link href="/blogs/create">Create Blog</Link>
    //     </nav>
    //   </div>
    // </header>
    <div
      className="flex justify-between 
    gap-3 md:gap-2 items-center p-6 "
    >
      <Image
        src={logo}
        width={50}
        height={50}
        alt="logo"
        className="hover:bg-gray-300 rounded-full p-2 cursor-pointer"
      />
      <button className="font-semibold p-2 rounded-full px-2">Home</button>
      <button className="font-semibold p-2 rounded-full px-2">Create</button>
      <div
        className="bg-[#e9e9e9] p-2 px-6
         gap-3 items-center rounded-full w-full hidden md:flex"
      >
        <HiSearch className="text-[25px] text-gray-500 md:hidden" />
        <input
          type="search"
          placeholder="Search"
          className="bg-transparent outline-none w-full text-[25px]"
        />
      </div>
      <HiBell className="text-[25px] md:text-[60px] text-gray-500 cursor-pointer" />
      <HiChat className="text-[25px] md:text-[60px] text-gray-500 cursor-pointer" />
    </div>
  );
}
