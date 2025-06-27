import {
  IonButton,
  IonCol,
  IonGrid,
  IonModal,
  IonRow,
  useIonRouter,
} from "@ionic/react";
import { useState } from "react";
import { finalizarRegistroAlojamiento } from "../../../../../App/Alojamientos/NuevoAlojamiento";
import { cn } from "../../../../../components/ui/Form/Field";
import { useModal } from "../../../../../components/ui/Modal/Modal";
import { useAlojamientoEnHabitaciones } from "../../Provider/AlojamientoEnHabitacionesProvider";
import Habitacion from "./Habitacion";

export default function HabitacionesForm(props: { idOferta: string }) {
  const [habitacionSelected, setHabitacionSelected] = useState<any>();
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const router = useIonRouter();

  const { habitaciones, crearTipologia } = useAlojamientoEnHabitaciones();
  const { modal, setOpen } = useModal();

  const handleRegistrarAlojamiento = () => {
    finalizarRegistroAlojamiento(props.idOferta).then((response: any) => {
      console.log(response);
    });
  };

  const handleCrearTiplogia = () => {
    crearTipologia().catch((error) => {
      modal({
        variant: "danger",
        title: "Error",
        description:
          "Error al intentar crear la nueva tipología. Intente nuevamente.",
        actions: (
          <>
            <button className="viajero-button-ghost px-4 py-2">Aceptar</button>
          </>
        ),
      });
    });
  };

  return (
    <div className="grid grid-cols-12 w-full">
      <div className="flex flex-col col-span-4 gap-2">
        <div className="flex flex-row h-[42pt] items-center p-4 justify-between border border-gray-200 bg-gray-50 rounded-md">
          <div className="text-gray-600 text-xl font-bold">
            Tipologias ({habitaciones.length})
          </div>
          <div
            className="viajero-button px-4 py-2"
            onClick={() => handleCrearTiplogia()}
          >
            Nuevo
          </div>
        </div>
        <div className="flex flex-row h-[42pt] items-center p-4 justify-between border border-gray-200 bg-gray-50 rounded-md">
          <div className="text-gray-600 font-bold">Nombre</div>
          <div className="text-gray-600 font-bold">Cantidad</div>
        </div>
        <div className="flex flex-col max-h-lvh overflow-y-scroll pr-2 [scrollbar-width:thin] gap-2">
          {habitaciones.map((habitacion: any) => (
            <div
              key={habitacion.id_tipo_detalle}
              className={cn(
                "flex flex-row items-center p-4 justify-between border rounded-md",
                "hover:bg-[var(--color-viajero)]/5 hover:border-[var(--color-viajero)]",
                habitacionSelected == habitacion.id_tipo_detalle
                  ? "bg-[var(--color-viajero)]/5 border-[var(--color-viajero)]"
                  : "cursor-pointer border-gray-200"
              )}
              onClick={() => setHabitacionSelected(habitacion.id_tipo_detalle)}
            >
              <div className="text-gray-600">
                {habitacion.tipo_detalle ?? "Sin nombre"}
              </div>
              <div className="text-gray-600">{habitacion.cantidad ?? 0}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-8 ml-4">
        {habitacionSelected &&
          habitaciones.filter(
            (habitacion: any) =>
              habitacion.id_tipo_detalle == habitacionSelected
          )[0] && (
            <Habitacion
              habitacion={
                habitaciones.filter(
                  (habitacion: any) =>
                    habitacion.id_tipo_detalle == habitacionSelected
                )[0]
              }
              habitacionSelected={habitacionSelected}
              setHabitacionSelected={setHabitacionSelected}
              idOferta={props.idOferta}
            />
          )}
        <div
          style={{
            justifyContent: "space-around",
            marginTop: "10pt",
            marginBottom: "10pt",
          }}
        >
          {/* <IonButton
            color="light"
            onClick={() => router && router.push("/my-offers")}
          >
            Volver
          </IonButton>
          <IonButton
            style={{
              "--background": "#F08408",
            }}
            onClick={() => {
              setOpenConfirm(true);
              handleRegistrarAlojamiento();
            }}
          >
            Registrar
          </IonButton> */}
          <IonModal
            isOpen={openConfirm}
            onDidDismiss={() => setOpenConfirm(false)}
            style={{ "--height": "fit-content" }}
          >
            <div className="wrapper">
              <IonGrid
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 0,
                }}
              >
                <IonRow>
                  <h4 style={{ paddingLeft: "31%", fontWeight: "bold" }}>
                    ¡Alojamiento registrado!
                  </h4>
                  <IonCol style={{ display: "flex", justifyContent: "right" }}>
                    <IonButton
                      size="small"
                      fill="clear"
                      onClick={() => setOpenConfirm(false)}
                    >
                      {/* <IonIcon icon={close} /> */}
                    </IonButton>
                  </IonCol>
                </IonRow>
                <IonRow style={{ justifyContent: "center", padding: "8pt" }}>
                  <h3>El alojamiento se registró con éxito.</h3>
                </IonRow>
                <IonRow
                  style={{
                    justifyContent: "right",
                    padding: "8pt",
                    paddingTop: "0",
                  }}
                >
                  <IonButton
                    style={{
                      marginLeft: "1rem",
                      "--background": "#F08408",
                      "--color": "white",
                      "--border-color": "#F08408",
                      "--border-style": "solid",
                      "--border-width": "1px",
                    }}
                    onClick={() => {
                      router && router.push("/my-offers");
                      setOpenConfirm(false);
                    }}
                  >
                    Aceptar
                  </IonButton>
                </IonRow>
              </IonGrid>
            </div>
          </IonModal>
        </div>
      </div>
    </div>
  );
}
