import classnames from "classnames/bind";
import { Button } from "react-bootstrap";
import { useRef, useState } from "react";

import updateListApi from "../../api/updateListApi";

import style from "./UpdateGraList.scss";
const cx = classnames.bind(style);

function UpdateGraList() {
  // const inputFile = useRef(null);
  const [link, setLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // const file = inputFile.current.files[0];
    // const formData = new FormData();
    // formData.append('graduationFile',file)

    updateListApi.updateList({ link});
  };

  return (
    <div className={cx("wrapper", "mt-5")}>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className={cx("updateListForm", "mb-5")}
      >
        {/* comming soon */}
        {/* <p>Tập tin có dạng PDF: </p>
        <input ref={inputFile} type="file" /> */}
        <input
          className="p-2"
          spellCheck="false"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          type="text"
          placeholder="Link PDF"
        />

        <Button className={cx("d-block", "mt-4")} type="submit">
          Cập nhật
        </Button>
      </form>
    </div>
  );
}

export default UpdateGraList;
