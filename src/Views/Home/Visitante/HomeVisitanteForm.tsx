import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonPopover,
  IonRow,
} from "@ionic/react";
import {
  calendarOutline,
  navigateOutline,
  personOutline,
} from "ionicons/icons";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "../../../hooks/UseForm/FormProvider";
import CalendarPicker from "../../MyOffers/PublicarOferta/CalendarPicker";
import { consultarOfertasTurista } from "../../../App/Ofertas/Ofertas";

type THomeVisitanteForm = {
  setFechas: Dispatch<
    SetStateAction<{ fecha_desde: string | null; fecha_hasta: string | null }>
  >;
  setPersonas: Dispatch<SetStateAction<number | null>>;
  setOfertas: Dispatch<SetStateAction<any[]>>;
};
export default function HomeVisitanteForm(props: THomeVisitanteForm) {
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const [fechas, setFechas] = useState<{
    fecha_desde: string | null;
    fecha_hasta: string | null;
  }>({ fecha_desde: null, fecha_hasta: null });
  const [personas, setPersonas] = useState<number | null>(1);

  const form = useForm();

  useEffect(() => {
    if (!fechas) return;
    props.setFechas(fechas);
  }, [fechas]);

  useEffect(() => {
    if (!personas) return;
    props.setPersonas(personas);
  }, [personas]);

  // pagina: number;
  // limite: number;
  // id_tipo_oferta: number;
  // id_sub_tipo_oferta?: number;
  // id_localidad?: number;
  // min_monto?: number;
  // max_monto?: number;
  // latitud?: string;
  // longitud?: string;
  // radio?: number;
  // fecha_desde: Date;
  // fecha_hasta: Date;
  // cantidad_personas: number;
  const handleBuscar = () => {
    if (
      fechas.fecha_desde == null ||
      fechas.fecha_hasta == null ||
      personas == null
    )
      return;
    consultarOfertasTurista({
      pagina: 1,
      limite: 10,
      id_tipo_oferta: 1,
      fecha_desde: fechas.fecha_desde,
      fecha_hasta: fechas.fecha_hasta,
      cantidad_personas: personas,
    }).then((response: any) => {
      console.log("ofertas: ", response);
      props.setOfertas(response.data);
    });
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        marginTop: "-28pt",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "80%",
        }}
      >
        <IonGrid
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
          }}
        >
          <IonRow
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              backgroundColor: "white",
              boxShadow: "0px 3px 11px 1px rgba(161,161,161,1)",
            }}
          >
            <IonCol
              style={{
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                border: "3pt solid #F08408",
              }}
            >
              <IonIcon
                icon={navigateOutline}
                style={{ fontSize: "24pt", color: "gray" }}
              />
              &nbsp;
              <IonInput placeholder="A dónde vamos?" />
            </IonCol>
            <IonCol
              style={{
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                border: "3pt solid #F08408",
                borderLeft: 0,
              }}
            >
              <IonIcon
                icon={calendarOutline}
                style={{ fontSize: "24pt", color: "gray" }}
              />
              &nbsp;
              <IonInput
                id="click-trigger"
                placeholder="Fecha de llegada - Fecha de salida"
                value={
                  fechas.fecha_desde != null && fechas.fecha_hasta != null
                    ? `Del ${fechas.fecha_desde.split("T")[0]} al ${
                        fechas.fecha_hasta.split("T")[0]
                      }`
                    : ""
                }
              />
              <IonPopover
                trigger="click-trigger"
                triggerAction="click"
                style={{
                  "--min-width": "fit-content",
                }}
              >
                <IonContent
                  style={{
                    paddingTop: "12pt",
                    display: "flex",
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CalendarPicker setFechas={setFechas} />
                </IonContent>
              </IonPopover>
            </IonCol>
            <IonCol
              style={{
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "left",
                border: "3pt solid #F08408",
                borderLeft: 0,
                borderRight: 0,
              }}
            >
              <span
                id="popover"
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "left",
                  cursor: "pointer",
                }}
                onClick={() => setOpenPopover(true)}
              >
                <IonIcon
                  icon={personOutline}
                  style={{ fontSize: "24pt", color: "gray" }}
                />
                &nbsp;
                {personas != null
                  ? personas + ` persona${personas > 1 ? "s" : ""}`
                  : "1 persona"}
              </span>
              <IonPopover
                trigger="popover"
                isOpen={openPopover}
                onDidDismiss={() => setOpenPopover(false)}
                style={{}}
              >
                <IonList lines="none" style={{}}>
                  <IonItem style={{ padding: "2pt" }}>
                    <IonIcon
                      icon={personOutline}
                      style={{ fontSize: "24pt" }}
                    />
                    &nbsp;&nbsp;
                    <IonInput
                      type="number"
                      value={personas}
                      min={1}
                      placeholder="Personas"
                      style={{ fontSize: "16pt" }}
                      onIonChange={(e) => setPersonas(e.target.value as number)}
                    />
                  </IonItem>
                </IonList>
              </IonPopover>
            </IonCol>
            <IonCol
              style={{ border: "3pt solid #F08408", borderLeft: 0, padding: 0 }}
            >
              <IonButton
                expand="full"
                style={{
                  "--background": "#F08408",
                  margin: 0,
                  width: "100%",
                  height: "100%",
                  "--box-shadow": 0,
                }}
                onClick={() => handleBuscar()}
              >
                Buscar
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>
    </div>
  );
}
