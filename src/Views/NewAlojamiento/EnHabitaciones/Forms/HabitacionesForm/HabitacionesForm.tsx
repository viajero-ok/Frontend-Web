import { IonGrid, IonRow } from "@ionic/react";
import AgregarTipologia from "./AgregarTipologia";
import Habitacion from "./Habitacion";
import { useState } from "react";

export default function HabitacionesForm(props: any) {
  const [habitacionSelected, setHabitacionSelected] = useState<any>();
  const [habitacionesList, setHabitacionesList] = useState<any[]>([]);

  return (
    <IonGrid style={{}}>
      <AgregarTipologia
        setHabitacionSelected={setHabitacionSelected}
        habitaciones={habitacionesList}
        setHabitaciones={setHabitacionesList}
      />
      {habitacionSelected && (
        <Habitacion
          habitacionSelected={habitacionSelected}
          setHabitacionSelected={setHabitacionSelected}
          setHabitaciones={setHabitacionesList}
        />
      )}
      {/* <DatosBasicos />
      <ComodidadesServicios
        caracteristicas={caracteristicas}
        setFormCaracteristicas={setFormCaracteristicas}
      />
      <PoliticasNormas
        caracteristicas={caracteristicas}
        setFormCaracteristicas={setFormCaracteristicas}
        politicasDeCancelacion={politicasDeCancelacion}
        horarios={formHorarios}
        setHorarios={setFormHorarios}
      />
      <Reservas
        tipoPagoAnticipado={tiposPagoAnticipado}
        metodosDePago={metodosDePago}
        setFormMetodosDePago={setFormMetodosDePago}
      /> */}
      <IonRow>
        {/* <IonCol style={{ paddingLeft: "100pt", paddingRight: "100pt" }}>
          <MultimediaUpload service={handleImageService} />
        </IonCol> */}
      </IonRow>
      <IonRow>
        {/* <IonButton color="success" onClick={() => handleGuardar()}>
          Guardar
        </IonButton> */}
      </IonRow>
    </IonGrid>
  );
}
