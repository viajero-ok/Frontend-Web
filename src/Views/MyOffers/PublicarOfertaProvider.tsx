import * as React from "react";

type PublicarOfertaContextValue = {};

const PublicarOfertaContext = React.createContext<PublicarOfertaContextValue>(
  {} as PublicarOfertaContextValue
);

const PublicarOfertaProvider = () => {
    
};

const usePublicarOferta = () => {
  const context = React.useContext(PublicarOfertaContext);

  if (!context)
    throw new Error(
      "usePublicarOferta must be used within <PublicarOfertaProvider></PublicarOfertaProvider>"
    );

  return context;
};
