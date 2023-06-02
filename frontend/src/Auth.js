import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
//import { useAppContext } from './AppContext';

const GoogleLoginButton = ({ loginFlag }) => {
  const clientId = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID;
  const apiEndpointDEV = "http://localhost:4000/login";
  //const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;



  const sendResToServer = async (res) => {
    const response = await axios.post(
      apiEndpointDEV,
      { clientId: res.clientId },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${res.credential}`,
        },
        withCredentials: true,
      }
    );
    console.log(response.data)
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
