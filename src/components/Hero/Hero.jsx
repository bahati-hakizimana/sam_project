import React from "react";

const Hero = () => {
  return (
    <div className=" dark:text-white duration-300 clip-right-diagonal bg-[url('assets/website/Runway.png')] bg-cover ">
      <div className="container min-h-[620px] flex mt-10 sm:mt-0">
        <div className="flex items-center justify-center">

          {/* Text section */}
          <div className="space-y-5 order-2 sm:order-1 xl:pr-40 flex flex-col items-center justify-center ">
            <h1
              data-aos="fade-up"
              className="text-4xl sm:text-5xl font-semibold"
              style={{ lineHeight: 1.2 }}
            >
              Unlocking{" "}
              <span className=" text-white">Your Offices potential with Office Hub Insight</span>
            </h1>
            <p className=" text-xl capitalize text-white" data-aos="fade-up" data-aos-delay="300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, sunt. Obcaecati quod architecto quas corporis accusamus rerum, 
            aperiam dolore dolorem optio voluptas quae libero quam eveniet vero non, cumque harum!
            </p>
            <button
              data-aos="fade-up"
              data-aos-delay="500"
              data-aos-offset="0"
              className="primary-btn"
              
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
