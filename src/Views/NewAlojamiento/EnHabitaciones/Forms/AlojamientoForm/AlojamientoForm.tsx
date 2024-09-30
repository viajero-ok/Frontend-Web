import { IonButton, IonCol, IonGrid, IonRow } from "@ionic/react";
import { useForm } from "../../../../../hooks/UseForm/FormProvider";

import { useEffect, useState } from "react";
import {
  getDatosDeRegistroNuevoAlojamiento,
  guardarAlojamiento,
  guardarImagenDeAlojamiento,
  TBodyGuardarAlojamiento,
  THorariosCheckInCheckOut,
} from "../../../../../App/Alojamientos/NuevoAlojamiento";
import MultimediaUpload from "../../../../../components/MultimediaUpload/MultimediaUpload";
import ComodidadesServicios from "./ComodidadesServicios";
import DatosBasicos from "./DatosBasicos";
import PoliticasNormas from "./PoliticasNormas";
import Reservas from "./Reservas";


type TAlojamientoForm = {
  id: string;
};
export default function AlojamientoForm(props: TAlojamientoForm) {
  const [caracteristicas, setCaracteristicas] = useState<any>();
  const [politicasDeCancelacion, setPoliticasDeCancelacion] = useState<any>();
  const [tiposPagoAnticipado, setTiposPagoAnticipado] = useState<any>();
  const [metodosDePago, setMetodosDePago] = useState<any>();

  const [formCaracteristicas, setFormCaracteristicas] = useState<number[]>([]);
  const [formMetodosDePago, setFormMetodosDePago] = useState<number[]>([]);
  const [formHorarios, setFormHorarios] = useState<THorariosCheckInCheckOut[]>([]);

  const form = useForm();

  const handleGuardar = () => {
    if (!form) return;

    const s = form.schema;
    let body: TBodyGuardarAlojamiento = {
      id_oferta: props.id,
      caracteristicas: formCaracteristicas,
      metodos_de_pago: formMetodosDePago,
      observaciones: {
        texto_observacion_comodidades_y_servicios_oferta: "",
        texto_observacion_canchas_deportes: "",
        texto_observacion_normas: "",
        texto_observacion_politica_garantia: "",
      },
      politicas_reserva_y_datos_basicos: {
        datos_basicos: {
          id_tipo_oferta: 0,
          id_sub_tipo_oferta: 0,
          id_establecimiento: 0,
          nombre_alojamiento: s.nombre_alojamiento,
          descripcion_alojamiento: s.descripcion_alojamiento,
        },
        politicas_reserva: {
          id_politica_cancelacion: 0,
          plazo_dias_cancelacion: 0,
          solicita_garantia: false,
          monto_garantia: 0.0, // float
          id_tipo_pago_anticipado: 0,
          porcentaje_pago_anticipado: 0.0, // float
          monto_pago_anticipado: 0.0, // float
          minimo_dias_estadia: parseInt(s.minimo_dias_estadia),
        },
      },
      check_in_out: formHorarios
    };
    guardarAlojamiento(body)
      .then((response) => {
        console.log("response: ", response);
      })
      .catch(() => {});
  };

  const handleImageService = (file: File) => {
    console.log("file service: ", file)
    return guardarImagenDeAlojamiento({imagen: file, id_oferta: props.id})
  }

  useEffect(() => {
    getDatosDeRegistroNuevoAlojamiento()
      .then((response: any) => {
        setCaracteristicas(response.data.caracteristicas);
        setPoliticasDeCancelacion(response.data.politicas_cancelacion);
        setTiposPagoAnticipado(response.data.tipos_pago_anticipado);
        setMetodosDePago(response.data.metodos_pago);
      })
      .catch((error: any) => {});
  }, []);

  // useEffect(() => {
  //   if (!form) return;
  //   console.log("form: ", form);
  // }, [form]);

  return (
    <IonGrid style={{}}>
      <DatosBasicos />
      <ComodidadesServicios
        caracteristicas={caracteristicas}
        setFormCaracteristicas={setFormCaracteristicas}
      />
      <PoliticasNormas
        caracteristicas={caracteristicas}
        setFormCaracteristicas={setFormCaracteristicas}
        politicasDeCancelacion={politicasDeCancelacion}
        horarios={formHorarios}
        setHorarios={setFormHorarios}
      />
      <Reservas
        tipoPagoAnticipado={tiposPagoAnticipado}
        metodosDePago={metodosDePago}
        setFormMetodosDePago={setFormMetodosDePago}
      />
      <IonRow>
        <IonCol style={{ paddingLeft: "100pt", paddingRight: "100pt" }}>
          <MultimediaUpload service={handleImageService}/>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonButton color="success" onClick={() => handleGuardar()}>
          Guardar
        </IonButton>
      </IonRow>
    </IonGrid>
  );
}
