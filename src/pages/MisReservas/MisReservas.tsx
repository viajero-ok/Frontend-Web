import DefaultLoggedLayout from "../../Views/Layouts/DefaultLoggedLayout";
import MisReservasView from "../../Views/MisReservas/MisReservasView";
const MisReservas: React.FC = () => {
  return (
    <>
      <DefaultLoggedLayout>
        <MisReservasView />
      </DefaultLoggedLayout>
    </>
  );
};

export default MisReservas;
