import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import Home from "./pages/Home";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
/* import "@ionic/react/css/palettes/dark.system.css"; */

/* Theme variables */
import LogIn from "./pages/LogIn/LogIn";
import SignupPrestador from "./pages/SignUp/Complete/Prestador/SignupPrestador";
import SignupComplete from "./pages/SignUp/Complete/SignupComplete";
import SignupTurista from "./pages/SignUp/Complete/Turista/SignupTurista";
import SignUp from "./pages/SignUp/SignUp";
import "./theme/variables.css";
import MyPlaces from "./pages/MyPlaces/MyPlaces";
import NewPlace from "./pages/MyPlaces/NewPlace/NewPlace";
import MyOffers from "./pages/MyOffers/MyOffers";
import NewOffer from "./pages/MyOffers/NewOffer/NewOffer";
import NewAlojamientoEnHabitaciones from "./pages/NewAlojamiento/NewAlojamientoEnHabitaciones";
import ItineraryView from "./Views/Itinerary/ItineraryView";
import PublicarOfertaPage from "./pages/MyOffers/PublicarOferta/PublicarActividadPage";
import PagarTestPage from "./pages/PagarTest/PagarTestPage";
import NewActividad from "./pages/NewActividad/NewActividad";
import MisReservas from "./pages/MisReservas/MisReservas";
import VerOfertaPage from "./pages/VerOferta/VerOfertaPage";
import ReservarOfertaPage from "./pages/ReservarOferta/ReservarOfertaPage";
import ResultadoReservaView from "./Views/ResultadosReserva/ResultadoReservaView";
import PruebaFormView from "./Views/PruebaForm/PruebaFormView";
import { ModalProvider } from "./components/ui/Modal/Modal";
import { ToastProvider } from "./components/ui/Toast/Toast";
import { AuthProvider } from "./Auth/Auth";
import { RoutesProvider } from "./App/Routes/Routes";

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <AuthProvider>
        <ModalProvider>
          <ToastProvider>
            <RoutesProvider />
          </ToastProvider>
        </ModalProvider>
      </AuthProvider>
    </IonApp>
  );
};

export default App;
