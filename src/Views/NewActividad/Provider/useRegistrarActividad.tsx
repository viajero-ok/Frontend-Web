/**
 * Custom hook para encapsular la lógica a la hora de registrar la actividad y mostrar el mensaje de: "¡Ya podés registrar tu oferta!"
 *
 */

/**
 * - El estado de los formularios tienen que llegar acá de alguna forma
 * 
 * 
 */

type RegistrarContextValue = {};

const RegistrarContext = React.createContext<RegistrarContextValue>(
  {} as RegistrarContextValue
);

const useRegistrar = () => {
  const [puedeRegistrar, setPuedeRegistrar] = React.useState<boolean>(false);

  React.useEffect(() => {}, []);

  return {
    puedeRegistrar,
  };
};
