import { useState } from "react";
import NewAlojamiento from "./NewAlojamiento";
import AlojamientoTypeSelection from "./AlojamientoTypeSelection";

type TAlojamiento = {
  setOfferType: (type: "alojamiento" | "actividad" | "evento" | null) => void;
};
export default function Alojamiento(props: TAlojamiento) {
  const [alojamientoType, setAlojamientoType] = useState<
    null | "en-habitaciones"
  >(null);

  return (
    <>
      {alojamientoType == null && (
        <AlojamientoTypeSelection
          setAlojamientoType={setAlojamientoType}
          setOfferType={props.setOfferType}
        />
      )}
      {alojamientoType == "en-habitaciones" && (
        <NewAlojamiento setAlojamientoType={setAlojamientoType} />
      )}
    </>
  );
}
