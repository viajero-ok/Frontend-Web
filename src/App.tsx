import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import Home from "./pages/Home";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";

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
import { AuthProvider } from "./hooks/UseAuth/AuthProvider";
import MyPlaces from "./pages/MyPlaces/MyPlaces";
import NewPlace from "./pages/MyPlaces/NewPlace/NewPlace";
import MyOffers from "./pages/MyOffers/MyOffers";
import NewOffer from "./pages/MyOffers/NewOffer/NewOffer";
import NewAlojamientoEnHabitaciones from "./pages/NewAlojamiento/NewAlojamientoEnHabitaciones";
import PublicarOfertaPage from "./pages/MyOffers/PublicarOferta/PublicarOfertaPage";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <AuthProvider>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/my-places" component={MyPlaces} />
          <Route exact path="/my-places/new-place" component={NewPlace} />
          <Route exact path="/my-offers" component={MyOffers} />
          <Route exact path="/my-offers/new-offer" component={NewOffer} />
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signup/complete" component={SignupComplete} />
          <Route
            exact
            path="/signup/complete/prestador"
            component={SignupPrestador}
          />
          <Route
            exact
            path="/signup/complete/turista"
            component={SignupTurista}
          />
          <Route exact path="/map"></Route>
          <Route
            exact
            path="/my-offers/alojamiento/en-habitaciones/edit/:id"
            component={NewAlojamientoEnHabitaciones}
          />
          <Route
            exact
            path="/my-offers/publicar/:id"
            component={PublicarOfertaPage}
          />
        </IonRouterOutlet>
      </IonReactRouter>
    </AuthProvider>
  </IonApp>
);

export default App;
