import { Link } from "react-router-dom";
import axios from "axios";
import { Link as LinkIcon, MoveUpRight } from "lucide-react"; 
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

interface Project {
  _id: string;
  projectImage: string;
  projectName: string;
  techStack: string[];
  description: string;
  liveLink: string;
  githubLink: string;
  detailDescription: string;
}

const Projects = () => {
  const [data, setData] = useState<Project[]>([]);
  const [role, setRole] = useState<string>("User");

  useEffect(() => {
    const getData = async () => {
      try {
        const userResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/get-user`,
          { withCredentials: true },
        );
        setRole(userResponse.data?.user?.role || "User");
        const projectsResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/project/all-projects`,
        );
        setData(projectsResponse.data.projects);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.log(err.response?.data?.message || "Something went wrong");
        } else {
          console.log("Unknown error:", err);
        }
      }
    };
    getData();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/project/${id}`, {
        withCredentials: true,
      });
      setData(data.filter((project) => project._id !== id));
      alert("Project deleted successfully!");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data?.message || "Delete failed");
        alert(err.response?.data?.message || "Delete failed");
      }
    }
  };

  return (
    <div className="w-full md:px-7">
      <div className="py-3 px-5 md:px-0 flex justify-between items-center">
        <p className="text-3xl md:text-5xl font-extrabold">
          Projects<span className="text-5xl sm:text-7xl text-[#3F0091]">.</span>
        </p>

        <Link to="/projects">
          <div className="h-8 pt-4 flex justify-center items-center w-50">
            <button className="text-sm flex cursor-pointer shadow-2xl bg-black text-white font-bold justify-center items-center gap-2 hover:scale-110 transition-all duration-300 ease-in-out px-3 py-1 rounded-full">
              View My Projects <MoveUpRight size={20} />
            </button>
          </div>
        </Link>
      </div>

      <div className="w-full flex gap-6 overflow-x-scroll scrollbar-none p-4">
        {data.map((project) => (
          <div
            key={project._id}
            className="group rounded-xl relative shadow-[0px_2px_12px_0px_rgba(0,0,0,0.2)] flex-shrink-0 w-75 md:w-85 lg:w-95 pb-5 bg-white"
          >
            
            {role === "Admin" ? (
             <>
             <Link to={`/edit-project/${project._id}`}>
             <button className="bg-white cursor-pointer text-[#4e525a] shadow-lg p-2 m-1 text-sm font-semibold absolute rounded-full">Edit {project.projectName}</button>
             </Link>
              <button
                onClick={() => handleDelete(project._id)}
                className="absolute cursor-pointer transition-all shadow-lg duration-300 ease-in-out text-sm bg-red-500 px-3 py-1 rounded-full right-2 top-2 text-white hover:bg-red-600"
              >
                Delete
              </button>
              
              </>
            ) : (
              ""
            )}

            <img
              src={project.projectImage}
              alt={project.projectName}
              className="rounded-t-xl shadow-md"
            />
            <div className="flex justify-between py-1 items-center px-3">
              <div className="text-sm  py-3 text-[#4e525a] font-bold ">
                {project.projectName}
              </div>
              <div className=" flex gap-3">
                <a target="_blank"  href={project.liveLink}><div className="border-2 transition-all duration-300 ease-in-out hover:border-transparent border-[#4e525a]/80 rounded-full hover:bg-[#3F0091] hover:text-white p-1"><LinkIcon size={22} /></div></a>
                 <a target="_blank"  href={project.githubLink}><div className="border-2 transition-all duration-300 ease-in-out hover:border-transparent border-[#4e525a]/80 rounded-4xl hover:bg-[#3F0091] hover:text-white p-1">< FontAwesomeIcon size='lg' icon={faGithub}  /></div></a>
               
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pb-3 px-2">
              {project.techStack.map((stack, index) => (
                <span
                  key={index}
                  className="text-[8px] lg:text-[11px] border px-3 py-1 rounded-full font-semibold text-[#4e525a] hover:bg-[#3F0091] hover:text-white transition-all duration-200 cursor-pointer"
                >
                  {stack}
                </span>
              ))}
            </div>

            <div className="pl-3 pr-5 text-xs line-clamp-2 lg:text-sm text-[#4e525a]">
              {project.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
