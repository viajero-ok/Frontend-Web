<<<<<<< Updated upstream
import {
  IonGrid,
  IonLabel,
  IonRow,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import { useState } from "react";
import DefaultLoggedLayout from "../Layouts/DefaultLoggedLayout";
import ActividadForm from "./Forms/ActividadForm/ActividadForm";
import { FormProvider } from "../../hooks/UseForm/FormProvider";
import UbicacionForm from "./Forms/UbicacionForm/UbicacionForm";
import TurnosyEntradasForm from "./Forms/TurnosyEntradasForm/TurnosyEntradasForm";

=======
import { IonIcon, useIonRouter } from "@ionic/react";
import {
  arrowUndoOutline,
  calendarClearOutline,
  imagesOutline,
  locationOutline,
  personOutline,
  walkOutline
} from "ionicons/icons";
import { useState } from "react";
import FormSideMenu, {
  Sidebar,
} from "../../components/ui/FormSideMenu/FormSideMenu";
import { Segment } from "../../components/ui/Segment/Segment";
import ActividadForm from "./Forms/ActividadForm/ActividadForm";
import GuiaForm from "./Forms/ActividadForm/GuiaForm";
import TurnosyEntradasForm from "./Forms/TurnosyEntradasForm/TurnosyEntradasForm";
import UbicacionForm from "./Forms/UbicacionForm/UbicacionForm";
import { useActividad } from "./Provider/ActividadProvider";
import Imagenes from "./Forms/Imagenes/Imagenes";
>>>>>>> Stashed changes

type TNewActividadView = {
  idOferta: string;
  id_establecimiento?: number;
};
export default function NewActividadView(props: TNewActividadView) {
  
  const [segment, setSegment] = useState<"actividad-form" | "ubicacion-form" | "turnosyentradas-form">(
    "actividad-form"
  );

  const schemaActividadForm = {
    //id_oferta: "",
    id_sub_tipo_oferta: "", // number
    id_sub_categoria: "", // number
    nombre_actividad: "",
    descripcion_actividad: "",
    requisitos_actividad: "",
    id_dificultad: "", //number
    duracion_actividad: "", // number
    distancia_actividad: "", // number
    bl_con_guia: "", // boolean
    politicas_reserva: {
      // no soporta anidados
      id_politica_cancelacion: "", // number
      plazo_dias_cancelacion: "", // number
      porcentaje_pago_anticipado: "", // number
      id_tipo_pago_anticipado: "", // number
      metodos_pago: [], // number[]
    },
  };

  const schemaUbicacionForm = {
    id_oferta: "",
    calle: "",
    sin_numero: false, // boolean
    numero: "",
    localidad: "", // number
    departamento: "", // number
    provincia:"", // number
    latitud: "",
    longitud: "",
    observaciones: "",
  };

<<<<<<< Updated upstream
  const schemaTurnosyEntradasForm = {
    id_oferta: "",
    entradas: [],
    horarios_turnos: []

  }


  return (
    <DefaultLoggedLayout>
      <IonGrid>
        <IonRow style={{ marginTop: "31pt" }}>
          <IonSegment
            value={segment}
            onIonChange={(e: any) => setSegment(e.target.value)}
          >
            <IonSegmentButton
              value="actividad-form"
              style={{
                "--indicator-color": "#F08408",
                "--color-hover": "#F08408",
                "--color-checked": "#F08408",
              }}
            >
              <IonLabel>Actividad</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton
              value="ubicacion-form"
              style={{
                "--indicator-color": "#F08408",

                "--color-hover": "#F08408",
                "--color-checked": "#F08408",
              }}
            >
              <IonLabel>Ubicación</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton
              value="turnosyentradas-form"
              style={{
                "--indicator-color": "#F08408",

                "--color-hover": "#F08408",
                "--color-checked": "#F08408",
              }}
            >
              <IonLabel>Turnos y Entradas</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonRow>
        <IonRow>
          {segment == "actividad-form" && (
            <FormProvider schema={schemaActividadForm}>
              <ActividadForm idOferta={props.idOferta}/>
            </FormProvider>
          )}
          {segment == "ubicacion-form" && (
            <FormProvider schema={schemaUbicacionForm}>
              <UbicacionForm 
              idOferta={props.idOferta ?? 0} 
              id_establecimiento={props.id_establecimiento ?? 0} />
            </FormProvider>
          )}
          {segment == "turnosyentradas-form" && (
            <FormProvider schema={schemaTurnosyEntradasForm}>
              <TurnosyEntradasForm idOferta={props.idOferta}/>
            </FormProvider>
          )}
        </IonRow>
      </IonGrid>
    </DefaultLoggedLayout>
=======
  const { datosRegistradosActividad } = useActividad();

  const router = useIonRouter();

  return (
    <FormSideMenu
      renderSidebar={() => (
        <>
          <Sidebar title="Editar oferta">
            <Segment
              segment={segment}
              value="actividad-form"
              label="Actividad"
              set={setSegment}
              className="w-full"
              disabled={false} //TODO: disabled={isDirty}
              icon={walkOutline}
            />
            <Segment
              segment={segment}
              value="guias-form"
              label="Guías turísticos"
              set={setSegment}
              className="w-full"
              disabled={false} //TODO: disabled={isDirty}
              icon={personOutline}
            />
            <Segment
              segment={segment}
              value="imagenes-form"
              label="Imágenes"
              set={setSegment}
              className="w-full"
              disabled={false} //TODO: disabled={isDirty}
              icon={imagesOutline}
            />
            <Segment
              segment={segment}
              value="ubicacion-form"
              label="Ubicación"
              set={setSegment}
              className="w-full"
              disabled={false} //TODO: disabled={isDirty}
              icon={locationOutline}
            />
            <Segment
              segment={segment}
              value="turnosyentradas-form"
              label="Turnos y entradas"
              set={setSegment}
              className="w-full"
              disabled={false} //TODO: disabled={isDirty}
              icon={calendarClearOutline}
            />
            <div className="border-t border-gray-200 ml-2" />
            <button
              onClick={() => router.push("/my-offers")}
              className="viajero-button-ghost text-sm justify-start! w-full px-4 py-2 flex flex-row gap-2 items-center -mb-2 pl-2"
            >
              <IonIcon icon={arrowUndoOutline} />
              Volver
            </button>
          </Sidebar>
          <div className="flex flex-col gap-2 w-fit p-4 border border-gray-200 rounded-md">
            <div className="text-md font-bold text-gray-600">
              ¡Ya podés registrar tu oferta!
            </div>
            <div className="text-sm text-gray-600">
              Todos los datos necesarios han sido registrados
            </div>
            <button className="viajero-button px-4 py-2 animate-pulse">
              Registrar oferta
            </button>
          </div>
        </>
      )}
    >
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
      {segment == "imagenes-form" && <Imagenes />}
      {segment == "guias-form" && <GuiaForm />}
    </FormSideMenu>
>>>>>>> Stashed changes
  );
}
