import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonGrid,
  IonItem,
  IonList,
  IonListHeader,
  IonRange,
  IonRow,
} from "@ionic/react";

export default function FiltrosConsultaOfertas(props: any) {
  return (
    <IonCard
      style={{ marginTop: "24pt", borderRadius: "16pt", padding: "12pt" }}
    >
      <IonList>
        <IonItem style={{ fontSize: "20pt", fontWeight: "bold" }}>
          Filtrar por:
        </IonItem>
        <IonItem>
          <IonGrid>
            <IonRow>
              <b style={{ fontSize: "16pt" }}>Precio</b>
            </IonRow>
            <IonRow
              style={{
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              $10,000 - $999,999
            </IonRow>
            <IonRow>
              <IonRange
                aria-label="Rango de precio"
                dualKnobs={true}
                min={10}
                max={999}
                pinFormatter={(value: number) => `${value}K`}
                pin
                value={{ lower: 10, upper: 999 }}
              ></IonRange>
            </IonRow>
          </IonGrid>
        </IonItem>
        <IonItem>
          <b style={{ fontSize: "16pt" }}>Alojamientos</b>
        </IonItem>
        <IonItem>
          <b style={{ fontSize: "16pt" }}>Actividades</b>
        </IonItem>
        <IonItem>
          <b style={{ fontSize: "16pt" }}>Eventos</b>
        </IonItem>
      </IonList>
    </IonCard>
  );
}
