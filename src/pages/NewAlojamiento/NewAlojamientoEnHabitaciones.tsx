import { IonPage } from "@ionic/react";
import NewAlojamientoEnHabitacionesView from "../../Views/NewAlojamiento/EnHabitaciones/NewAlojamientoEnHabitacionesView";
import { useParams } from "react-router";

const NewAlojamientoEnHabitaciones: React.FC = () => {
  const params: any = useParams();

  return (
    <IonPage>
      {params && <NewAlojamientoEnHabitacionesView idOferta={params.id} />}
    </IonPage>
  );
};

export default NewAlojamientoEnHabitaciones;
