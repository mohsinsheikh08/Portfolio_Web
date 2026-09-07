import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faFacebook,
  faInstagram,
  faLinkedin,
  type IconDefinition,
} from "@fortawesome/free-brands-svg-icons";
import { MoveUpRight } from "lucide-react";
import MyPic from "../assets/MyPic1.png";
import { Link } from "react-router-dom";
interface Links {
  icon: IconDefinition;
  name: string;
  link: string;
}
const Footer = () => {
  const link: Links[] = [
    {
      icon: faGithub,
      name: "Github",
      link: "https://github.com/mohsinsheikh08",
    },
    {
      icon: faLinkedin,
      name: "Linkedin",
      link: "https://www.linkedin.com/in/mohsinsheikh08",
    },
    {
      icon: faFacebook,
      name: "Facebook",
      link: "https://www.facebook.com/profile.php?id=100021919634547",
    },
    {
      icon: faInstagram,
      name: "Instagram",
      link: "https://www.instagram.com/mohsin_shahid_sheikh/",
    },
  ];
  return (
    <div className="flex flex-col gap-10 justify-center bg-gradient-to-t from-[#e3e3e3] to-[white] mt-10 h-100 w-full flex flex-col justify-between'">
      <div className="w-full h-[50%]  flex flex-col items-center justify-center pt-8">
        <div className="bg-white flex justify-between items-center mb-5 transition-all duration-300 cursor-pointer  hover:scale-105 px-2 shadow-[0px_2px_10px_2px_rgba(0,0,0,0.1)] font-[600] gap-2 py-[4px] rounded-full">
          <span className="w-3 h-3 bg-[#6e06f2] rounded-full mb-[1px]"> </span>{" "}
          <p className="text-[11px]  text-[#4e525a]">
            Available for Internships & Freelance Projects
          </p>
        </div>
        <h1 className="uppercase text-2xl font-[600] md:text-4xl lg:text-5xl sm:text-3xl  mb-5">
          Have a project in mind?
        </h1>
        <p className="text-[#4F5863] text-xs sm:text-sm md:text-md lg:text-lg text-center">
          Together, we can create something clear and impactful. Let's
          collaborate to bring ideas to life.
        </p>
       <Link to='/about'> <div className="  h-full flex items-center justify-center my-5  ">
          <button className=" px-4 shadow-[0px_2px_10px_2px_rgba(0,0,0,0.2)]  flex justify-between  text-md items-center py-[7px] rounded-full transition-all duration-300 cursor-pointer  hover:scale-110  font-[550] bg-black text-white hover:bg-[#333333]">
            Let's Talk <MoveUpRight size={23} />
          </button>
        </div></Link>
      </div>
      <div className=" flex justify-center mt-5  gap-2 min-[550px]:gap-5 items-center   px-20 flex-wrap">
        <div className="border-2 cursor-pointer hidden md:flex rounded-full flex flex-wrap border-black/50 w-40 pl-1 pr-3 items-center justify-between py-1 font-[550]  shadow-[0px_2px_10px_2px_rgba(0,0,0,0.1)]  hover:border-transparent bg-black text-white transition-all duration-300 mb-8 ease-in-out">
          <img
            className="w-6 object-contain rounded-full pb-1"
            src={MyPic}
            alt=""
          />
          <p>Mohsin Sheikh</p>
        </div>

       {link.map((link, index) => {
        return  <div key={index}>
             <a target="_blank" href={link.link} className="h-10">
          <button className="border-2 cursor-pointer  rounded-full border-black/50 min-[550px]:w-35 w-10  py-1 font-[550]  shadow-[0px_2px_10px_2px_rgba(0,0,0,0.1)]  hover:border-transparent hover:bg-[#6e06f2] hover:text-white transition-all duration-300 mb-8 min-[510px]:flex justify-center items-center gap-2 ease-in-out">
            <FontAwesomeIcon icon={link.icon} />
            <span className="hidden min-[550px]:block">{link.name}</span>
          </button>
        </a>
        </div>
       })}
      </div>
      <div className="flex justify-center">
        <p className="transition-all duration-300 ease-in-out cursor-pointer hover:text-[#6e06f2]">
          © 2026 Mohsin Sheikh. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
