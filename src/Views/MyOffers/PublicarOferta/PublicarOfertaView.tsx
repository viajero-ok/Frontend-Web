import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonRow,
  IonTitle,
  IonToast,
} from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import {
  obtenerDatosRegistradosPublicacion,
  obtenerTarifas,
  publicarAlojamiento,
} from "../../../App/Publicaciones/PublicacionesAlojamientos";
import DialogTarifa from "./Tarifas/DialogTarifa";
import DialogTarifaNueva from "./Tarifas/DialogTarifaNueva";
import Tarifas from "./Tarifas/Tarifas";
import { paperPlaneOutline } from "ionicons/icons";

type TPublicarOfertaView = {
  idOferta: string;
};
export default function PublicarOfertaView(props: TPublicarOfertaView) {
  const [datosRegistrados, setDatosRegistrados] = useState<any | null>(null);
  const [tarifas, setTarifas] = useState<any[]>([]);
  const [openDialogTarifa, setOpenDialogTarifa] = useState<boolean>(false);
  const [openDialogEditar, setOpenDialogEditar] = useState<boolean>(false);
  const [selectedTarifa, setSelectedTarifa] = useState<any>(null);
  const modal = useRef<HTMLIonModalElement>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);

  useEffect(() => {
    obtenerTarifas(props.idOferta)
      .then((response: any) => {
        console.log("tarifas: ", response);
        setTarifas(response.data.datos_tarifas);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
    obtenerDatosRegistradosPublicacion(props.idOferta)
      .then((response: any) => {
        console.log("datos registrados: ", response.data);
        setDatosRegistrados(response.data);
      })
      .catch((error) => {});
  }, []);

  const handleReload = () => {
    obtenerTarifas(props.idOferta)
      .then((response: any) => {
        console.log("tarifas: ", response);
        setTarifas(response.data.datos_tarifas);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  const handlePublicar = () => {
    publicarAlojamiento(props.idOferta)
      .then(() => {
        console.log("publicada");
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
        setShowToast(true);
        console.log("error pub oferta: ", error);
      });
  };

  return (
    <IonContent>
      <IonGrid>
        <IonRow
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20pt",
          }}
        >
          <IonTitle style={{ fontSize: "20pt", fontWeight: "bolder", textAlign: "center" }}>
            Publicar Oferta
          </IonTitle>
        </IonRow>
        <IonRow
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <IonCol
            style={{
              height: "100%",
              position: "relative",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <IonCard
              style={{
                display: "flex",
                flexDirection: "row",
                height: "100%",
                width: "600pt",
              }}
            >
              <img
                src="/images/hotel.jpg"
                alt="Imagen de la oferta"
                style={{
                  width: "200pt",
                  aspectRatio: "1/1",
                  margin: "20pt",
                  borderRadius: "8pt",
                }}
              />
              <IonCardHeader style={{ marginTop: "20pt" }}>
                <IonCardTitle style={{ fontSize: "18pt", fontWeight: "bold" }}>
                  {datosRegistrados &&
                    datosRegistrados.datos_oferta.datos_oferta.nombre}
                </IonCardTitle>
                <IonCardSubtitle style={{ fontSize: "14pt" }}>
                  {datosRegistrados &&
                    datosRegistrados.datos_oferta.datos_oferta.descripcion}
                </IonCardSubtitle>
              </IonCardHeader>
              <IonButton
                style={{ position: "absolute", bottom: "12pt", right: "12pt", "--background": "#53992B" }}
                onClick={() => handlePublicar()}
              >
                <IonIcon icon={paperPlaneOutline} style={{ marginRight: "8pt", color: "white" }} />
                PUBLICAR
                
              </IonButton>
            </IonCard>
          </IonCol>
          <Tarifas
            tarifas={tarifas}
            setOpen={setOpenDialogTarifa}
            setOpenEditar={setOpenDialogEditar}
            setSelectedTarifa={setSelectedTarifa}
          />
        </IonRow>
        <IonRow>
          <DialogTarifaNueva
            handleReload={handleReload}
            modal={modal}
            open={openDialogTarifa}
            setOpen={setOpenDialogTarifa}
            idOferta={props.idOferta}
          />
          <DialogTarifa
            handleReload={handleReload}
            selectedTarifa={selectedTarifa}
            modal={modal}
            open={openDialogEditar}
            setOpen={setOpenDialogEditar}
            idOferta={props.idOferta}
          />
        </IonRow>
        <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={errorMessage}
        duration={5000}
        color="danger"
        style={{
          fontSize: "12pt"
        }}
      />
      </IonGrid>
    </IonContent>
  );
}
