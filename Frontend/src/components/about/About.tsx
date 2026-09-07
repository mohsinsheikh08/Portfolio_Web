import { Mail, Phone } from "lucide-react";
import axios from "axios";
import React, { useState } from "react";
const About = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");
   const [loading, setLoading] = useState<boolean>(false);
  const emailSender = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try{
      setLoading(true)
     await  axios.post(`${import.meta.env.VITE_API_URL}/api/message/send-message`,{
      name,
      email,
      subject,
      message
     }, {
      withCredentials : true
     })

     setEmail("")
     setMessage("")
     setName("")
     setSubject("")
    }catch(error){
      if(axios.isAxiosError(error)){
         console.log("Error status:", error.response?.status);
                console.log("Error data:", error.response?.data);
                console.log("Error message:", error.response?.data?.message);
                alert(error.response?.data?.message || "Failed to sending email");
      }
    }finally{
      setLoading(false)
    }
  }
  return (
    <div>
      <div className="flex px-10 flex-col justify-between  pt-10  justify-center w-full">
        <p className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl min-w-100 font-[800]">
          About <span className="text-[#6e06f2]">Me</span>
        </p>
        <div className="w-30 md:min-w-30 pt-4 xl:w-20 responsive4 h-full flex  justify-end items-start"></div>
      </div>
      <div className="border-l-3 text-xs md:text-sm mx-10 min-[400px]:text-md text-sm text-[#24282e] rounded-r-3xl border-[#6e06f2] pl-5 mt-10 tracking-wide leading-10 font-[400]">
        <p>
          I'm <span className="text-[#6e06f2]">Mohsin Sheikh</span> — an
          18-year-old
          <span className="text-[#6e06f2]"> MERN Stack Developer</span> from
          <span className="text-[#6e06f2]"> Karachi, Pakistan</span>. I've been
          coding for <span className="text-[#6e06f2]">1.5 years</span>. What
          started as curiosity became a passion. I specialize in
          <span className="text-[#6e06f2]">
            {" "}
            React, Node.js, Express, and MongoDB
          </span>
          , and I'm currently exploring
          <span className="text-[#6e06f2]"> TypeScript and Next.js</span>.
          Before coding, I spent{" "}
          <span className="text-[#6e06f2]">1 year as a graphic designer</span> —
          using
          <span className="text-[#6e06f2]"> Illustrator and Photoshop</span> to
          create logos, posters, and brand identities. That experience taught me
          how
          <span className="text-[#6e06f2]"> design and development</span> work
          together to create user-friendly experiences. I've built{" "}
          <span className="text-[#6e06f2]">5+ projects</span>, including a
          <span className="text-[#6e06f2]">
            {" "}
            full-stack e-commerce platform
          </span>
          , a portfolio website, a weather app, and a task manager — with
          <span className="text-[#6e06f2]"> 3 live and deployed</span>. Each
          project taught me something new, from
          <span className="text-[#6e06f2]">
            {" "}
            authentication to API integration and database management
          </span>
          . I'm looking for an{" "}
          <span className="text-[#6e06f2]">
            internship or junior developer role
          </span>{" "}
          where I can contribute, learn, and grow. I'm eager to solve
          <span className="text-[#6e06f2]"> real-world problems</span> and build
          things that make a difference.
        </p>
      </div>

      <div className="flex px-10 flex-col justify-between  pt-10  justify-center w-full">
        <p className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl min-w-100 font-[800]">
          Contact <span className="text-[#6e06f2]">Me</span>
        </p>
        <div className="w-30 md:min-w-30 pt-4 xl:w-20 responsive4 h-full flex  justify-end items-start"></div>
        <div>
          <p className="text-xs sm:text-md md:text-lg lg:text-xl  xl:w-190 text-[#4F5863] ">
            If you have an internship or job opportunity, or want to collaborate
            on a project — feel free to reach out. I'd love to connect!
          </p>
        </div>
      </div>
      <div className="py-5 px-10 ">
        <div className="flex flex-col   lg:flex-row lg:items-center gap-5 pt-5">
          <div className="flex justify-between   items-center w-75  ">
            <div className=" border-[1.5px] w-10 flex justify-center items-center  rounded-full h-10">
              <Mail className="" />
            </div>
            <p className="cursor-pointer text-[#4F5863] ">
              mohsinshahidsheikh@gmail.com
            </p>
          </div>
          <div className="flex justify-between items-center w-45  ">
            <div className=" border-[1.5px] w-10 flex justify-center items-center  rounded-full h-10">
              <Phone className="" />
            </div>
            <p className="cursor-pointer text-[#4F5863] ">+92 311 8974201</p>
          </div>
        </div>
      </div>

      <div className="mx-10   gap-2 flex flex-col rounded-xl  p-2 py-5 max-w-130">
        <h1 className="flex text-xl sm:text-3xl font-bold">
          Send <span className="text-[#6e06f2] pl-1"> Email</span>
        </h1>
        <form onSubmit={(e) => {emailSender(e)}}>
          <div className="flex gap-4 pb-2 w-full">
            <label className="flex flex-col gap-2 flex-1">
              <p className="text-xs  sm:text-sm font-semibold text-[#4e525a]">
                Name <span className="text-[#6E06F2]">*</span>
              </p>
              <input
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setName(e.target.value);
                }}
                className="border-2 py-1 pl-2 text-xs rounded-lg border-gray-600/50 outline-none w-full"
                type="text"
                placeholder="Write your name!"
              />
            </label>
            <label className="flex flex-col gap-2 flex-1">
              <p className="text-xs sm:text-sm font-semibold text-[#4e525a]">
                Email <span className="text-[#6E06F2]">*</span>
              </p>
              <input
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setEmail(e.target.value);
                }}
                className="border-2 py-1 pl-2 text-xs rounded-lg border-gray-600/50 outline-none w-full"
                type="email"
                placeholder="Write your email!"
              />
            </label>
          </div>
          <label className="flex flex-col gap-2">
            <p className="text-xs sm:text-sm font-semibold text-[#4e525a]">
              Subject <span className="text-[#6E06F2]">*</span>
            </p>
            <input
              value={subject}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSubject(e.target.value);
              }}
              className="border-2 py-1 pl-2 text-xs rounded-lg border-gray-600/50 outline-none  w-full"
              type="text"
              placeholder="Write subject!"
            />
          </label>
          <div className="pt-2">
            <label className="flex flex-col gap-2">
              <p className="text-xs sm:text-sm font-semibold text-[#4e525a]">
                Message <span className="text-[#6E06F2]">*</span>
              </p>
              <textarea
                value={message}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setMessage(e.target.value);
                }}
                className="border-2 max-h-40 py-1 rounded-lg border-gray-600/50 outline-none pl-2 w-full"
                placeholder="Write message!"
              />
            </label>
            
          </div>
           <button
                      type="submit"
                      className="text-sm flex bg-black text-white mt-5 font-bold w-full justify-center items-center gap-2  transition-all duration-300 ease-in-out py-3 my-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Sending..." : "Send Email"}
                    </button>
        </form>
      </div>
    </div>
  );
};

export default About;
