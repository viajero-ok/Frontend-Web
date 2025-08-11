import { useAuth } from "../Auth/Auth";
import HomePrestadorView from "../Views/Home/Prestador/HomePrestadorView";
import HomeTuristaView from "../Views/Home/Turista/HomeTuristaView";
import DefaultLoggedLayout from "../Views/Layouts/DefaultLoggedLayout";
import "./Home.css";

const Home: React.FC = () => {
  const auth = useAuth();

  return (
    <DefaultLoggedLayout>
      {auth != "failed" && auth != "loading" && (
        <div>
          {auth.esTurista && <HomeTuristaView />}
          {auth.esPrestador && <HomePrestadorView />}
        </div>
      )}
      {auth == "failed" && <HomeTuristaView />}
    </DefaultLoggedLayout>
  );
};

export default Home;
