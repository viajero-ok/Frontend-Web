import { IonButton, useIonRouter } from "@ionic/react";
import { colorFill } from "ionicons/icons";

export default function LoginNavbar() {
  const router = useIonRouter();
  const handleRegistrarme = () => {
    if (!router) return;
    router.push("/signup");
  };
  const handleIngresar = () => {
    if (!router) return;
    router.push("/login");
  };
  return (
    <div className="flex flex-row gap-4 items-center">
      <button
        onClick={() => handleIngresar()}
        className="cursor-pointer hover:border-[var(--color-viajero)] text-gray-800 border-transparent border-b-2"
      >
        iniciar sesión
      </button>
      <button
        onClick={() => handleRegistrarme()}
        className="cursor-pointer hover:border-[var(--color-viajero)] text-gray-800 border-transparent border-b-2"
      >
        registrarme
      </button>
    </div>
  );
}
