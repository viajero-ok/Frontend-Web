import { IonPage } from "@ionic/react";
import { useLocation, useParams } from "react-router";
import NewActividadView from "../../Views/NewActividad/NewActividadView";
import DefaultLoggedLayout from "../../Views/Layouts/DefaultLoggedLayout";
import { ActividadProvider } from "../../Views/NewActividad/Provider/ActividadProvider";

const NewActividad: React.FC = () => {
  const params: any = useParams();
  console.log("params", params);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let idEstablecimiento = searchParams.get("id_establecimiento") || null;
  console.log("idEstablecimiento", idEstablecimiento);

  return (
    params && (
      <DefaultLoggedLayout>
        <ActividadProvider idOferta={params.id}>
          <NewActividadView
            idOferta={params.id}
            id_establecimiento={
              idEstablecimiento ? parseInt(idEstablecimiento) : 0
            }
          />
        </ActividadProvider>
      </DefaultLoggedLayout>
    )
  );
};

export default NewActividad;
