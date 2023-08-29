import React from "react";

const Terms = () => {
  return (
    <>
      <div className="p-4 flex flex-col">
        <div className="py-4">
          <div className="text-3xl text-gray-100 font-medium leading-tight pb-8">
            Project Description
          </div>
          <div className="text-gray-500">
            <p className="mb-3 text-gray-200 dark:text-gray-400 first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-100 first-letter:mr-3 first-letter:float-left">
              This platform is aimed at offering a user-friendly and safe
              messaging system specially tailored for individuals with
              disabilities in different support services, facilitating smooth
              communication, fostering independence, and improving ease of use,
              while giving utmost importance to privacy and data protection.
            </p>
          </div>
        </div>
        <div className="py-4">
          <div className="text-3xl text-gray-100 font-medium leading-tight pb-8">
            Project Manual
          </div>
          <div className="text-gray-500">
            <p className="mb-3 text-gray-200 dark:text-gray-200 first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-gray-200 dark:first-letter:text-gray-100 first-letter:mr-3 first-letter:float-left">
              Our undertaking involves creating a web messaging application
              carefully customized to fulfill the requirements of individuals
              with disabilities. Our goal is to guarantee a genuinely inclusive
              platform that promotes smooth communication. The application will
              follow strict accessibility guidelines, catering to different
              disabilities through user-friendly interface design, flexible
              color schemes, and adjustable fonts. By combining advanced
              technology with compassionate design, our undertaking aims to
              enable individuals with disabilities to effortlessly participate
              in online conversations, bridging the accessibility gap and
              improving their digital communication experience.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Terms;
