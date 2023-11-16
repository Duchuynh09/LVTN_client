import classnames from "classnames/bind";
import style from "./Profile.scss";
import { Container, Form, Button } from "react-bootstrap";
import { useContext, useEffect, useRef, useState } from "react";
import ProfileView from "./profileView";
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
