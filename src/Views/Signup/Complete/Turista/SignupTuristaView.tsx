import UncompleteLoggedLayout from "../../../Layouts/UncompleteLoggedLayout";
import SignupTuristaForm from "./SignupTuristaForm";

export default function SignupTuristaView() {
  return (
    <UncompleteLoggedLayout>
      <div className="px-8 mt-4 w-full grid grid-cols-2">
        <div className="flex justify-end">
        <img
          src="/3.3. Registro de usuario/Turista.png"
          className="h-4/5 aspect-square pr-12"
        />
        </div>
        <SignupTuristaForm />
      </div>
    </UncompleteLoggedLayout>
  );
}
