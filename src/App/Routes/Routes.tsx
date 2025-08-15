import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React from "react";
import { Redirect, Route, RouteProps } from "react-router";
import { useAuth } from "../../Auth/Auth";
import Home from "../../pages/Home";
import LogIn from "../../pages/LogIn/LogIn";
import MisReservas from "../../pages/MisReservas/MisReservas";
import MyOffers from "../../pages/MyOffers/MyOffers";
import NewOffer from "../../pages/MyOffers/NewOffer/NewOffer";
import { default as PublicarActividadPage } from "../../pages/MyOffers/PublicarOferta/PublicarActividadPage";
import PublicarAlojamientoPage from "../../pages/MyOffers/PublicarOferta/PublicarAlojamientoPage";
import MyPlaces from "../../pages/MyPlaces/MyPlaces";
import NewPlace from "../../pages/MyPlaces/NewPlace/NewPlace";
import NewActividad from "../../pages/NewActividad/NewActividad";
import NewAlojamientoEnHabitaciones from "../../pages/NewAlojamiento/NewAlojamientoEnHabitaciones";
import PagarTestPage from "../../pages/PagarTest/PagarTestPage";
import ReservarOfertaPage from "../../pages/ReservarOferta/ReservarOfertaPage";
import SignupPrestador from "../../pages/SignUp/Complete/Prestador/SignupPrestador";
import SignupComplete from "../../pages/SignUp/Complete/SignupComplete";
import SignupTurista from "../../pages/SignUp/Complete/Turista/SignupTurista";
import SignUp from "../../pages/SignUp/SignUp";
import VerOfertaPage from "../../pages/VerOferta/VerOfertaPage";
import ItineraryView from "../../Views/Itinerary/ItineraryView";
import PruebaFormView from "../../Views/PruebaForm/PruebaFormView";
import ResultadoReservaView from "../../Views/ResultadosReserva/ResultadoReservaView";

type RoutesContextValue = {};

const RoutesContext = React.createContext<RoutesContextValue>(
  {} as RoutesContextValue
);

const ViajeroRoute = ({
  protect,
  ...props
}: Omit<RouteProps, "children"> & { protect: any }) => (
  <Route {...props}>{protect.end()}</Route>
);

const protectSinPerfil = (auth: ReturnType<typeof useAuth>) =>
  protectInner(
    auth,
    auth != "loading" && auth != "failed" && !auth.tienePerfil ? (
      <Redirect to="/signup/complete" />
    ) : undefined
  );

const protectInner = (
  auth: ReturnType<typeof useAuth>,
  redirect?: React.ReactElement<Redirect>
) => {
  return {
    end: () => redirect ?? null,
    sinPerfil: () => protectSinPerfil(auth),
  };
};

export const protect = (auth: ReturnType<typeof useAuth>) => {
  return {
    end: () => null,
    sinPerfil: () => protectSinPerfil(auth),
  };
};

const RoutesProvider = ({ children }: { children?: React.ReactNode }) => {
  /** TODO: Lógica de rutas protegidas */
  /** TODO: La definición de las rutas se puede mover a un archivo separado y accesible como @/routes.ts */

  const auth = useAuth();
  if (!auth)
    throw new Error(
      "<RoutesProviders /> must be used within <AuthProvider></AuthProvider>"
    );

  const context: RoutesContextValue = {};
  return (
    auth != "loading" && (
      <RoutesContext.Provider value={context}>
        <IonReactRouter>
          <IonRouterOutlet>
            <ViajeroRoute
              exact
              path="/home"
              component={Home}
              protect={protect(auth).sinPerfil()}
            />
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route exact path="/my-places" component={MyPlaces} />
            <Route exact path="/my-places/new-place" component={NewPlace} />
            <Route exact path="/my-places/edit/:id" component={NewPlace} />
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
              path="/my-offers/actividad/edit/:id"
              component={NewActividad}
            />
            <Route
              exact
              path="/my-offers/publicar-alojamiento/:id"
              component={PublicarAlojamientoPage}
            />
            <Route
              exact
              path="/my-offers/publicar-actividad/:id"
              component={PublicarActividadPage}
            />
            <Route exact path="/pago/:id" component={PagarTestPage} />
            <Route exact path="/mis-reservas" component={MisReservas} />
            <Route
              exact
              path="/ver-oferta/:id/:fecha_desde/:fecha_hasta/:cantidad_personas"
              component={VerOfertaPage}
            />
            <Route
              exact
              path="/oferta/reservar/:id/:id_detalle/:fecha_desde/:fecha_hasta/:cantidad_personas"
              component={ReservarOfertaPage}
            />
            <Route
              exact
              path="/resultado-reserva"
              component={ResultadoReservaView}
            />
            <Route exact path="/itinerary" component={ItineraryView} />
            <Route exact path="/prueba-form" component={PruebaFormView} />
          </IonRouterOutlet>
        </IonReactRouter>
      </RoutesContext.Provider>
    )
  );
};

const useRoutes = () => {
  const context = React.useContext(RoutesContext);

  return context;
};

export { RoutesProvider, useRoutes };
