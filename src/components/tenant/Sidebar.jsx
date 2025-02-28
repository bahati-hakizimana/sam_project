import React, { useState } from 'react';
import { MdDashboard } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Logo from '../../assets/website/minadeflogo.jpg';
import { MdDynamicFeed } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import { MdForum } from "react-icons/md";
import { FaQuestionCircle } from "react-icons/fa";
import { TfiSupport } from "react-icons/tfi";


function Sidebar() {
  const [activeLink, setActiveLink] = useState(null);

  const handleLinkClick = (index) => {
    setActiveLink(index);
    
  };

  const Sidebar_Links = [
    { id: 2, name: 'Home', path: '/tenant', icon: <MdDashboard /> },
    { id: 2, name: 'Feedback', path: '/tenant/feedback', icon: <MdDynamicFeed /> },
    { id: 3, name: 'Exams', path: 'tenant/survey/:surveyId', icon: <FaRegSave /> },
    { id: 3, name: 'Apply', path: '/tenant/applynow', icon: <FaRegSave /> },
    { id: 4, name: 'ViewApplication', path: '/tenant/viewapplications/status', icon: <FaRegSave /> },
    // { id: 4, name: 'Notifications', path: '/tenant/notifications', icon: <MdForum /> },
    // { id: 4, name: 'FAQs', path: '/tenant/faqs', icon: <FaQuestionCircle /> },
    // { id: 4, name: 'SupportResourse', path: '/tenant/resourse', icon: <TfiSupport/> },
  
  ];

  return (

    <div className='w-16 md:w-56 fixed left-0 top-0 z-10 border-r h-screen pt-8 px-4 bg-green-800 shadow-md'>
    <div className='mb-8 flex justify-center md:block bg-white'>
        <img src={Logo} alt='Logo' className='w-10 md:w-20' />
      </div>
    <ul className='mt-6 space-y-6'>
      {Sidebar_Links.map((link, index) => (
        <li key={index} className='relative'>
          <div
           className={`font-medium rounded-md py-2 px-5 hover:bg-blue-500 hover:text-white ${activeLink === index ? 'bg-blue-500 text-white' : ''}`}
           onClick={() => handleLinkClick(index)}
          >
            <div className='flex items-center justify-between'>
              <Link to={link.path || '#'} className='flex items-center justify-center md:justify-start md:space-x-5'>
                <span className=' text-white'>{link.icon}</span>
                <span className='text-sm text-white md:flex hidden'>{link.name}</span>
              </Link>
              {/* {link.children && (
                <span className='md:flex hidden'>
                  {isInstitutionOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}
                </span>
              )} */}
            </div>
          </div>
          {/* {link.children && isInstitutionOpen && (
            <ul className='ml-8 space-y-3 mt-2'>
              {link.children.map((child, childIndex) => (
                <li key={childIndex} className='font-medium rounded-md py-2 px-5 hover:bg-gray-100 hover:text-indigo-500'>
                  <Link to={child.path} className='flex items-center space-x-5'>
                    <span className=' text-indigo-500'>{child.icon}</span>
                    <span className='text-sm text-gray-500'>{child.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )} */}
        </li>
      ))}
    </ul>
    {/* <div className='w-full absolute bottom-5 left-0 px-4 py-4 text-center cursor-pointer'>
      <p className='flex space-x-2 text-xs text-white py-2 px-5 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full'>
        <span>?</span><span>Need help</span>
      </p>
    </div> */}
  </div>
  );
}

export default Sidebar;