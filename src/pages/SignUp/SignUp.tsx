import VisitorLayout from "../../Views/Layouts/VisitorLayout";
import SignupView from "../../Views/Signup/SignupView";
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
