import { IonCol, IonGrid, IonRow } from "@ionic/react";

type TAgregarTarifa = {
  tarifas: any[];
};
export default function AgregarTarifa(props: TAgregarTarifa) {
  return (
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
        {props.tarifas.map((tarifa: any, index: any) => (
          <IonRow
            key={index}
            style={{
              backgroundColor: "#F084084D",
              margin: "6pt",
              borderRadius: "8pt",
              cursor: "pointer",
            }}
            //   onClick={() => props.setHabitacionSelected(habitacion.id)}
          >
            <IonCol
              style={{
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              01/11/24 al 01/01/25
            </IonCol>
            <IonCol
              style={{
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ul style={{ listStyleType: "none" }}>
                <li>Habitación single</li>
                <li>Habitación doble</li>
                <li>Habitación single</li>
              </ul>
            </IonCol>
            <IonCol
              style={{
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ul style={{ listStyleType: "none" }}>
                <li>$1.500.000</li>
                <li>$1.500.000</li>
                <li>$1.500.000</li>
              </ul>
            </IonCol>
            <IonCol
              style={{
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ul style={{ listStyleType: "none" }}>
                <li>Completa</li>
                <li>Completa</li>
                <li>Media</li>
              </ul>
            </IonCol>
          </IonRow>
        ))}
      </IonGrid>
    </IonRow>
  );
}
