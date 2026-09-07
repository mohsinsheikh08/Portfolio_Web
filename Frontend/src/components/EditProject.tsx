import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import { ArrowBigLeft } from "lucide-react";

interface Project {
  _id: string;
  description: string;
  detailDescription: string;
  githubLink: string;
  liveLink: string;
  projectImage: string;
  projectName: string;
  techStack: string[];
}
const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState<string>("");
  const [projectImage, setProjectImage] = useState<File | null>(null);
  const [projectLink, setProjectLink] = useState<string>("");
  const [githubLink, setGithubLink] = useState<string>("");
  const [languages, setLanguages] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [detailDescription, setDetailDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
   const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [projectData, setProjectData] = useState<Project | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    if(!id){
      return alert('Project not found!')
    }
    e.preventDefault();
      setIsSubmitting(true);

    const formData = new FormData();
    if (projectName.trim() !== "") {
      formData.append("projectName", projectName);
    } else if (projectData) {
      formData.append("projectName", projectData.projectName);
    }

    if (description.trim() !== "") {
      formData.append("description", description);
    } else if (projectData) {
      formData.append("description", projectData.description);
    }

    if (languages.trim() !== "") {
      formData.append("techStack", languages);
    }

    if (projectLink.trim() !== "") {
      formData.append("liveLink", projectLink);
    } else if (projectData) {
      formData.append("liveLink", projectData.liveLink);
    }

    if (githubLink.trim() !== "") {
      formData.append("githubLink", githubLink);
    } else if (projectData) {
      formData.append("githubLink", projectData.githubLink);
    }

    if (detailDescription.trim() !== "") {
      formData.append("detailDescription", detailDescription);
    } else if (projectData) {
      formData.append("detailDescription", projectData.detailDescription);
    }

    if (projectImage) {
      formData.append("projectImage", projectImage);
    }
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/project/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        },
      );
      navigate("/portfolio");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Error status:", error.response?.status);
        console.log("Error data:", error.response?.data);
        console.log("Error message:", error.response?.data?.message);
        alert(error.response?.data?.message || "Failed to update project");
      }
    } finally {
      setIsSubmitting(false); 
    }
  };

  useEffect(() => {
    const getProject = async () => {
      try {
        if(!id){
         setLoading(false)
         alert("Project not found!")
         return
        }
        setLoading(false)
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/project/get-project/${id}`,
          {
            withCredentials: true,
          },
        );
        const project = response?.data?.project;
        setProjectData(project);
        if (project) {
          setProjectName(project.projectName || "");
          setProjectLink(project.liveLink || "");
          setGithubLink(project.githubLink || "");
          setDescription(project.description || "");
          setDetailDescription(project.detailDescription || "");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("Error status:", error.response?.status);
          console.log("Error data:", error.response?.data);
          console.log("Error message:", error.response?.data?.message);
        }
      }finally{
        setLoading(true)
      }
    };
    getProject();
  }, []);

  if (!loading) {
    return <LoadingPage />;
  }
  if (!id) {
    return (
      <div className="text-red-500 w-full min-h-screen text-5xl">
        Project ID not found
      </div>
    );
  }
  return (
    <div className="w-full flex justify-center items-center min-h-screen">
      <Link to="/portfolio">
        {" "}
        <div className="absolute top-2 left-6 md:left-10 md:top-10   text-[#6E06F2] flex gap-2">
          Go to home Page <ArrowBigLeft />{" "}
        </div>
      </Link>
      <div className="border-2 my-10 w-80 rounded-xl">
        <p className="flex justify-center py-2 text-xl font-bold text-[#4e525a]">
          Update Project
        </p>
        <form onSubmit={handleSubmit} className="px-3 flex flex-col gap-4">
          <label>
            <p className="font-semibold text-[#4e525a]">
              Project Name <span className="text-[#6E06F2]">*</span>
            </p>
            <input
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="border-2 rounded-lg mt-3 pl-3 w-full py-1"
              type="text"
              placeholder="Write Project Name!"
            />
          </label>
          <label>
            <p className="font-semibold text-[#4e525a]">
              Project Image <span className="text-[#6E06F2]">*</span>
            </p>
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files?.[0];
                setProjectImage(file || null);
              }}
              className="border-2 rounded-lg mt-3 pl-3 w-full py-1"
              type="file"
              accept="image/*"
            />
          </label>
          <label>
            <p className="font-semibold text-[#4e525a]">
              Project Link <span className="text-[#6E06F2]">*</span>
            </p>
            <input
              value={projectLink}
              onChange={(e) => setProjectLink(e.target.value)}
              className="border-2 rounded-lg mt-3 pl-3 w-full py-1"
              type="text"
              placeholder="Write Project Link!"
            />
          </label>
          <label>
            <p className="font-semibold text-[#4e525a]">
              Github Link <span className="text-[#6E06F2]">*</span>
            </p>
            <input
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
              className="border-2 rounded-lg mt-3 pl-3 w-full py-1"
              type="text"
              placeholder="Write Project Github Link!"
            />
          </label>
          <label>
            <p className="font-semibold text-[#4e525a]">
              Used Languages<span className="text-[#6E06F2]">*</span>
            </p>
            <input
              value={languages}
              onChange={(e) => setLanguages(e.target.value)}
              className="border-2 rounded-lg mt-3 pl-3 w-full py-1"
              type="text"
              placeholder="e.g. React, Node.js, MongoDB"
            />
          </label>
          <label>
            <p className="font-semibold text-[#4e525a]">
              Description<span className="text-[#6E06F2]">*</span>
            </p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-2 rounded-lg mt-3 pl-3 w-full py-1 resize-none"
              rows={3}
              placeholder="Write Project Description!"
            />
          </label>
          <label>
            <p className="font-semibold text-[#4e525a]">
              Detailed Description<span className="text-[#6E06F2]">*</span>
            </p>
            <textarea
              value={detailDescription}
              onChange={(e) => setDetailDescription(e.target.value)}
              className="border-2 rounded-lg mt-3 pl-3 w-full py-1 resize-none"
              rows={3}
              placeholder="Write Project Description!"
            />
          </label>
          <button
            type="submit"
            className="text-sm flex bg-black text-white font-bold justify-center items-center gap-2  transition-all duration-300 ease-in-out py-3 my-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Updating..." : "Update Project"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProject;