import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";


const GoogleLoginButton = ({loginFlag}) => {
  const clientId = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID;


  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={(res) => {
          console.log(res);
          loginFlag(true);
        }}
        onFailure={(err) => {
          console.log(err);
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
