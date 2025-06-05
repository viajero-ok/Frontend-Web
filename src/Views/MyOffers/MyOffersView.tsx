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
import { addCircle } from "ionicons/icons";
import { useEffect, useState } from "react";
import { obtenerOfertasPorPrestador } from "../../App/Ofertas/Ofertas";
import EstablecimientoCard from "../../components/EstablecimientoCard/EstablecimientoCard";
import DefaultLoggedLayout from "../Layouts/DefaultLoggedLayout";
import OfertaCard from "../../components/OfertaCard/OfertaCard";
import { cn } from "../../components/ui/Form/Field";

export default function MyOffersView() {
  const [ofertas, setOfertas] = useState<any[]>([]);
  const router = useIonRouter();

  useEffect(() => {
    obtenerOfertasPorPrestador()
      .then((response: any) => {
        if (response.data.lenght == 0) return;
        setOfertas(response.data);
      })
      .catch(() => {});
  }, []);

  return (
    <DefaultLoggedLayout>
      <div className="mt-4 mx-8">
        <div className="flex flex-row p-4 w-full border border-gray-200 bg-gray-50 rounded-md">
          <div className="text-3xl text-gray-600 font-bold">Mis ofertas turísticas</div>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250pt,1fr))] gap-x-4 mt-4 place-items-center w-full">
          <div
            className={cn(
              "group border border-[var(--color-viajero)]/25 p-4 rounded-md hover:shadow-sm",
              "cursor-pointer w-[250pt] aspect-5/2 break-inside-avoid-column mb-4",
              "hover:border-[var(--color-viajero)] transition-all duration-400"
            )}
          >
            <div className="flex flex-row justify-center items-center bg-[var(--color-viajero)]/5 w-full h-full group-hover:bg-[var(--color-viajero)]/25 transition-all duration-400">
              <button className="cursor-pointer text-[var(--color-viajero)] transition-all duration-400 rounded-md group-hover:bg-[var(--color-viajero)] group-hover:text-white px-4 py-2 flex flex-row items-center content-center justify-center">
                <IonIcon icon={addCircle} />
                &nbsp;NUEVO
              </button>
            </div>
          </div>
          {ofertas.map((oferta: any) => (
            <OfertaCard
              key={oferta.id_oferta_turistica}
              oferta={oferta}
              id={oferta.id_oferta_turistica}
              setOfertas={setOfertas}
              tipoOferta={oferta.id_tipo_oferta}
            />
          ))}
        </div>
      </div>
    </DefaultLoggedLayout>
  );
}
