import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import Logo from "../../assets/website/minadeflogo.jpg";
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
    title: "+250 788 230 313",
    icon: <MdAddIcCall />
  },
  {
    title: "info@minadef.rw",
    icon: <MdMarkEmailRead />
  },

];

const Footer = () => {
  return (
    <div className=" bg-green-800 text-white">
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
                MOD
              </span>
            </a>
            <p className="text-sm mt-2">
              The mission of the Ministry of Defence
              is the conduct of defence in terms of protecting
              Rwanda’s interests, territorial integrity, vital
              resources, her people and shared values under the
              ambit of the Constitution and International Law
            </p>
            <br />
            {/* Social Handle */}



          </div>
          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10 ">
            <div className="">
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
