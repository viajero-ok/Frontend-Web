import { useState } from "react";
import OfferTypeSelection from "./OfferTypeSelection";
import Alojamiento from "./NewAlojamiento/NewAlojamiento";
import Actividad from "./NewActividad/NewActividad";

export default function OfferSelection(props: any) {
  const [offerType, setOfferType] = useState<
    null | "alojamiento" | "actividad" | "evento"
  >(null);
  

  return (
    <>
      {offerType == null && (
        <OfferTypeSelection
          setOfferType={(type: "alojamiento" | "actividad" | "evento") =>
            setOfferType(type)
          }
        />
      )}
      {offerType == "alojamiento" && (
        <Alojamiento
          setOfferType={(type: null | "alojamiento" | "actividad" | "evento") =>
            setOfferType(type)
          }
        />
      )}
      {offerType == "actividad" && (
        <Actividad
          setOfferType={(type: null | "alojamiento" | "actividad" | "evento") =>
            setOfferType(type)
          }
        />
      )}
    </>
  );
}
