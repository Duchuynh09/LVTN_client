import { useGoogleLogin } from "@react-oauth/google";
import "./LoginWithGoogle.scss";
export default function LoginWithGoogle() {
  const login = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      console.log(credentialResponse);
    },
    onError: () => {
      console.log("Login Failed");
    },
    prompt: "select_account",
  });
  return (
    <div onClick={() => login()} className="google-btn">
      <div className="google-icon-wrapper">
        <img
          className="google-icon"
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          alt="icon_google"
        />
      </div>
      <p className="btn-text">
        <b>Đăng nhập bằng google</b>
      </p>
    </div>
  );
}
