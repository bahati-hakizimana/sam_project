import React, { useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Logo from '../../assets/website/officehub.jpeg';
import { MdOutlineNotificationsActive } from "react-icons/md";
import { GiParkBench } from "react-icons/gi";
import { TbReportAnalytics } from "react-icons/tb";
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';

function Sidebar() {
  const [activeLink, setActiveLink] = useState(null);
  const [isUsersOpen, setIsUsersOpen] = useState(false);

  const handleLinkClick = (index) => {
    setActiveLink(index);
  };

  const toggleUsersDropdown = () => {
    setIsUsersOpen(!isUsersOpen);
  };

  const Sidebar_Links = [
    { id: 1, name: 'Dashboard', path: '/admin', icon: <MdDashboard /> },
    {
      id: 2,
      name: 'Users',
      path: '/admin/users',
      icon: <FaUsers />,
      children: [
        { id: 21, name: 'Employees', path: '/admin/users/employees', icon: <FaUsers /> },
        { id: 22, name: 'Tenants', path: '/admin/users/tenants', icon: <FaUsers /> },
        { id: 23, name: 'Inactive Users', path: '/admin/users/inactive', icon: <FaUsers /> },
        { id: 24, name: 'Add User', path: '/admin/users/add', icon: <FaUsers /> },
      ]
    },
    { id: 3, name: 'Notifications', path: '/admin/notifications', icon: <MdOutlineNotificationsActive /> },
    { id: 4, name: 'Benchmarks', path: '/admin/benchmarks', icon: <GiParkBench /> },
    { id: 5, name: 'Report', path: '/admin/report', icon: <TbReportAnalytics /> },
  ];

  return (
    <div className='w-16 md:w-56 fixed left-0 top-0 z-10 border-r h-screen pt-8 px-4 bg-white shadow-md'>
      <div className='mb-8 flex justify-center md:block'>
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
                  <span className=' text-indigo-500'>{link.icon}</span>
                  <span className='text-sm text-gray-500 md:flex hidden'>{link.name}</span>
                </Link>
                {link.children && (
                  <span className='md:flex hidden' onClick={toggleUsersDropdown}>
                    {isUsersOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}
                  </span>
                )}
              </div>
            </div>
            {link.children && isUsersOpen && (
              <ul className='ml-8 space-y-3 mt-2'>
                {link.children.map((child, childIndex) => (
                  <li key={childIndex} className='font-medium rounded-md py-2 px-5 hover:bg-blue-500 hover:text-white'>
                    <Link to={child.path} className='flex items-center space-x-5'>
                      <span className=' text-indigo-500'>{child.icon}</span>
                      <span className='text-sm text-gray-500'>{child.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
