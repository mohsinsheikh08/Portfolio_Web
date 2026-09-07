import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import axios from "axios";
import LoadingPage from "../LoadingPage";
interface allProjects {
  _id: string;
  description: string;
  detailDescription: string;
  githubLink: string;
  liveLink: string;
  projectImage: string;
  projectName: string;
  techStack: string[];
}

const Projects = () => {
  const [projects, setProjects] = useState<allProjects[]>([]);
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true)
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/project/all-projects`,
        );
        setProjects(response.data.projects);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("Error status:", error.response?.status);
          console.log("Error data:", error.response?.data);
          console.log("Error message:", error.response?.data?.message);
        }
      }finally{
        setLoading(false)
      }
    };
    getData();
  }, []);

    if (loading) return <LoadingPage />;
  return (
    <div>
      <div className="flex px-10 flex-col justify-between  pt-10  justify-center w-full">
        <p className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl min-w-100 font-[800]">
          My <span className="text-[#6e06f2]">Projects</span>
        </p>
        <div className="w-30 md:min-w-30 pt-4 xl:w-20 responsive4 h-full flex  justify-end items-start"></div>
        <div>
          <p className="text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl xl:w-190 text-[#4F5863] ">
            Designing and developing modern, full-stack web applications with
            React, Node.js, and TypeScript.
          </p>
        </div>
      </div>
      <div>
        {projects.map((element) => {
          return (
            <div className="pt-10 px-10">
              <div className="w-full flex justify-center">
                {" "}
                <img
                  className="md:max-w-150 lg:max-w-200 xl:max-w-220  shadow-[0px_5px_10px_2px_rgba(0,0,0,0.2)] rounded-lg "
                  src={element.projectImage}
                  alt={element.projectName}
                />
              </div>
              <div className="flex flex-col">
                <div className="flex pt-5 pr-5 w-full justify-between items-center">
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold">
                    {element.projectName}
                  </p>
                  <div>
                    <a href={element.liveLink} target="_blank">
                      <div className="ml-2 flex justify-center items-center border-[1.5px] transition-all duration-300 ease-in-out w-[25px] p-1 h-[25px] rounded-full hover:text-white hover:border-transparent hover:bg-[#6e06f2] text-[#6e06f2] border-[#6e06f2]">
                        <ArrowUpRight />
                      </div>
                    </a>
                  </div>
                </div>
                <p className="pt-3 text-sm sm:text-md md:text-lg lg:text-xl xl:text-lg xl:w-160 text-gray-500 dark:text-gray-400">
                  {element.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
