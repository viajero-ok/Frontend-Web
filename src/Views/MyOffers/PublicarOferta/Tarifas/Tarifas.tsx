import {
  IonButton,
  IonCard,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
  IonTitle,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { Dispatch, SetStateAction, useRef, useState } from "react";

type TTarifas = {
  tarifas: any[];
  setOpen: Dispatch<SetStateAction<boolean>>;
  setOpenEditar: Dispatch<SetStateAction<boolean>>;
  setSelectedTarifa: Dispatch<SetStateAction<any>>;
};
export default function Tarifas(props: TTarifas) {
  return (
    <>
      <IonCard style={{ display: "flex", flexDirection: "row", width: "600pt" }}>
        <IonGrid
          style={{
            marginLeft: "60pt",
            marginRight: "60pt",
            paddingLeft: "10pt",
            paddingRight: "10pt",
            padding: "10pt",
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
            <IonTitle style={{ fontSize: "18pt", fontWeight: "bolder", textAlign: "center", color: "black", margin: "10pt" }}>
              Tarifas
            </IonTitle>
          </IonRow>
          <IonRow
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IonButton
              style={{ "--background": "#F08408" }}
              onClick={() => props.setOpen(true)}
            >
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
              <h4 style={{ fontWeight: "bold", fontSize: "14pt" }}>Periodo</h4>
            </IonCol>
            <IonCol
              style={{
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h4 style={{ fontWeight: "bold", fontSize: "14pt" }}>Nombre habitación</h4>
            </IonCol>
            <IonCol
              style={{
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h4 style={{ fontWeight: "bold", fontSize: "14pt" }}>Tarifa por noche</h4>
            </IonCol>
          </IonRow>
          {props.tarifas && props.tarifas.map((tarifa: any, index: any) => (
            <IonRow
              key={index}
              style={{
                backgroundColor: "#F084084D",
                margin: "6pt",
                borderRadius: "8pt",
                cursor: "pointer",
              }}
              onClick={() => {
                props.setSelectedTarifa(tarifa);
                props.setOpenEditar(true);
              }}
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
                ${tarifa.monto_tarifa}
              </IonCol>
            </IonRow>
          ))}
        </IonGrid>
      </IonCard>
    </>
  );
}
