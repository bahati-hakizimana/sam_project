import React, { useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import { MdDashboard, MdOutlineNotificationsActive } from 'react-icons/md';
import { GiParkBench } from 'react-icons/gi';
import { TbReportAnalytics } from 'react-icons/tb';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { GrSchedules } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import Logo from '../../assets/website/LOGO.svg'; 

function Sidebar() {
  const [activeLink, setActiveLink] = useState(null);
  const [isSaveySchedureOpen, setIsSaveySchedureOpen] = useState(false);

  const handleLinkClick = (index) => {
    setActiveLink(index);
  };

  const toggleSaveySchedureDropdown = () => {
    setIsSaveySchedureOpen(!isSaveySchedureOpen);
  };

  const Sidebar_Links = [
    { id: 1, name: 'Dashboard', path: '/admin', icon: <MdDashboard /> },
    {
      id: 2,
      name: 'SaveySchedure',
      path: '#',
      icon: <GrSchedules />,
      children: [
        { id: 21, name: 'Surveys', path: '/admin/saveyschedure' },
        { id: 22, name: 'Questions', path: '/admin/saveyschedure/questions' },
        { id: 23, name: 'Answers', path: '/admin/saveyschedure/answers' },
        { id: 24, name: 'Choices', path: '/admin/saveyschedure/choices' },
      ],
    },
    { id: 3, name: 'Users', path: '/admin/users', icon: <FaUsers /> },
    { id: 4, name: 'Notifications', path: '/admin/notifications', icon: <MdOutlineNotificationsActive /> },
    { id: 5, name: 'Feedback', path: 'feedbacks', icon: <GiParkBench /> },
    // { id: 6, name: 'Report', path: '/admin/report', icon: <TbReportAnalytics /> },
  ];

  return (
    <div className='w-16 md:w-56 fixed left-0 top-0 z-10 border-r h-screen pt-8 px-4 bg-blue-950 shadow-md'>
      <div className='mb-8 flex justify-center md:block bg-white'>
        <img src={Logo} alt='Logo' className='w-10 md:w-20' />
      </div>
      <ul className='mt-6 space-y-6'>
        {Sidebar_Links.map((link, index) => (
          <li key={link.id} className='relative'>
            <div
              className={`font-medium rounded-md py-2 px-5 hover:bg-blue-500 hover:text-white ${activeLink === index ? 'bg-blue-500 text-white' : ''}`}
              onClick={() => {
                handleLinkClick(index);
                if (link.id === 2) {
                  toggleSaveySchedureDropdown();
                }
              }}
            >
              <div className='flex items-center justify-between'>
                <Link to={link.path || '#'} className='flex items-center justify-center md:justify-start md:space-x-5'>
                  <span className='text-white'>{link.icon}</span>
                  <span className='text-sm text-white md:flex hidden'>{link.name}</span>
                </Link>
                {link.children && (
                  <span className='md:flex hidden' onClick={toggleSaveySchedureDropdown}>
                    {isSaveySchedureOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}
                  </span>
                )}
              </div>
            </div>
            {link.children && isSaveySchedureOpen && (
              <ul className='ml-8 space-y-3 mt-2'>
                {link.children.map((child) => (
                  <li key={child.id} className='font-medium rounded-md py-2 px-5 hover:bg-blue-500 hover:text-white'>
                    <Link to={child.path} className='flex items-center space-x-5'>
                      <span className='text-white'>{child.icon}</span>
                      <span className='text-sm text-white'>{child.name}</span>
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