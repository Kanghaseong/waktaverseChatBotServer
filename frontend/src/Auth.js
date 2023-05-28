import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";

const GoogleLoginButton = ({ loginFlag }) => {
  const clientId = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID;
  const apiEndpointDEV = "http://localhost:4000/login";
  const sendResToServer = async (res) => {
    const response = await axios.post(
      apiEndpointDEV,
      { clientId: res.clientId },
      {
        headers: {
          Authorization: `Bearer ${res.credential}`,
        },
        withCredentials: true,
      }
    );
    console.log(response)
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={(res) => {
          console.log(res);
          sendResToServer(res);
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
