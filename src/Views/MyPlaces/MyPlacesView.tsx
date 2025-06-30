import { IonIcon, useIonRouter } from "@ionic/react";
import { addCircle } from "ionicons/icons";
import { useEffect, useState } from "react";
import { obtenerEstablecimientos } from "../../App/Establecimientos/Establecimientos";
import EstablecimientoCard from "../../components/EstablecimientoCard/EstablecimientoCard";
import DefaultLoggedLayout from "../Layouts/DefaultLoggedLayout";
import {
  MapViewProvider,
  useMapView,
} from "../../components/MapView/useMapView";
import MapView from "../../components/MapView/MapView";

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

  const mapView = useMapView({});

  return (
    <DefaultLoggedLayout>
      <div className="gap-4 mt-4 mx-8">
        {/* <div>
          <MapViewProvider {...mapView}>
            <MapView className="w-full aspect-5/4 border border-[#bbb] rounded-md" />
          </MapViewProvider>
        </div> */}
        <div className="">
          <div>
            <div className="text-3xl text-gray-600 font-bold p-4 border border-gray-200 bg-gray-50 rounded-md">
              Mis establecimientos
            </div>
          </div>
          <div>
            <div className="flex gap-4 mt-4">
              <div
                onClick={() => {
                  if (!router) return;
                  router.push("/my-places/new-place");
                }}
                className="relative group cursor-pointer transtion-colors duration-400 w-[275pt] aspect-3/1 hover:border-[var(--color-viajero)]/100 p-4 border border-[var(--color-viajero)]/25 rounded-md flex flex-row"
              >
                <div className="bg-[var(--color-viajero)]/5 group-hover:bg-[var(--color-viajero)]/15 transition-colors duration-400 rounded-md w-full h-full" />
                <button className="absolute left-1/2 top-1/2 -translate-1/2 cursor-pointer text-[var(--color-viajero)] transition-all duration-400 rounded-md group-hover:bg-[var(--color-viajero)] group-hover:text-white px-4 py-2 flex flex-row items-center content-center justify-center">
                  <IonIcon icon={addCircle} />
                  &nbsp;NUEVO
                </button>
              </div>
              {establecimientos.map((establecimiento: any) => (
                <EstablecimientoCard
                  key={establecimiento.id_establecimiento}
                  establecimiento={establecimiento}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DefaultLoggedLayout>
  );
}
