import { IonPage } from "@ionic/react";
import SignupView from "../Views/Signup/SignupView";
import "./SignUp.css";
import { useEffect } from "react";
import { RouteComponentProps } from "react-router";

const SignUp: React.FC = () => {
  return (
    <IonPage>
      <SignupView />
    </IonPage>
  );
};

export default SignUp;
