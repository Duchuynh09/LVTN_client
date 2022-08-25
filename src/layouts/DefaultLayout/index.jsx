import Footer  from "../../components/Footer";
import Header from "../../components/Header";
import "./DefaultLayout.scss";

function DefaultLayout({ children }) {
  return (
    <div className="view" style={{backgroundImage:'url(https://elearning.ctu.edu.vn/pluginfile.php/1/theme_lambda/pagebackground/1660185458/CTU_Blank_white.png)'}}>
      <Header></Header>
      {children}
      <Footer></Footer>
    </div>
  );
}

export default DefaultLayout;
