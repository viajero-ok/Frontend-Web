import ItineraryMessagesView from "../../../Views/Itinerary/Messages/ItineraryMessagesView";
import DefaultLoggedLayout from "../../../Views/Layouts/DefaultLoggedLayout";


const ItineraryMessagesPage: React.FC = () => {
  return (
    <>
      <DefaultLoggedLayout>
        <ItineraryMessagesView />
      </DefaultLoggedLayout>
    </>
  );
};
export default ItineraryMessagesPage;
