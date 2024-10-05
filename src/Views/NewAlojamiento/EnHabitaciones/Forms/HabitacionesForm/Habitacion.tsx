import {
  IonButton,
  IonCheckbox,
  IonCol,
  IonIcon,
  IonInput,
  IonItem,
  IonRow,
  IonTextarea,
  IonToggle,
} from "@ionic/react";
import { trash } from "ionicons/icons";
import {
  eliminarHabitación,
  guardarImagenDeHabitacion,
  obtenerDatosRegistroHabitacion,
} from "../../../../../App/Alojamientos/Habitacion";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import MultimediaUpload from "../../../../../components/MultimediaUpload/MultimediaUpload";
import Check from "../../../../../components/Check/Check";

type THabitacion = {
  habitacionSelected: any;
  setHabitacionSelected: Dispatch<SetStateAction<any>>;
  setHabitaciones: Dispatch<SetStateAction<any>>;
  id: string;
};
export default function Habitacion(props: THabitacion) {
  const [datosRegistro, setDatosRegistro] = useState<any>();
  const [formCaracteristicas, setFormCaracteristicas] = useState<number[]>([]);

  const handleEliminar = () => {
    eliminarHabitación(props.habitacionSelected).then(() => {
      props.setHabitaciones((prev: any[]) => [
        ...prev.filter((row: any) => row.id != props.habitacionSelected),
      ]);
      props.setHabitacionSelected(null);
    });
  };

  const handleImageService = (file: File) => {
    return guardarImagenDeHabitacion({ imagen: file, id_oferta: props.id });
  };

  useEffect(() => {
    obtenerDatosRegistroHabitacion()
      .then((response: any) => {
        setDatosRegistro(response.data);
      })
      .catch(() => {});
  }, []);

  return (
    <div
      style={{
        border: "3pt solid #F08408",
        borderRadius: "8pt",
        marginLeft: "60pt",
        marginRight: "60pt",
      }}
    >
      <IonRow
        style={{
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h3 style={{ fontWeight: "bold" }}>Editar tipología</h3>
      </IonRow>
      <IonRow
        style={{
          border: "2pt solid #F08408",
          borderRadius: "8pt",
          width: "50%",
          position: "relative",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "13pt",
          margin: "8pt",
        }}
      >
        <IonCol
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IonItem>
            <IonInput placeholder="Nombre de la tipología" />
          </IonItem>
        </IonCol>
        <IonCol
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IonInput label="Cantidad" type="number" />
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonRow
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h3>Plazas</h3>
          </IonRow>
          <IonRow
            style={{
              border: "2pt solid #F08408",
              borderRadius: "8pt",
              margin: "13pt",
              marginRight: "6.5pt",
              padding: "13pt",
            }}
          >
            <IonCol>
              <IonRow
                style={{
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IonCol>Cama doble</IonCol>
                <IonCol>
                  <IonInput type="number" placeholder="Cantidad" />
                </IonCol>
              </IonRow>
              <IonRow
                style={{
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IonCol>Cama individual</IonCol>
                <IonCol>
                  <IonInput type="number" placeholder="Cantidad" />
                </IonCol>
              </IonRow>
              <IonRow
                style={{
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IonCol>Sofá-cama</IonCol>
                <IonCol>
                  <IonInput type="number" placeholder="Cantidad" />
                </IonCol>
              </IonRow>
              <IonRow
                style={{
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IonCol>Total de plazas</IonCol>
                <IonCol>30</IonCol>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonCol>
        <IonCol>
          <IonRow
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h3>Baños</h3>
          </IonRow>
          <IonRow
            style={{
              border: "2pt solid #F08408",
              borderRadius: "8pt",
              margin: "13pt",
              marginLeft: "6.5pt",
              padding: "13pt",
            }}
          >
            <IonCol>
              <IonRow>
                <IonCol
                  style={{
                    display: "flex",
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IonInput type="number" label="Cantidad" />
                </IonCol>
                <IonCol
                  style={{
                    display: "flex",
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IonToggle>Es baño compartido</IonToggle>
                </IonCol>
              </IonRow>
              <IonRow
                style={{
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IonToggle>
                  Adaptado a personas con movilidad reducida
                </IonToggle>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonCol>
      </IonRow>
      <IonRow
        style={{
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h4>Comodidades y servicios</h4>
      </IonRow>
      <IonRow
        style={{
          border: "2pt solid #F08408",
          borderRadius: "8pt",
          width: "50%",
          position: "relative",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "13pt",
          margin: "8pt",
        }}
      >
        <IonCol
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            {datosRegistro &&
              datosRegistro.caracteristicas_habitaciones?.map(
                (caracteristica: any) => (
                  <IonRow
                    style={{ margin: "3pt" }}
                    key={caracteristica.id_caracteristica}
                  >
                    <Check
                      id={caracteristica.id_caracteristica}
                      setList={setFormCaracteristicas}
                      label={caracteristica.caracteristica}
                    />
                  </IonRow>
                )
              )}
          </div>
        </IonCol>
        <IonCol>
          <IonRow
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
              paddingRight: "13pt",
            }}
          >
            <IonTextarea rows={4} maxlength={200} name="otras" label="Otras" />
          </IonRow>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          {/* <MultimediaUpload service={handleImageService} /> */}
        </IonCol>
      </IonRow>
      <IonRow
        style={{
          display: "flex",
          alignContent: "right",
          alignItems: "right",
          justifyContent: "right",
          padding: "13pt",
        }}
      >
        <IonButton color="danger" onClick={() => handleEliminar()}>
          <IonIcon icon={trash} /> Eliminar
        </IonButton>
        <IonButton color="success" style={{ marginLeft: "13pt"}}>Guardar</IonButton>
      </IonRow>
    </div>
  );
}
