import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonInput,
  IonRow,
} from "@ionic/react";
import {
  calendarOutline,
  homeOutline,
  navigateOutline,
  personOutline,
  pricetagOutline,
} from "ionicons/icons";

export default function FormTarifa(props: any) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        marginTop: "12pt",
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
                icon={homeOutline}
                style={{ fontSize: "24pt", color: "gray" }}
              />
              &nbsp;
              <IonInput placeholder="Tipología" />
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
              <IonInput placeholder="Vigencia" />
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
              <IonIcon
                icon={pricetagOutline}
                style={{ fontSize: "24pt", color: "gray" }}
              />
              <IonInput
                placeholder="AR$&nbsp;100,000"
                style={{}}
                onClick={() => {}}
              ></IonInput>
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
                AGREGAR
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
