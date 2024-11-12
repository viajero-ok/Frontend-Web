import DefaultLoggedLayout from "../../Views/Layouts/DefaultLoggedLayout";
import VerOfertaView from "../../Views/VerOferta/VerOfertaView";

const VerOfertaPage: React.FC = () => {
  return (
    <>
      <DefaultLoggedLayout>
        <VerOfertaView />
      </DefaultLoggedLayout>
    </>
  );
};
export default VerOfertaPage;
