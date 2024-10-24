type TActividad = {
  setOfferType: (type: "alojamiento" | "actividad" | "evento" | null) => void;
};
export default function Actividad(props: TActividad) {
  return (
    <>
      <h1>Actividad</h1>
    </>
  );
}
