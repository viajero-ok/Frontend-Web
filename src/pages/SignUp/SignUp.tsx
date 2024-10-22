import { IonImg, IonPage } from "@ionic/react";
import SignupView from "../../Views/Signup/SignupView";
import VisitorLayout from "../../Views/Layouts/VisitorLayout";
const SignUp: React.FC = () => {
	return (
		<>
			<VisitorLayout>
				<SignupView />
			</VisitorLayout>
		</>
	);
};

export default SignUp;
