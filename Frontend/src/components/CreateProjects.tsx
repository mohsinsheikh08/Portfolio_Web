import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import { ArrowBigLeft } from "lucide-react";
const CreateProjects = () => {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState<string>("");
  const [projectImage, setProjectImage] = useState<File | null>(null);
  const [projectLink, setProjectLink] = useState<string>("");
  const [githubLink, setGithubLink] = useState<string>("");
  const [languages, setLanguages] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [detailDescription, setDetailDescription] = useState<string>(""); 
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("projectName", projectName);
    formData.append("description", description);
    formData.append("techStack", languages);
    formData.append("liveLink", projectLink);
    formData.append("githubLink", githubLink);
    if (projectImage) {
      formData.append("projectImage", projectImage);
    }
    formData.append("detailDescription", detailDescription);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/project/create-project`,
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
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="w-full flex justify-center items-center min-h-screen">
           <Link to='/portfolio'> <div className="absolute top-2 left-6 md:left-10 md:top-10   text-[#3F0091] flex gap-2">Go to home Page <ArrowBigLeft /> </div></Link>
      <div className="border-2 my-10 w-80 rounded-xl">
        <p className="flex justify-center py-2 text-xl font-bold text-[#4e525a]">
          Create Project
        </p>
        <form onSubmit={handleSubmit} className="px-3 flex flex-col gap-4">
          <label>
            <p className="font-semibold text-[#4e525a]">
              Project Name <span className="text-[#3F0091]">*</span>
            </p>
            <input
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="border-2 rounded-lg mt-3 pl-3 w-full py-1"
              type="text"
              placeholder="Write Project Name!"
              required
            />
          </label>
          <label>
            <p className="font-semibold text-[#4e525a]">
              Project Image <span className="text-[#3F0091]">*</span>
            </p>
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files?.[0];
                setProjectImage(file || null);
              }}
              className="border-2 rounded-lg mt-3 pl-3 w-full py-1"
              type="file"
              accept="image/*"
              required
            />
          </label>
          <label>
            <p className="font-semibold text-[#4e525a]">
              Project Link <span className="text-[#3F0091]">*</span>
            </p>
            <input
              value={projectLink}
              onChange={(e) => setProjectLink(e.target.value)}
              className="border-2 rounded-lg mt-3 pl-3 w-full py-1"
              type="text"
              placeholder="Write Project Link!"
              required
            />
          </label>
          <label>
            <p className="font-semibold text-[#4e525a]">
              Github Link <span className="text-[#3F0091]">*</span>
            </p>
            <input
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
              className="border-2 rounded-lg mt-3 pl-3 w-full py-1"
              type="text"
              placeholder="Write Project Github Link!"
              required
            />
          </label>
          <label>
            <p className="font-semibold text-[#4e525a]">
              Used Languages<span className="text-[#3F0091]">*</span>
            </p>
            <input
              value={languages}
              onChange={(e) => setLanguages(e.target.value)}
              className="border-2 rounded-lg mt-3 pl-3 w-full py-1"
              type="text"
              placeholder="e.g. React, Node.js, MongoDB"
              required
            />
          </label>
          <label>
            <p className="font-semibold text-[#4e525a]">
              Description<span className="text-[#3F0091]">*</span>
            </p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-2 rounded-lg mt-3 pl-3 w-full py-1 resize-none"
              rows={3}
              placeholder="Write Project Description!"
              required
            />
          </label>
          <label>
            <p className="font-semibold text-[#4e525a]">
              Detailed Description<span className="te3F0091]">*</span>
            </p>
            <textarea
              value={detailDescription}
              onChange={(e) => setDetailDescription(e.target.value)}
              className="border-2 rounded-lg mt-3 pl-3 w-full py-1 resize-none"
              rows={3}
              placeholder="Write Project Description!"
              required
            />
          </label>
          <button
            type="submit"
            className="text-sm flex bg-black text-white font-bold justify-center items-center gap-2  transition-all duration-300 ease-in-out py-3 my-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating..." : "Create Project"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProjects;
