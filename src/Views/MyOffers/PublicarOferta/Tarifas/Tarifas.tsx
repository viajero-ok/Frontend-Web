import {
  IonButton,
  IonCard,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { useState } from "react";
import DialogTarifa from "./DialogTarifa";

type TTarifas = {};
export default function Tarifas(props: TTarifas) {
  const [tarifas, setTarifas] = useState<any[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  return (
    <>
      <IonCard style={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <IonGrid
          style={{
            margin: "31pt",
            marginLeft: "60pt",
            marginRight: "60pt",
            paddingLeft: "31pt",
            paddingRight: "31pt",
            padding: "31pt",
          }}
        >
          <IonRow
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h3 style={{ fontWeight: "bold" }}>Tarifas</h3>
          </IonRow>
          <IonRow
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IonButton style={{ "--background": "#F08408" }} onClick={() => setOpenDialog(true)}>
              <IonIcon icon={add} />
              &nbsp;AGREGAR NUEVA TARIFA
            </IonButton>
          </IonRow>
          <IonRow>
            <IonCol
              style={{
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h4 style={{ fontWeight: "bold" }}>Periodo</h4>
            </IonCol>
            <IonCol
              style={{
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h4 style={{ fontWeight: "bold" }}>Nombre habitación</h4>
            </IonCol>
            <IonCol
              style={{
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h4 style={{ fontWeight: "bold" }}>Tarifa por noche</h4>
            </IonCol>
            <IonCol
              style={{
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h4 style={{ fontWeight: "bold" }}>Pensión</h4>
            </IonCol>
          </IonRow>
          {[].map((tarifa: any, index: any) => (
            <IonRow
              key={index}
              style={{
                backgroundColor: "#F084084D",
                margin: "6pt",
                borderRadius: "8pt",
                cursor: "pointer",
              }}
              onClick={() => {}}
            >
              <IonCol
                style={{
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {`${tarifa.fecha_desde.split("T")[0]} a ${
                  tarifa.fecha_hasta.split("T")[0]
                }`}
              </IonCol>
              <IonCol
                style={{
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* <ul style={{ listStyleType: "none" }}>
                <li>Habitación single</li>
                <li>Habitación doble</li>
                <li>Habitación single</li>
              </ul> */}
                {tarifa.nombre_tipo_detalle}
              </IonCol>
              <IonCol
                style={{
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* <ul style={{ listStyleType: "none" }}>
                <li>$1.500.000</li>
                <li>$1.500.000</li>
                <li>$1.500.000</li>
              </ul> */}
                {tarifa.tipo_pension}
              </IonCol>
              <IonCol
                style={{
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* <ul style={{ listStyleType: "none" }}>
                <li>Completa</li>
                <li>Completa</li>
                <li>Media</li>
              </ul> */}
                ${tarifa.monto_tarifa}
              </IonCol>
            </IonRow>
          ))}
        </IonGrid>
      </IonCard>
      <DialogTarifa open={openDialog} setOpen={setOpenDialog} />
    </>
  );
}
