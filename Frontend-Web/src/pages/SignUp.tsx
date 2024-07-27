import { IonPage } from "@ionic/react";
import SignupView from "../Views/Signup/SignupView";
import "./SignUp.css";
import { FormProvider } from "../hooks/UseForm/FormProvider";
import { Validator as v } from "../hooks/UseForm/Validator/Validator";

const SignUp: React.FC = () => {
  const schema = {
    email: "",
    password: "",
    passwordRepeated: "",
  };

  return (
    <IonPage>
      <FormProvider schema={schema}>
        <SignupView />
      </FormProvider>
    </IonPage>
  );
};

export default SignUp;
