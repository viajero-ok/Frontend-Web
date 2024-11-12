import DefaultLoggedLayout from "../../Views/Layouts/DefaultLoggedLayout";
import ReservarOfertaView from "../../Views/ReservarOferta/ReservarOfertaView";

const ReservarOfertaPage: React.FC = () => {
  return (
    <>
      <DefaultLoggedLayout>
        <ReservarOfertaView />
      </DefaultLoggedLayout>
    </>
  );
};
export default ReservarOfertaPage;
