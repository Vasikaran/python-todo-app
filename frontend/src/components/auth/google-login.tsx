import { auth } from "@/utils/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { GoogleOutlined } from "@ant-design/icons";
import { Button } from "antd";

const provider = new GoogleAuthProvider();

const GoogleLogin = () => {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential) {
        const token = credential.accessToken;
        const user = result.user;
        console.log("User info: ", user, token);
      }
    } catch (error) {
      console.error("Error during Google login");
      console.error(error);
    }
  };

  return (
    <Button
      type="primary"
      icon={<GoogleOutlined />}
      size="large"
      style={{ width: "100%" }}
      onClick={handleGoogleLogin}
    >
      Login with Google
    </Button>
  );
};

export default GoogleLogin;
