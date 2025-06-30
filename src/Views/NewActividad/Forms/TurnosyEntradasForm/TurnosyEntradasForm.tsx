import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
  useIonRouter,
} from "@ionic/react";
import { useEffect, useState } from "react";
import TurnosForm from "./Turnos/TurnosForm";
import EntradasForm from "./Entradas/EntradasForm";
import { obtenerDatosRegistradosHorariosyEntradas } from "../../../../App/Actividades/TurnosyHorarios";
import { add } from "ionicons/icons";

type TTurnosyEntradasForm = {
  idOferta: string;
};

export default function TurnosyEntradasForm(props: TTurnosyEntradasForm) {
  const router = useIonRouter();

  return (
    <div className="flex flex-col gap-2">
      <TurnosForm />
      <EntradasForm />
      <div className="flex flex-row w-full justify-between mt-4 pb-12">
        <button>Volver</button>
        <button>Registrar</button>
      </div>
    </div>
  );
}
