import { IonImg, IonPage } from "@ionic/react";
import SignupView from "../../Views/Signup/SignupView";
const SignUp: React.FC = () => {
  return (
    <IonPage>
      <img
        src="/3.2. Principal/Fondo.jpg"
        style={{
          display: "flex",
          position: "absolute",
          width: "auto",
          minHeight: "100%",
        }}
      />
      <SignupView />
    </IonPage>
  );
};

export default SignUp;
