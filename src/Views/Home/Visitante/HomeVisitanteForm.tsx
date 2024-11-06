import React, { useState } from "react";
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonPopover,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToast,
} from "@ionic/react";
import {
  alertCircleOutline,
  bed,
  bedOutline,
  calendarOutline,
  colorFill,
  navigateOutline,
  peopleOutline,
  personOutline,
  pin,
  pinOutline,
} from "ionicons/icons";
import Field from "../../../components/Field/Field";
import { useForm } from "../../../hooks/UseForm/FormProvider";
import { Validator as v } from "../../../hooks/UseForm/Validator/Validator";

export default function HomeVisitanteForm() {
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [openPopover, setOpenPopover] = useState<boolean>(false);

  const form = useForm();

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
              boxShadow: "0px 3px 11px 1px rgba(161,161,161,1)"
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
              <IonInput placeholder="Fecha de llegada - Fecha de salida" />
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
                &nbsp;2 adultos, 2 niños, 2 habitaciones
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
                      placeholder="Adultos"
                      style={{ fontSize: "16pt" }}
                    />
                  </IonItem>
                  <IonItem style={{ padding: "2pt" }}>
                    <IonIcon
                      icon={peopleOutline}
                      style={{ fontSize: "24pt" }}
                    />
                    &nbsp;&nbsp;
                    <IonInput
                      type="number"
                      placeholder="Niños"
                      style={{ fontSize: "16pt" }}
                    />
                  </IonItem>
                  <IonItem style={{ padding: "2pt" }}>
                    <IonIcon icon={bedOutline} style={{ fontSize: "24pt" }} />
                    &nbsp;&nbsp;
                    <IonInput
                      type="number"
                      placeholder="Habitaciones"
                      style={{ fontSize: "16pt" }}
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
              >
                Buscar
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        {/* <IonList
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "0pt",
          marginTop: "0pt",
          width: "50%",
          left: "50%",
          paddingRight: "12pt",
        }}
      >
        <Field
          name="destino"
          label="Destino"
          value={form?.schema?.destino}
          form={form}
          valid={v().required("El destino es obligatorio")}
        />
        <Field
          name="comienzoViaje"
          label="Comienzo del viaje"
          value={form?.schema?.comienzoViaje}
          form={form}
        />
        <Field
          name="finViaje"
          label="Fin del viaje"
          value={form?.schema?.finViaje}
          form={form}
        />
        <Field
          name="viajeros"
          label="Viajeros"
          value={form?.schema?.viajeros}
          form={form}
        />
      </IonList>
      <IonButton
        expand="block"
        style={{
          "--background": "#F08408",
          display: "flex",
          flexDirection: "column",
          margin: "13pt",
          marginTop: "0pt",
          marginLeft: "95pt",
          marginRight: "95pt",
          paddingLeft: "12pt",
          paddingRight: "12pt",
        }}
      >
        Buscar
      </IonButton>
      <IonToast
        isOpen={openToast}
        message={toastMessage}
        duration={5000}
        icon={alertCircleOutline}
        onDidDismiss={() => {
          setOpenToast(false);
          setToastMessage("");
        }}
      /> */}
      </div>
    </div>
  );
}
