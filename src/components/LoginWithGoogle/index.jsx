import { useGoogleLogin } from "@react-oauth/google";
import "./LoginWithGoogle.scss";
import axios from "axios";
export default function LoginWithGoogle() {
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
      );

      console.log(userInfo);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });
  return (
    <div onClick={() => googleLogin()} className="google-btn">
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
