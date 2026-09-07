import { Outlet, useNavigate,useLocation  } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingPage from "./LoadingPage";
import Header from "./Header";
import Footer from "./Footer";
import { AnimatePresence } from "framer-motion";
import Motion from "./Motion";

const ProtectedRoutes = () => {
const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const LoginHandler = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/get-user`,
          {
            withCredentials: true,
          },
        );

        if (response.data?.user) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
                  console.log("Error status:", error.response?.status);
                  console.log("Error data:", error.response?.data);
                  console.log("Error message:", error.response?.data?.message);
        }
        if (!isAuthenticated) {
          setIsAuthenticated(false);
          navigate("/");
        }
      } finally {
        setLoading(false);
      }
    };
    LoginHandler();
  }, []);

  if (loading) return <LoadingPage />;
  if (!isAuthenticated) return null;
  return(
     <div>
      <Header /> 
      <AnimatePresence mode="wait">
        <Motion key={location.pathname}> 
          <Outlet />
        </Motion>
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default ProtectedRoutes;
