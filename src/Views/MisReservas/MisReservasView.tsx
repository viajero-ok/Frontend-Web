import { IonCol, IonGrid, IonRow } from "@ionic/react";
import Calendar from "../../components/Calendar/Calendar";
import FilterList from "./FilterList";
import TipologiaList from "./TipologiaList";

export default function MisReservasView(props: any) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <IonGrid style={{ display: "inline-block" }}>
        <IonRow
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1>Mis reservas</h1>
        </IonRow>
        <IonRow
          style={{
            display: "flex",
            alignContent: "start",
            alignItems: "start",
            justifyContent: "center",
          }}
        >
          <IonCol size="auto" style={{}}>
            <TipologiaList />
            <FilterList />
          </IonCol>
          <IonCol
            size="auto"
            style={{
              paddingLeft: 0,
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Calendar />
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
}
