import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonRow,
} from "@ionic/react";
import { add, trash } from "ionicons/icons";
import { Dispatch, SetStateAction, useState } from "react";
import { crearHabitacion } from "../../../../../App/Alojamientos/Habitacion";

type TAgregarTipologia = {
  setHabitacionSelected: Dispatch<SetStateAction<any>>;
  setHabitaciones: Dispatch<SetStateAction<any>>;
  habitaciones: any[];
};
export default function AgregarTipologia(props: TAgregarTipologia) {
  const handleAgregar = () => {
    crearHabitacion().then((response: any) =>
      props.setHabitaciones((prev: any[]) => [
        ...prev,
        {
          id: response.data.id_tipo_detalle,
        },
      ])
    );
  };

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
        <h3 style={{ fontWeight: "bold" }}>Tipologías</h3>
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
          <IonItem>
            <IonInput placeholder="Nombre de la tipología" />
          </IonItem>
        </IonCol>
        <IonCol
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IonInput label="Cantidad" type="number" />
        </IonCol>
        <IonCol
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IonButton onClick={() => handleAgregar()}>
            <IonIcon icon={add} />
            AGREGAR
          </IonButton>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonGrid
          style={{
            border: "3pt solid #F08408",
            borderRadius: "8pt",
            margin: "31pt",
            marginLeft: "60pt",
            marginRight: "60pt",
            paddingLeft: "31pt",
            paddingRight: "31pt",
            padding: "31pt",
          }}
        >
          <IonRow>
            <IonCol
              style={{
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h4 style={{ fontWeight: "bold" }}>Nombre Habitación</h4>
            </IonCol>
            <IonCol
              style={{
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h4 style={{ fontWeight: "bold" }}>Cantidad</h4>
            </IonCol>
          </IonRow>
          {props.habitaciones.map((habitacion: any, index: any) => (
            <IonRow
              key={index}
              style={{
                backgroundColor: "#F084084D",
                margin: "6pt",
                borderRadius: "8pt",
                cursor: "pointer",
              }}
              onClick={() => props.setHabitacionSelected(habitacion.id)}
            >
              <IonCol
                style={{
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Habitación Single
              </IonCol>
              <IonCol
                style={{
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                8
              </IonCol>
            </IonRow>
          ))}
        </IonGrid>
      </IonRow>
    </>
  );
}
