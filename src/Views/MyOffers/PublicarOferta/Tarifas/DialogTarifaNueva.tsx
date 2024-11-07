import {
  IonBackdrop,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonModal,
  IonRow,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  crearTarifa,
  obtenerDatosRegistroPublicacion,
} from "../../../../App/Publicaciones/PublicacionesAlojamientos";
import CalendarPicker from "../CalendarPicker";
import NumberField from "./NumberField";

type TDialogTarifa = {
  modal: any;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  isEdit?: boolean;
  idOferta: string;
  handleReload: () => void;
};
export default function DialogTarifa(props: TDialogTarifa) {
  const [tipologias, setTipologias] = useState<any[]>([]);
  const [fechas, setFechas] = useState<{
    fecha_desde: string | null;
    fecha_hasta: string | null;
  }>({
    fecha_desde: null,
    fecha_hasta: null,
  });
  const [tarifa, setTarifa] = useState<number | null>(null);
  const [selectedTipologia, setSelectedTipologia] = useState<string | null>(
    null
  );
  const [disable, setDisable] = useState<boolean>(false);

  const handleObtenerTipologias = () => {
    setDisable(true);
    obtenerDatosRegistroPublicacion(props.idOferta)
      .then((response: any) => {
        console.log("response: ", response)
        setTipologias(response.data.tipos_detalles);
        setDisable(false);
      })
      .catch(() => {
        setDisable(false);
      });
  };

  useEffect(() => {
    handleObtenerTipologias();
  }, []);

  const handlePublicar = () => {
    if (!fechas.fecha_desde || !fechas.fecha_hasta) return;
    if (!selectedTipologia) return;
    if (!tarifa) return;

    crearTarifa({
      fecha_desde: fechas.fecha_desde,
      fecha_hasta: fechas.fecha_hasta,
      id_oferta: props.idOferta,
      id_tipo_detalle: selectedTipologia,
      id_tipo_pension: 1,
      monto_tarifa: tarifa,
    })
      .then(() => {
        props.handleReload();
        props.setOpen(false);
      })
      .catch(() => {});
  };

  return (
    <IonModal
      ref={props.modal}
      isOpen={props.open}
      initialBreakpoint={0.75}
      breakpoints={[0, 0.75]}
      onDidDismiss={() => props.setOpen(false)}
      style={{ "--width": "100vw" }}
    >
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow
            style={{
              display: "flex",
              alignItems: "center",
              alignContent: "center",
              justifyContent: "center",
              width: "100%",
              position: "relative",
            }}
          >
            <h2>
              {props.isEdit ? "Editar tarifa" : "Agregar una nueva tarifa"}
            </h2>
            <div
              style={{ position: "absolute", float: "right", right: "12pt" }}
            >
              <IonButton
                fill="clear"
                style={{ marginRight: "12pt" }}
                onClick={() => props.setOpen(false)}
              >
                CANCELAR
              </IonButton>
              <IonButton
                color="success"
                style={{}}
                onClick={() => handlePublicar()}
              >
                {props.isEdit ? "GUARDAR" : "AGREGAR"}
              </IonButton>
            </div>
          </IonRow>
          <IonRow style={{ marginTop: "20pt" }}>
            <IonCol>
              <IonRow
                style={{
                  display: "flex",
                  alignItems: "center",
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <h3>Vigencia de la tarifa</h3>
              </IonRow>
              <IonRow>
                <CalendarPicker setFechas={setFechas} />
              </IonRow>
            </IonCol>
            <IonCol>
              <IonRow>
                <IonSelect
                  label="Tipología"
                  onIonChange={(e) => setSelectedTipologia(e.target.value)}
                >
                  {tipologias.map((tipologia: any) => (
                    <IonSelectOption
                      key={tipologia.id_tipo_detalle}
                      value={tipologia.id_tipo_detalle}
                    >
                      {tipologia.nombre_tipo_detalle}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonRow>
              <IonRow>
                <NumberField
                  setValue={setTarifa}
                  money
                  label="Tarifa por noche"
                  placeholder="$0,00"
                />
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonModal>
  );
}
