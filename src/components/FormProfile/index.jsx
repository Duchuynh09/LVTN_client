import { forwardRef } from "react";
import { Form, FloatingLabel } from "react-bootstrap";
function FormProfile({ user, register, errors }, ref) {
  return (
    <div>
      <Form.Group className="mb-3" controlId="formBasicMssv">
        <FloatingLabel
          controlId="floatingInput"
          label={user.role === "sinhVien" ? "Mã số sinh viên" : "Mã số cán bộ"}
          className="mb-3"
        >
          <Form.Control
            type="text"
            name="mssv"
            spellCheck={false}
            {...register("mssv", { required: true })}
          />
          {errors.mssv?.type === "required" && (
            <p className="text-danger">Vui lòng nhập mã số sinh viên</p>
          )}
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicName">
        <FloatingLabel
          controlId="floatingInput"
          label="Họ và tên"
          className="mb-3"
        >
          <Form.Control
            type="text"
            name="name"
            spellCheck={false}
            {...register("name", { required: true })}
          />
          {errors.name?.type === "required" && (
            <p className="text-danger">Vui lòng nhập họ và tên</p>
          )}
        </FloatingLabel>
      </Form.Group>
      {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  name="email"
                  placeholder="Email"
                  spellCheck={false}
                  {...register("email", {
                    required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  })}
                />
                {errors.email?.type === "required" && (
                  <p className="text-danger">Vui lòng nhập email</p>
                )}
                {errors.email?.type === "pattern" && (
                  <p className="text-danger">Vui lòng kiểm tra lại email</p>
                )}
              </Form.Group> */}
      <Form.Group className="mb-3" controlId="formBasicClass">
        <FloatingLabel
          controlId="floatingInput"
          label="Mã lớp"
          className="mb-3"
        >
          <Form.Control
            type="text"
            name="class"
            spellCheck={false}
            {...register("class", { required: true })}
          />
          {errors.class?.type === "required" && (
            <p className="text-danger">Vui lòng nhập mã lớp của bạn</p>
          )}
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicMajor">
        <FloatingLabel
          controlId="floatingInput"
          label="Chuyên nghành"
          className="mb-3"
        >
          <Form.Control
            type="text"
            name="major"
            spellCheck={false}
            {...register("major", { required: true })}
          />
          {errors.major?.type === "required" && (
            <p className="text-danger">Vui lòng nhập nghành hiện tại của bạn</p>
          )}
        </FloatingLabel>
      </Form.Group>
    </div>
  );
}

export default forwardRef(FormProfile);
