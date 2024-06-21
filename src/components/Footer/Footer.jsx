import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import Logo from "../../assets/website/Officehub.jpeg";
import { MdAddIcCall } from "react-icons/md";
import { MdMarkEmailRead } from "react-icons/md";

const FooterLinks = [
  {
    title: "About",
    link: "/#about",
  },
  {
    title: "Cotact",
    link: "/#contacts",
  },

  
];
const HelpLinks = [
  {
    title: "+2507899999999",
    icon: <MdAddIcCall />
  },
  {
    title: "info@officehub.com",
    icon: <MdMarkEmailRead />
  },
 
];

const Footer = () => {
  return (
    <div className="bg-dark text-white">
      <section className="container py-10">
        <div className=" grid md:grid-cols-3 py-5">
          {/* company Details */}
          <div className=" py-8 px-4 ">
            {/* <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3">
            
            </h1> */}
            <a
            href="#"
          >
            <img src={Logo} alt="" className=" w-20" />
            <span className="text-2xl sm:text-3xl font-semibold">
            Office Hub
            </span>
          </a>
            <p className="text-sm mt-2">
           Lorem ipsum dolor sit amet consectetur adipisicing elit. 
           Architecto obcaecati rerum pariatur omnis tempore necessitatibus
            deserunt odio magni, quam quisquam,
            dolorem culpa, molestiae ipsum nihil 
            quasi. Dolores, ea eligendi! Veritatis!
            </p>
            <br />
            {/* Social Handle */}

           
            
          </div>
          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10 ">
            <div className="">
              <div className="py-8 px-4 ">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                  Company
                </h1>
                <ul className={`flex flex-col gap-3`}>
                  {FooterLinks.map((link) => (
                    <li
                      key={link.title}
                      className="cursor-pointer hover:translate-x-1 duration-300 hover:!text-primary space-x-1 text-gray-400 "
                    >
                      <span>{link.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="">
              <div className="py-8 px-4 ">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                  Contacts
                </h1>
                <ul className="flex flex-col gap-3">
                  {HelpLinks.map((link, index) => (
                    <li
                      key={index}
                      className=" flex gap-2 cursor-pointer hover:translate-x-1 duration-300 hover:!text-primary space-x-1 text-white"
                    >
                      <span>{link.icon}</span>
                      <span>{link.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* <div className="">
              <div className="py-8 px-4 ">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                  Resources
                </h1>
                <ul className="flex flex-col gap-3">
                  {ResourcesLinks.map((link) => (
                    <li
                      key={link.title}
                      className="cursor-pointer hover:translate-x-1 duration-300 hover:!text-primary space-x-1 text-gray-400 "
                    >
                      <span>{link.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div> */}
          </div>
        </div>
        <div className="flex items-center justify-center">
            <div className="flex items-center gap-4 mt-6">
              <a href="#">
                <FaInstagram className="text-2xl hover:text-primary duration-300" />
              </a>
              <a href="#">
                <FaFacebook className="text-2xl hover:text-primary duration-300" />
              </a>
              <a href="#">
                <FaLinkedin className="text-2xl hover:text-primary duration-300" />
              </a>
            </div>
            </div>
      </section>
    </div>
  );
};

export default Footer;
