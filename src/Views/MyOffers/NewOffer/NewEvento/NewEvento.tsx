type TActividad = {
  setOfferType: (type: "alojamiento" | "actividad" | "evento" | null) => void;
};
export default function Evento(props: TActividad) {
  return (
    <>
      <h1>Evento</h1>
    </>
  );
}
