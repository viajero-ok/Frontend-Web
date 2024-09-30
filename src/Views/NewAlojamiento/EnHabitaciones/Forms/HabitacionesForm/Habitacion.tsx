import { IonButton, IonCol, IonIcon, IonRow } from "@ionic/react";
import { trash } from "ionicons/icons";
import { eliminarHabitación } from "../../../../../App/Alojamientos/Habitacion";
import { Dispatch, SetStateAction } from "react";

type THabitacion = {
  habitacionSelected: any;
  setHabitacionSelected: Dispatch<SetStateAction<any>>;
  setHabitaciones: Dispatch<SetStateAction<any>>;
};
export default function Habitacion(props: THabitacion) {
  const handleEliminar = () => {
    eliminarHabitación(props.habitacionSelected).then(() => {
      props.setHabitaciones((prev: any[]) => [
        ...prev.filter((row: any) => row.id != props.habitacionSelected),
      ]);
      props.setHabitacionSelected(null);
    });
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
        <IonCol>
          <IonRow
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h3>Plazas</h3>
          </IonRow>
        </IonCol>
        <IonCol>
          <IonRow
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h3>Baños</h3>
          </IonRow>
        </IonCol>
      </IonRow>
      <IonRow
        style={{
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h4>Comodidades y servicios</h4>
      </IonRow>
      <IonRow>
        <IonButton>Guardar</IonButton>
        <IonButton color="danger" onClick={() => handleEliminar()}>
          <IonIcon icon={trash} /> Eliminar
        </IonButton>
      </IonRow>
    </>
  );
}
