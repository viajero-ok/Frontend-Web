import {
  IonButton,
  IonCol,
  IonRow,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { useState } from "react";

export default function Tarifa(props: any) {
  const [detallesTarifa, setDetallesTarifa] = useState<any>([]);
  const handleEliminar = () => {};

  return (
    <>
      <IonRow
        style={{
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h3 style={{ fontWeight: "bold" }}>Tarifa</h3>
      </IonRow>
      <IonRow></IonRow>
      <IonRow
        style={{
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h3 style={{ fontWeight: "bold" }}>Detalles de la tarifa</h3>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonRow>
            <IonCol
              style={{
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
              }}
            >
              Tipología
            </IonCol>
            <IonCol
              style={{
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
              }}
            >
              Pensión
            </IonCol>
            <IonCol
              style={{
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
              }}
            >
              Tarifa por noche
            </IonCol>
          </IonRow>
          {detallesTarifa.length == 0 && (
            <IonRow>
              <IonCol
                style={{
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IonSelect>
                  <IonSelectOption>A</IonSelectOption>
                </IonSelect>
              </IonCol>
              <IonCol
                style={{
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IonSelect>
                  <IonSelectOption>A</IonSelectOption>
                </IonSelect>
              </IonCol>
              <IonCol
                style={{
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IonSelect>
                  <IonSelectOption>A</IonSelectOption>
                </IonSelect>
              </IonCol>
            </IonRow>
          )}
          <IonRow
            style={{
              display: "flex",
              alignContent: "right",
              alignItems: "right",
              justifyContent: "right",
              fontWeight: "bold",
              marginRight: "60pt",
            }}
          >
            <IonButton color="danger">Elminar</IonButton>
            <IonButton color="success">Guardar</IonButton>
          </IonRow>
        </IonCol>
      </IonRow>
    </>
  );
}
