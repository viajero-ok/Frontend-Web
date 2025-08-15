import { IonPage } from "@ionic/react";
import NewAlojamientoEnHabitacionesView from "../../Views/NewAlojamiento/EnHabitaciones/NewAlojamientoEnHabitacionesView";
import { useParams } from "react-router";
import DefaultLoggedLayout from "../../Views/Layouts/DefaultLoggedLayout";
import { AlojamientoEnHabitacionesProvider } from "../../Views/NewAlojamiento/EnHabitaciones/Provider/AlojamientoEnHabitacionesProvider";

const NewAlojamientoEnHabitaciones: React.FC = () => {
  const params: any = useParams();

  return (
    <IonPage>
      {params && (
        <DefaultLoggedLayout>
          <AlojamientoEnHabitacionesProvider idOferta={params.id}>
            <NewAlojamientoEnHabitacionesView idOferta={params.id} />
          </AlojamientoEnHabitacionesProvider>
        </DefaultLoggedLayout>
      )}
    </IonPage>
  );
};

export default NewAlojamientoEnHabitaciones;
