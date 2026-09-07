import MyImg from "../../assets/MyPic1.png";
import MyName from "../../assets/MyName.png";
import { MoveUpRight } from "lucide-react";
import MY_CV from "../../assets/Mohsin-CV.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faFacebook, faInstagram, faLinkedin, type IconDefinition } from "@fortawesome/free-brands-svg-icons";

interface Links {
  link : string,
  name: string,
  icon: IconDefinition
}
const Hero = () => {
  const links: Links[] = [
    {
      link: "https://github.com/mohsinsheikh08",
      name: "Github",
      icon : faGithub
    },{
      link: "https://www.linkedin.com/in/mohsinsheikh08/",
      name: "Linkedin",
      icon: faLinkedin
    },{
      link: "https://www.instagram.com/mohsin_shahid_sheikh/",
      name: "Instagram",
      icon: faInstagram
    },
    {
      link: "https://www.facebook.com/profile.php?id=100021919634547",
      name: "Facebook",
      icon: faFacebook
    }
  ]
  return (
    <div className=" w-full flex flex-col lg:flex-row px-5  lg:justify-between items-center justify-center lg:items-end">
      <div className=" lg:flex hidden gap-3 flex-col pl-5 pb-5">
        <p className="text-2xl sm:text-3xl text-[#3F0091] md:w-45 font-extrabold">
          MERN <span className="text-black">Stack Developer</span>
        </p>
        <p className="pt-2 text-sm w-70 font-bold text-[#4e525a]">
          I'm Mohsin Sheikh — MERN Stack Developer. I turn ideas into scalable,
          full-stack web applications that solve real problems and drive
          business growth.
        </p>
        <a className="w-33 " href={MY_CV} target="_blank">
          <button  className="text-sm shadow-lg w-full flex mt-2 bg-black text-white font-bold justify-center items-center gap-2 hover:scale-110 transition-all duration-300 ease-in-out px-3 py-1 rounded-full">
            My Resume <MoveUpRight size={20} />
          </button>
        </a>
      </div>
      <div className="relative w-90 sm:w-140 lg:w-500 lg:pr-15 md:w-180 flex justify-center">
        <img className="absolute md:-left-10 top-5 w-400 left-0 animate" src={MyName} alt="" />
        <img
          className="w-50 sm:w-70 md:w-100 lg:w-128  relative  z-1 object-contain"
          src={MyImg}
          alt=""
        />
      </div>
      <div className=" hidden flex-col gap-9 lg:flex  md:pr-5 md:pb-5">
       {links.map((link, index) => {
        return <a key={index}  href={link.link}>
          <button className=" cursor-pointer hover:bg-[#3F0091] font-bold hover:text-white transition-all duration-300 ease-in-out hover:border-transparent border-2 flex justify-center items-center w-full px-7 shadow-lg py-1 rounded-full " key={index}>
          <FontAwesomeIcon icon={link.icon} />
          <p>{link.name}</p>
        </button>
        </a>
       })}
      </div>
      <div className="w-full md:px-3 pt-5 lg:hidden">
        <p className="text-2xl sm:text-3xl text-[#3F0091] font-extrabold">
          MERN <span className="text-black">Stack Developer</span>
        </p>
        <p className="pt-2 text-sm leading-7 tracking-wide sm:text-md font-semibold text-[#4e525a]">
          I'm Mohsin Sheikh — MERN Stack Developer. I turn ideas into scalable,
          full-stack web applications that solve real problems and drive
          business growth.
        </p>
        <a href={MY_CV} target="_blank">
          {" "}
          <button className="text-sm flex mt-2 bg-black text-white font-bold justify-center items-center gap-2 hover:scale-110 transition-all duration-300 ease-in-out px-3 py-1 rounded-full">
            My Resume <MoveUpRight size={20} />
          </button>
        </a>
      </div>
    </div>
  );
};

export default Hero;
