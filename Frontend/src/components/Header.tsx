import axios from "axios";
import { Menu, X, MoveUpRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

interface Links {
  name: string;
  link: string;
  color: string;
  text: string;
  icon?: React.ReactNode;
  border?: string;
  onClick?: () => void;
}

const Header = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<string>("User");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/get-user`,
          { withCredentials: true },
        );
        setRole(response?.data?.user?.role || "User");
      } catch (error) {
        if (axios.isAxiosError(error)) {
                 console.log("Error status:", error.response?.status);
                 console.log("Error data:", error.response?.data);
                 console.log("Error message:", error.response?.data?.message);

        }
        setRole("User");
      }
    };
    getData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
        withCredentials: true,
      });
      setRole("User");
      navigate("/login");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data?.message || "Logout failed");
      }
    }
  };

  const linksMobile: Links[] = [
    {
      name: "Home",
      link: "/portfolio",
      color: "bg-white",
      text: "text-[#4e525a]",
    },
    {
      name: "Project",
      link: "/projects",
      color: "bg-white",
      text: "text-[#4e525a]",
    },
    {
      name: "About",
      link: "/about",
      color: "bg-white",
      text: "text-[#4e525a]",
    },
    ...(role === "User" ?
       [
        {
      name: "Login",
      link: "/login",
      color: "bg-white",
      text: "text-[#4e525a]",
    }]: []),
    {
      name: "Logout",
      link: "/login",
      color: "bg-white",
      text: "text-[#4e525a]",
      onClick: handleLogout,
    },
    ...(role === "User"
      ? [
          {
            name: "Let's Talk",
            link: "/about",
            color: "bg-black",
            icon: <MoveUpRight size={24} />,
            text: "text-white",
            border: "border-none",
          },
        ]
      : [
          {
            name: "Create Project",
            link: "/create-project",
            color: "bg-black",
            icon: <MoveUpRight size={24} />,
            text: "text-white",
            border: "border-none",
          },
        ]),
  ];

  return (
    <div>
      <div className="h-12  relative w-full flex items-center justify-between px-5 min-[800px]:px-10">
        <div className="bg-white flex hover:scale-110 transition-all duration-300 ease-in-out justify-between items-center px-3 shadow-[0px_5px_10px_0px_rgba(0,0,0,0.2)] w-67 rounded-full h-[50%]">
          <div className="h-3 w-3 rounded-full bg-[#6E06F2]"></div>
          <p className="text-[10px] font-bold text-[#4e525a]">
            Available for Internships & Freelance Projects
          </p>
        </div>

        <div className="h-10 hidden md:flex justify-between items-center px-2 w-60 lg:w-100">
          <NavLink
            className={({ isActive }) => {
              return isActive ? "text-[#6e06f2]" : "text-[#4e525a]";
            }}
            to="/portfolio"
          >
            <p className="text-sm font-semibold">Home</p>
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) => {
              return isActive ? "text-[#6e06f2]" : "text-[#4e525a]";
            }}
          >
            <p className="text-sm font-semibold">Projects</p>
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => {
              return isActive ? "text-[#6e06f2]" : "text-[#4e525a]";
            }}
          >
            <p className="text-sm font-semibold">About</p>
          </NavLink>
        </div>

        {role === "User" ? (
          <div className="flex">
            <Link to="/about">
              <div className="h-8 hidden md:flex w-30">
                <button className="text-sm flex bg-black text-white font-bold justify-center items-center gap-2 hover:scale-110 transition-all duration-300 ease-in-out px-3 py-1 rounded-full">
                  Let's Talk <MoveUpRight size={20} />
                </button>
              </div>
            </Link>
            <Link to="/login">
              <button className="hidden md:flex text-sm font-bold px-3 py-1 rounded-full cursor-pointer transition-all duration-300">
                Login
              </button>
            </Link>
            <button
              onClick={handleLogout}
              className="hidden md:flex text-sm font-bold px-3 py-1 rounded-full cursor-pointer transition-all duration-300"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="hidden md:flex items-center  gap-2">
            {role === "User" ? (
              <Link to="/about">
                <button className="text-sm flex bg-black text-white font-bold justify-center items-center gap-2 hover:scale-110 transition-all duration-300 ease-in-out px-3 py-1 rounded-full">
                  Let's Talk <MoveUpRight size={20} />
                </button>
              </Link>
            ) : (
              <Link to="/create-project">
                <button className="text-sm flex bg-black text-white truncate font-bold justify-center items-center gap-2 hover:scale-110 transition-all duration-300 ease-in-out px-3 py-1 rounded-full">
                  Create Project <MoveUpRight size={20} />
                </button>
              </Link>
            )}
            {role === "User" && (
              <Link to="/login">
                <button className="text-sm font-bold px-3 py-1 rounded-full cursor-pointer transition-all duration-300 hover:bg-gray-100">
                  Login
                </button>
              </Link>
            )}
            {role !== "User" && (
              <button
                onClick={handleLogout}
                className="text-sm font-bold px-3 py-1 rounded-full cursor-pointer transition-all duration-300 hover:bg-gray-100  "
              >
                Logout
              </button>
            )}
          </div>
        )}
        <div
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="flex md:hidden rounded-full bg-gray-200 justify-center items-center w-9 h-9 cursor-pointer"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
      </div>
      <div
        className={`absolute md:hidden h-38 w-full transition-all z-2 duration-500 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        {linksMobile.map((link: Links, index: number) => {
          return (
            <div
              key={index}
              onClick={() => {
                setIsOpen(false);
                if (link.onClick) link.onClick();
              }}
              className={`h-1/3 ${link.color} flex items-center ${link.border} ${link.text} active:bg-[#6E06F2] active:text-white transition-all duration-200 ease-in-out px-3 border-b-2 border-gray-200 cursor-pointer`}
            >
              <Link to={link.link} className="w-full h-full flex items-center">
                <p className="font-bold flex gap-2">
                  {link.name} {link.icon}
                </p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Header;
