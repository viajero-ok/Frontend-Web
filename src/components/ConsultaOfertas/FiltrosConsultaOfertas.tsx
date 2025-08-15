import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonGrid,
  IonIcon,
  IonItem,
  IonList,
  IonListHeader,
  IonRange,
  IonRow,
} from "@ionic/react";
import { filter } from "ionicons/icons";

export default function FiltrosConsultaOfertas(props: any) {
  return (
    <div className="flex flex-col border border-gray-200 mt-4 mb-12 rounded-md p-4">
      <div className="text-lg text-gray-600 font-bold">
        <IonIcon icon={filter} /> Filtros
      </div>

      <div className="flex flex-col w-full mt-2">
        <div className="w-full text-center text-gray-600 font-bold -mb-2">
         Rango de precio 
        </div>
        <IonRange
          aria-label="Rango de precio"
          dualKnobs={true}
          min={10}
          max={999}
          pinFormatter={(value: number) => `${value}K`}
          pin
          value={{ lower: 10, upper: 999 }}
          className="mx-8"
        />
      </div>

      <div className="mt-8">
        <div className="text-gray-600 font-bold">Alojamientos</div>
      </div>
      <div className="mt-6">
        <div className="text-gray-600 font-bold">Actividades</div>
      </div>
      <div className="mt-6">
        <div className="text-gray-600 font-bold">Eventos</div>
      </div>
    </div>
  );
}
