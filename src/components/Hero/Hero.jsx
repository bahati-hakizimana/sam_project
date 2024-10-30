import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className=" dark:text-white duration-300 clip-right-diagonal bg-[url('assets/website/minadefhero.jpg')] bg-cover ">
      <div className="container min-h-[620px] flex mt-10 sm:mt-0">
        <div className="flex items-center justify-center">

          {/* Text section */}
          <div className="space-y-5 order-2 sm:order-1 xl:pr-40 flex flex-col items-center justify-center ">
            <h1
              data-aos="fade-up"
              className="text-4xl sm:text-5xl font-semibold"
              style={{ lineHeight: 1.2 }}
            >
              RDF{" "}
              <span className=" text-white">Umutekano wabanyarwanda niyontego</span>
            </h1>
            <p className=" text-xl capitalize text-white" data-aos="fade-up" data-aos-delay="300">
           Ndumunyarwand ntewe ishema nokuba umunyarwanda
            </p>
            <Link to="/login">
            <button
              data-aos="fade-up"
              data-aos-delay="500"
              data-aos-offset="0"
              className=" bg-green-700 text-white text-xl rounded-lg px-4 py-1"
              
            >
              Join Now
            </button>
            </Link>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
