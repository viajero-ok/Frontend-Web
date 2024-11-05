import { IonPage } from "@ionic/react";
import { useParams } from "react-router";
import NewActividadView from "../../Views/NewActividad/NewActividadView";

const NewActividad: React.FC = () => {
  const params: any = useParams();
  console.log("params",params);
  
  return (
    <IonPage>
      {params && <NewActividadView idOferta={params.id} />}
    </IonPage>
  );
};

export default NewActividad;
