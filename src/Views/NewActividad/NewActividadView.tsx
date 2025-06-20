import { useState } from "react";
import DefaultLoggedLayout from "../Layouts/DefaultLoggedLayout";
import { Segment } from "../NewAlojamiento/EnHabitaciones/NewAlojamientoEnHabitacionesView";
import ActividadForm from "./Forms/ActividadForm/ActividadForm";
import TurnosyEntradasForm from "./Forms/TurnosyEntradasForm/TurnosyEntradasForm";
import UbicacionForm from "./Forms/UbicacionForm/UbicacionForm";
import { ActividadProvider, useActividad } from "./Provider/ActividadProvider";
import GuiaForm from "./Forms/ActividadForm/GuiaForm";

type TNewActividadView = {
  idOferta: string;
  id_establecimiento?: number;
};
export default function NewActividadView(props: TNewActividadView) {
  const [segment, setSegment] = useState<string>("actividad-form");

  const schemaTurnosyEntradasForm = {
    id_oferta: "",
    entradas: [],
    horarios_turnos: [],
  };

  const { isDirty } = useActividad();

  return (
    <div className="flex flex-col mx-8 mt-4">
      <div className="flex flex-row gap-2">
        <Segment
          segment={segment}
          value="actividad-form"
          label="Actividad"
          set={setSegment}
          className="w-full"
          disabled={false} //TODO: disabled={isDirty}
        />
        <Segment
          segment={segment}
          value="guias-form"
          label="Guías turísticos"
          set={setSegment}
          className="w-full"
          disabled={false} //TODO: disabled={isDirty}
        />
        <Segment
          segment={segment}
          value="imagenes-form"
          label="Imágenes"
          set={setSegment}
          className="w-full"
          disabled={false} //TODO: disabled={isDirty}
        />
        <Segment
          segment={segment}
          value="ubicacion-form"
          label="Ubicación"
          set={setSegment}
          className="w-full"
          disabled={false} //TODO: disabled={isDirty}
        />
        <Segment
          segment={segment}
          value="turnosyentradas-form"
          label="Turnos y entradas"
          set={setSegment}
          className="w-full"
          disabled={false} //TODO: disabled={isDirty}
        />
      </div>
      <div>
        {segment == "actividad-form" && (
          <ActividadForm idOferta={props.idOferta} />
        )}
        {segment == "ubicacion-form" && (
          <UbicacionForm
            idOferta={props.idOferta ?? 0}
            id_establecimiento={props.id_establecimiento ?? 0}
          />
        )}
        {segment == "turnosyentradas-form" && (
          <TurnosyEntradasForm idOferta={props.idOferta} />
        )}
        {segment == "imagenes-form" && <h1>Imagenes: Hello, World!</h1>}
        {segment == "guias-form" && <GuiaForm />}
      </div>
    </div>
  );
}
