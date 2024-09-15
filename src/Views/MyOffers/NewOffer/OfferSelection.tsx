import { useState } from "react";
import Alojaiento from "./NewAlojamiento/Alojamiento";
import OfferTypeSelection from "./OfferTypeSelection";
import Alojamiento from "./NewAlojamiento/Alojamiento";

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
    </>
  );
}
