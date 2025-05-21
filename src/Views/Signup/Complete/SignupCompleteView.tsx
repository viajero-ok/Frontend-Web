import { IonButton, IonImg, useIonRouter } from "@ionic/react";

export default function SignupCompleteView() {
  const router = useIonRouter();
  return (
    <div className="p-4 flex flex-col w-ful h-full content-center items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="text-3xl font-bold text-gray-600">
          Completá tu registro
        </div>
        <div className="">
          <h3>Elegí cómo querés registrarte</h3>
        </div>
      </div>
      <div className="grid grid-cols-2 mt-8">
        <div className="grid grid-cols-2 mx-4 border border-gray-100 shadow-md rounded-md h-fit p-4">
          <div>
            <IonImg
              src="/public/3.3. Registro de usuario/Prestador.png"
              style={{
                width: "100%",
                marginTop: "10pt",
                marginBottom: "10pt",
              }}
            />
          </div>
          <div className="flex flex-col items-start content-center justify-center ml-8">
            <div className="text-3xl text-[var(--color-viajero)] font-bold">
              Prestador
            </div>
            <span className="mt-4">
              &bull; Registrá y publicá tus establecimientos y ofertas
              turísticas.
            </span>
            <span>
              &bull; Gestioná todas tus reservas desde un solo lugar y accedé a
              reportes detallados para optimizar tu negocio.
            </span>
            <IonButton
              expand="block"
              style={{
                "--background": "#F08408",
                "--color": "white",
                "--border-radius": "20px",
              }}
              className="animate-pulse hover:animate-none mt-6"
              onClick={() => {
                if (!router) return;
                router.push("/signup/complete/prestador");
              }}
            >
              Potenciá tus ofertas
            </IonButton>
          </div>
        </div>

        <div className="grid grid-cols-2 mx-4 border border-gray-100 shadow-md rounded-md h-fit p-4">
          <div>
            <IonImg
              src="/public/3.3. Registro de usuario/Turista.png"
              style={{
                width: "100%",
                marginTop: "10pt",
                marginBottom: "10pt",
              }}
            />
          </div>
          <div className="flex flex-col items-start content-center justify-center ml-8">
            <div className="text-3xl text-[var(--color-viajero)] font-bold">
              Turista
            </div>
            <div className="text-left mt-4">
              <span>&bull; Reservá alojamiento</span><br/>
              <span>&bull; Encontrá nuevas actividades y eventos</span><br/>
              <span>
                &bull; Reservá en segundos y llevá un seguimiento de todas tus
                experiencias desde tu cuenta.
              </span>
            </div>
            <IonButton
              expand="block"
              style={{
                "--background": "#F08408",
                "--color": "white",
                "--border-radius": "20px",
              }}
              className="animate-pulse hover:animate-none mt-6"
              onClick={() => {
                if (!router) return;
                router.push("/signup/complete/turista");
              }}
            >
              Comenzá tu viaje
            </IonButton>
          </div>
        </div>
      </div>
    </div>
  );
}
