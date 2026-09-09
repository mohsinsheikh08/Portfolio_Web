import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Home from "../components/home/Home.js";
import Projects from "../components/project/Projects.js";
import About from "../components/about/About.js";
import CreateProjects from "../components/CreateProjects.js";
import Login from "../components/Login.js";
import Register from "../components/Register.js";
import EditProject from "../components/EditProject.js";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";

const AppRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <div>
      <Routes location={location}>
        {/* Home, Projects, About par Header + Footer */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/projects"
          element={
            <>
              <Header />
              <Projects />
              <Footer />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Header />
              <About />
              <Footer />
            </>
          }
        />

        {/* Login, Register, Create, Edit par Header + Footer NAHI */}
        <Route path="/create-project" element={<CreateProjects />} />
        <Route path="/edit-project/:id" element={<EditProject />} />
        <Route path="/portfolio" element={<Navigate to="/" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;