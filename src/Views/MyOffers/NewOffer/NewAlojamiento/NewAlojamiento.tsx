import AlojamientoTypeSelection from "./AlojamientoTypeSelection";

type TAlojamiento = {
  setOfferType: (type: "alojamiento" | "actividad" | "evento" | null) => void;
};
export default function Alojamiento(props: TAlojamiento) {
  return (
    <>
      <AlojamientoTypeSelection setOfferType={props.setOfferType} />
    </>
  );
}
