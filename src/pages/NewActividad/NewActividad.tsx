import { IonPage } from "@ionic/react";
import { useLocation, useParams } from "react-router";
import NewActividadView from "../../Views/NewActividad/NewActividadView";

const NewActividad: React.FC = () => {
  const params: any = useParams();
  console.log("params",params);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let idEstablecimiento = searchParams.get('id_establecimiento') || null;
  console.log("idEstablecimiento",idEstablecimiento);

  return (
    <IonPage>
      {params && <NewActividadView idOferta={params.id} id_establecimiento={idEstablecimiento ? parseInt(idEstablecimiento) : 0} />}
    </IonPage>
  );
};

export default NewActividad;
