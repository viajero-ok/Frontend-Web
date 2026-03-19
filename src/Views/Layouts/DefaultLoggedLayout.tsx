import {
  IonContent,
  IonHeader,
  useIonRouter,
} from "@ionic/react";
import LoginNavbar from "../../components/LoginNavbar/LoginNavbar";
import ProfileChip from "../../components/ProfileChip/ProfileChip";
import { useAuth } from "../../Auth/Auth";

export default function DefaultLoggedLayout({ children }: any) {
  const auth = useAuth();
  const router = useIonRouter();

  return (
    <>
      <IonHeader
        style={{ "webkit-box-shadow": "none", "box-shadow": "none" }}
        className="shadow-sm! border-b border-gray-100"
      >
        <div className="grid grid-cols-2 h-[50pt] mx-8">
          <div className="flex flex-row items-center h-full gap-4">
            <div
              onClick={() => router.push("/")}
              className="select-none cursor-pointer text-2xl text-[var(--color-viajero)] font-bold w-fit"
            >
              VIAJERO
            </div>
            {/* <div className="text-lg italic font-light text-gray-600">¡Hola, {}viajero!</div> */}
          </div>

          {auth != "failed" && auth != "loading" && (
            <div className="flex flex-row gap-8 justify-end items-center pr-4">
              {auth.esPrestador && (
                <div className="flex flex-row gap-4 text-gray-800 select-none h-full">
                  <div
                    onClick={() => router.push("/")}
                    className="cursor-pointer px-2 hover:underline hover:bg-[var(--color-viajero)]/5 h-full flex items-center"
                  >
                    Inicio
                  </div>
                  <div
                    onClick={() => router.push("/my-places")}
                    className="cursor-pointer px-2 hover:underline hover:bg-[var(--color-viajero)]/5 h-full flex items-center"
                  >
                    Establecimientos
                  </div>
                  <div
                    onClick={() => router.push("/my-offers")}
                    className="cursor-pointer px-2 hover:underline hover:bg-[var(--color-viajero)]/5 h-full flex items-center"
                  >
                    Ofertas
                  </div>
                  <div
                    onClick={() => router.push("/mis-reservas")}
                    className="cursor-pointer px-2 hover:underline hover:bg-[var(--color-viajero)]/5 h-full flex items-center"
                  >
                    Reservas
                  </div>
                </div>
              )}
              <ProfileChip />
            </div>
          )}
          {auth == "failed" && <LoginNavbar />}
        </div>
      </IonHeader>
      <IonContent fullscreen>
        {children}
      </IonContent>
    </>
  );
}
