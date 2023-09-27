import classnames from "classnames/bind";
import style from "./Profile.scss";
import { Container, Form, Button } from "react-bootstrap";
import { useContext, useEffect, useRef, useState } from "react";
import DataContext from "../../store/DataContext";
import ModalConText from "../../store/ModalContext";
import eventApi from "../../api/eventApi";
import sendMailApi from "../../api/sendMailApi";
import SelectDepartment from "../../components/SelectDepartment";
import ProfileEdit from "./profileEdit";
import ProfileView from "./profileView";
import { useParams, useNavigate } from "react-router-dom";
const cx = classnames.bind(style);

function Profile() {
  const [edited, setEdited] = useState(false);
  return (
    <div className={cx("wrapper")}>
      <Container>
        <div className={cx("form-container")}>
          <h2 className="text-center">Trang cá nhân</h2>
          <ProfileView />
        </div>
      </Container>
    </div>
  );
}

export default Profile;
