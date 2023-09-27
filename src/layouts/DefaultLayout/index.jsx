import postsApi from "../../api/postsApi";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { action, useStore } from "../../store";
import "./DefaultLayout.scss";
import ChatBot from "../../components/ChatBot/ChatCustom";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

function DefaultLayout({ children }) {
  const param = useParams();
  const location = useLocation();
  const [state, dispatch] = useStore();
  const [userActive, setUserActive] = useState();
  // Modify your getPots function to load more posts
  const getPots = useCallback(async () => {
    const postsAPI = await postsApi.getAllPost();
    // If there are more posts, append them to the existing state
    dispatch(action.fetchPosts(postsAPI));
    // Update the loading state
  }, [dispatch]);
  useEffect(() => {
    getPots();
    const user = JSON.parse(localStorage.getItem("user"));
    // Nếu tồn tại user
    // User là admin
    if (user) {
      setUserActive(user);
      if (user.isAdmin && location.pathname === "/") {
        setUserActive(null);
      } else if (param.login) {
        setUserActive(null);
      }
    } else setUserActive(null);

    /* Nếu qua được ải login, 
      (Ải login: nếu tồn tại user theo đúng trang đăng nhập)
      <=>admin thì đăng nhập admin , bình thường thì đăng nhập bình thường
      nếu tồn tại thì chuyển sang trang '/home' 
      ("bên trang login định nghĩa")
      */
  }, [param, getPots, location]);
  return (
    <div
      className="view"
      style={{
        backgroundImage:
          "url(https://elearning.ctu.edu.vn/pluginfile.php/1/theme_lambda/pagebackground/1660185458/CTU_Blank_white.png)",
      }}
    >
      <div className="header_wrapper">
        <Header user={userActive}></Header>
      </div>
      <div className="main_wrapper">{children}</div>
      <div className="footer_wrapper">
        <Footer></Footer>
      </div>
      <ChatBot />
    </div>
  );
}

export default DefaultLayout;
