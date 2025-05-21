import { IonImg, useIonRouter } from "@ionic/react";
import LoginForm from "./LoginForm";

export default function LoginView(props: any) {
  const router = useIonRouter();

  return (
    <div className="grid grid-cols-2 gap-2 w-1/2">
      <div className="flex flex-col rounded-3xl bg-gray-50">
        <img
          src="/images/login/suitcases.jpg"
          alt="Login image"
          className="w-full h-full object-cover rounded-t-3xl"
        />
        <div className="flex flex-col gap-2  p-8 font-medium text-gray-800">
          <div className="text-xl font-bold">En una unica plataforma</div>
          <ul className="flex flex-col gap-2">
            <li>&bull; Encontrá alojamientos</li>
            <li>&bull; Encontrá eventos</li>
            <li>&bull; Encontrá actividades</li>
          </ul>
        </div>
      </div>
      <div className=" flex flex-col justify-center ml-4">
        <div className="flx flex-col w-full gap-4 p-4">
          <div className="flex flex-col justify-start ">
            <div className="flex flex-row gap-2 mb-4">
              <IonImg src="/icon.png" style={{ width: "16pt" }} />
              <div className="text-[var(--color-viajero)] font-bold text-md">
                VIAJERO
              </div>
            </div>
            <div className="text-gray-600 text-3xl font-bold mb-4">
              Hola de nuevo!
            </div>
          </div>
          <LoginForm />
          <div className="text-sm text-gray-600 mt-2 w-full justify-center flex flex-row gap-1">
            No tenés cuenta?{" "}
            <span
              className="font-bold cursor-pointer hover:underline"
              onClick={() => router.push("signup")}
            >
              Registrate
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
