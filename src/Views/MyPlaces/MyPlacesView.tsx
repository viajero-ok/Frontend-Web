import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonRow,
  IonTitle,
  useIonRouter,
} from "@ionic/react";
import { useEffect, useState } from "react";
import DefaultLoggedLayout from "../Layouts/DefaultLoggedLayout";
import { obtenerEstablecimientos } from "../../App/Establecimientos/Establecimientos";
import EstablecimientoCard from "../../components/EstablecimientoCard/EstablecimientoCard";
import { addCircle } from "ionicons/icons";

export default function MyPlacesView() {
  const [establecimientos, setEstablecimientos] = useState([]);
  const router = useIonRouter();

  useEffect(() => {
    obtenerEstablecimientos()
      .then((response: any) => {
        setEstablecimientos(response.establecimientos);
      })
      .catch(() => {});
  }, []);

  return (
    <DefaultLoggedLayout>
      <IonContent>
        <IonGrid
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
            marginTop: "31pt",
          }}
        >
          <IonRow>
            <IonCol>
              <IonRow>
                <div className="text-3xl text-gray-600 font-bold">
                  Mis establecimientos
                </div>
              </IonRow>
            </IonCol>
          </IonRow>
          <IonRow
            style={{
              display: "flex",
              flexDirection: "row",
              padding: "13pt",
              margin: "3pt",
              width: "100%",
              flexGrow: 1,
            }}
          >
            <div className="flex gap-4">
              <div
                onClick={() => {
                  if (!router) return;
                  router.push("/my-places/new-place");
                }}
                className="group cursor-pointer transtion-colors duration-400 hover:shadow-md w-[200pt] hover:border-[var(--color-viajero)]/100 p-4 aspect-square border border-[var(--color-viajero)]/25 rounded-md flex flex-col"
              >
                <div className="bg-[var(--color-viajero)]/5 group-hover:bg-[var(--color-viajero)]/15 transition-colors duration-400 rounded-md w-full aspect-6/4" />
                <button className="cursor-pointer text-[var(--color-viajero)] transition-all duration-400 rounded-md group-hover:bg-[var(--color-viajero)] group-hover:text-white mt-4 px-4 py-2 flex flex-row items-center content-center justify-center">
                  <IonIcon icon={addCircle} />
                  &nbsp;NUEVO
                </button>
              </div>
              {establecimientos.map((establecimiento: any) => (
                <EstablecimientoCard
                  key={establecimiento.id_establecimiento}
                  nombre={establecimiento.nombre}
                  descripcion={establecimiento.descripcion}
                  id={establecimiento.id_establecimiento}
                />
              ))}
            </div>
          </IonRow>
        </IonGrid>
      </IonContent>
    </DefaultLoggedLayout>
  );
}
