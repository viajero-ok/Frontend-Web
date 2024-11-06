import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonRow,
} from "@ionic/react";
import CalendarPicker from "./CalendarPicker";
import Tarifas from "./Tarifas/Tarifas";
import { useEffect, useRef, useState } from "react";
import DialogTarifaNueva from "./Tarifas/DialogTarifaNueva";
import { obtenerTarifas } from "../../../App/Publicaciones/PublicacionesAlojamientos";
import DialogTarifa from "./Tarifas/DialogTarifa";

type TPublicarOfertaView = {
  idOferta: string;
};
export default function PublicarOfertaView(props: TPublicarOfertaView) {
  const [tarifas, setTarifas] = useState<any[]>([]);
  const [openDialogTarifa, setOpenDialogTarifa] = useState<boolean>(false);
  const [openDialogEditar, setOpenDialogEditar] = useState<boolean>(false);
  const [selectedTarifa, setSelectedTarifa] = useState<any>(null);
  const modal = useRef<HTMLIonModalElement>(null);

  useEffect(() => {
    obtenerTarifas(props.idOferta)
      .then((response: any) => {
        console.log("tarifas: ", response);
        setTarifas(response.data.datos);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  }, []);

  const handleReload = () => {
    obtenerTarifas(props.idOferta)
      .then((response: any) => {
        console.log("tarifas: ", response);
        setTarifas(response.data.datos);
      })
      .catch((error) => {
        console.log("error: ", error);
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
          <h3 style={{ fontSize: "24pt", fontWeight: "bold" }}>
            Publicar oferta
          </h3>
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
                width: "800pt",
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
                <IonCardTitle style={{ fontSize: "24pt", fontWeight: "bold" }}>
                  La posada del emi
                </IonCardTitle>
                <IonCardSubtitle style={{ fontSize: "14pt" }}>
                  Descripción: Lorem Ipsum is simply dummy text of the printing
                  and typesetting industry. Lorem Ips
                </IonCardSubtitle>
              </IonCardHeader>
              <IonButton color="success" style={{ position: "absolute", bottom: "12pt", right: "12pt" }}>PUBLICAR</IonButton>
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
      </IonGrid>
    </IonContent>
  );
}
