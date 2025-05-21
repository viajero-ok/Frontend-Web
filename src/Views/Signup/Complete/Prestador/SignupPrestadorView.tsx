import { z } from "zod";
import { FormProvider } from "../../../../hooks/UseForm/FormProvider";
import UncompleteLoggedLayout from "../../../Layouts/UncompleteLoggedLayout";
import SignupPrestadorForm from "./SignupPrestadorForm";
import { IonImg } from "@ionic/react";

export default function SignupPrestadorView() {
  return (
    <UncompleteLoggedLayout>
      <div className="flex flex-row gap-4 content-center items-center justify-center h-full w-full">
        <IonImg
          src="/public/3.3. Registro de usuario/Prestador.png"
          className="max-w-2/5"
        />
        <div className="max-w-2/5 border border-gray-100 shadow-md rounded-md p-4">
          <div className="w-full justify-left ml-4">
            <div className="text-3xl text-gray-600 font-bold">
              Registrar Prestador
            </div>
          </div>
          <SignupPrestadorForm />
        </div>
      </div>
    </UncompleteLoggedLayout>
  );
}
