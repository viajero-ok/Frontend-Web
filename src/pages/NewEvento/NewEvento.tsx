import { useLocation, useParams } from "react-router";
import DefaultLoggedLayout from "../../Views/Layouts/DefaultLoggedLayout";
import { EventoProvider } from "../../Views/NewEvento/Provider/EventoProvider";
import NewEventoView from "../../Views/NewEvento/NewEventoView";

const NewEvento: React.FC = () => {
  const params: any = useParams();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let idEstablecimiento = searchParams.get("id_establecimiento") || null;

  return (
    params && (
      <DefaultLoggedLayout>
        <EventoProvider idOferta={params.id}>
          <NewEventoView
            idOferta={params.id}
            id_establecimiento={
              idEstablecimiento ? parseInt(idEstablecimiento) : 0
            }
          />
        </EventoProvider>
      </DefaultLoggedLayout>
    )
  );
};

export default NewEvento;
