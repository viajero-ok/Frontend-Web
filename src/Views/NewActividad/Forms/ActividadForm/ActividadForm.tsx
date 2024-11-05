import { IonButton, IonCol, IonGrid, IonRow, useIonRouter} from "@ionic/react";
import { useEffect, useState } from "react";
import { guardarImagenDeAlojamiento } from "../../../../App/Alojamientos/NuevoAlojamiento";
import {
  getDatosDeRegistroNuevaActividad,
  guardarActividad,
  TBodyGuardarActividad,
  obtenerDatosRegistradosActividad
} from "../../../../App/Actividades/Actividad";
import MultimediaUpload from "../../../../components/MultimediaUpload/MultimediaUpload";
import { useForm } from "../../../../hooks/UseForm/FormProvider";
import GuiaForm from "./GuiaForm";
import DatosBasicosActividad from "./DatosBasicosActividad";
import PoliticasActividad from "./PoliticasActividad";


type TActividadForm = {
  idOferta: string;

};
export default function ActividadForm(props: TActividadForm) {
  const form = useForm();
  const router = useIonRouter();
  const [politicasDeCancelacion, setPoliticasDeCancelacion] = useState<any>();
  const [tiposPagoAnticipado, setTiposPagoAnticipado] = useState<any>();
  const [metodosDePago, setMetodosDePago] = useState<any>();
  const [formMetodosDePago, setFormMetodosDePago] = useState<number[]>([]);
  const [datosRegistrados, setDatosRegistrados] = useState<any>();
  const [categoria, setCategoria] = useState<any>();
  const [subcategoria, setSubcategoria] = useState<any>();
  const [dificultad, setDificultad] = useState<number>();
  const [formDatosBasicos, setFormDatosBasicos] = useState<TBodyGuardarActividad[]>([]);
  const [guias, setGuias] = useState<any[]>([]);
  const [esConGuia, setEsConGuia] = useState<boolean>(false);
  
  const handleGuardar = () => {

    if (!form) return;
    const s = form.schema;
    let body: TBodyGuardarActividad = {
      id_oferta: props.idOferta,
      id_sub_tipo_oferta: s.id_sub_tipo_oferta,
      id_sub_categoria: s.id_sub_categoria,
      nombre_actividad: s.nombre_actividad,
      descripcion_actividad: s.descripcion_actividad,
      requisitos_actividad: s.requisitos_actividad,
      id_dificultad: parseInt(s.id_dificultad),
      duracion_actividad: parseInt(s.duracion_actividad),
      distancia_actividad: parseInt(s.distancia_actividad),
      bl_con_guia: esConGuia,
      politicas_reserva: {
        id_politica_cancelacion: s.id_politica_cancelacion,
        plazo_dias_cancelacion: parseInt(s.plazo_dias_cancelacion),
        id_tipo_pago_anticipado: 1,
        porcentaje_pago_anticipado: 0.0, // float
      },
      metodos_de_pago: [],
    };
    console.log("body: ", body);
    guardarActividad(body)
      .then((response) => {
        setDatosRegistrados(response.data.datos_actividad);
      })
      .catch(() => { })
  };

  const handleImageService = (file: File) => {
    return guardarImagenDeAlojamiento({
      imagen: file,
      id_oferta: props.idOferta,
    });
  };
  
  useEffect(() => {
    getDatosDeRegistroNuevaActividad()
      .then((response: any) => {
        setCategoria(response.data.tipos_y_subtipos.subtipos);
        setSubcategoria(response.data.sub_categorias_actividades);
        setTiposPagoAnticipado(response.data.tipos_pago_anticipado);
        setPoliticasDeCancelacion(response.data.politicas_cancelacion);
        setMetodosDePago(response.data.metodos_pago);
        setDificultad(response.data.dificultad_actividades);
      })
      .catch((error: any) => { });
    obtenerDatosRegistradosActividad(props.idOferta)
      .then((response: any) => {
        setGuias(response.data.datos_actividad.guias);
       /*  console.log("guias: ", response.data.datos_actividad.guias); */
      })
      .catch((error: any) => { 
        console.log("error: ", error);  
      });
  }, []);


  return (
    <IonGrid style={{}}>
      <DatosBasicosActividad
        categoria={categoria}
        subCategorias={subcategoria}
        dificultad={dificultad}
        setFormDatosBasicos={setFormDatosBasicos}
        formDatosBasicos={formDatosBasicos}
      />
      <GuiaForm
        idOferta={props.idOferta}
        guias={guias}
        setEsConGuia={setEsConGuia}
      />
      <PoliticasActividad
        tipoPagoAnticipado={tiposPagoAnticipado}
        politicasDeCancelacion={politicasDeCancelacion}
        metodosDePago={metodosDePago}
        formMetodosDePago={formMetodosDePago}
        setFormMetodosDePago={setFormMetodosDePago}
      />
      <IonRow>
        <IonCol style={{ width: "80%", marginLeft: "10%", marginRight: "10%" }}>
          <MultimediaUpload
            service={handleImageService}
            uploaded={datosRegistrados?.imagenes ?? []}
          />
        </IonCol>
      </IonRow>
      <IonRow
        style={{
          justifyContent: "space-around",
          marginTop: "10pt",
          marginBottom: "10pt",
        }}
      >
        <IonButton
          color="light"
          onClick={() => router && router.push("/my-offers")}
        >
          Volver
        </IonButton>
        <IonButton
          style={{
            "--background": "#F08408",
          }}
          onClick={() => handleGuardar()}
        >
          Guardar
        </IonButton>
      </IonRow>
    </IonGrid>
  );
}
