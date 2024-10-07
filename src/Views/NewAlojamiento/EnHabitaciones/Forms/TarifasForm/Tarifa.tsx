import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonInput,
  IonRow,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { useState } from "react";
import Field from "../../../../../components/Field/Field";
import DateWheel from "../../../../../components/DateWheel/DateWheel";
import { trash } from "ionicons/icons";
import {
  eliminarTarifa,
  guardarTarifas,
} from "../../../../../App/Alojamientos/Tarifas";

type TDetalleTarifa = {
  id_tipo_detalle: string;
  id_tipo_pension: number;
  tarifa: string;
};
export default function Tarifa(props: any) {
  const [detallesTarifa, setDetallesTarifa] = useState<any[]>([]);
  const [fechaDesde, setFechaDesde] = useState<string>();
  const [fechaHasta, setFechaHasta] = useState<string>();

  const handleAgregarDetalle = () => {
    setDetallesTarifa((prev: any[]) => [
      ...prev,
      { id_tipo_detalle: null, id_tipo_pension: null, monto_tarifa: 0.0 },
    ]);
  };
  const handleEliminarDetalle = (id: number) => {
    setDetallesTarifa((prev: any[]) => [
      ...prev.filter((_, index: number) => index != id),
    ]);
  };

  const doGuardar = () => {
    if (!fechaDesde || !fechaHasta) return;
    guardarTarifas({
      fecha_desde: fechaDesde,
      fecha_hasta: fechaHasta,
      tarifas: detallesTarifa,
    }).then((_) => {
      props.handleObtenerDatos();
    });
  };
  const doActualizar = () => {
    if (!fechaDesde || !fechaHasta) return;
    guardarTarifas({
      fecha_desde: fechaDesde,
      fecha_hasta: fechaHasta,
      tarifas: detallesTarifa.map((tarifa: any, index: number) => ({
        ...tarifa,
        id_tarifa: index,
      })),
    });
  };
  const handleGuardar = () => {
    if (!props.selectedTarifa) doGuardar();
    else doActualizar();
  };

  const handleEliminar = () => {
    if (!props.selectedTarifa) return;
    eliminarTarifa(props.selectedTarifa.id_tarifa).then((_) => {
      props.handleObtenerDatos();
    });
  };

  return (
    <IonRow>
      <IonGrid
        style={{
          border: "3pt solid #F08408",
          borderRadius: "8pt",
          marginLeft: "60pt",
          marginRight: "60pt",
          paddingLeft: "31pt",
          paddingRight: "31pt",
          padding: "31pt",
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
          <h3 style={{ fontWeight: "bold" }}>
            {!props.selectedTarifa && "Nueva "}Tarifa
          </h3>
        </IonRow>
        <IonRow>
          <IonCol>
            <DateWheel
              value={
                props.selectedTarifa
                  ? props.selectedTarifa.fecha_desde.split("T")[0]
                  : ""
              }
              label={"Desde"}
              required={props.required ?? false}
              onChange={(e: any) => setFechaDesde(e)}
            />
          </IonCol>
          <IonCol>
            <DateWheel
              value={
                props.selectedTarifa
                  ? props.selectedTarifa.fecha_hasta.split("T")[0]
                  : ""
              }
              label={"Hasta"}
              required={props.required ?? false}
              onChange={(e: any) => setFechaHasta(e)}
            />
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
          <h3 style={{ fontWeight: "bold" }}>Detalles de la tarifa</h3>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonRow>
              <IonCol
                style={{
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                }}
              >
                Tipología
              </IonCol>
              <IonCol
                style={{
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                }}
              >
                Pensión
              </IonCol>
              <IonCol
                style={{
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                }}
              >
                Tarifa por noche
              </IonCol>
            </IonRow>
            {detallesTarifa.map((tarifa: any, index: number) => (
              <IonRow key={index}>
                <IonCol
                  style={{
                    display: "flex",
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IonSelect
                    onIonChange={(e: any) =>
                      setDetallesTarifa((prev: any[]) => {
                        const copy = [...prev];
                        copy[index].id_tipo_detalle = e.target.value;
                        return copy;
                      })
                    }
                  >
                    {props.tipologias.map((tipologia: any) => (
                      <IonSelectOption
                        key={tipologia.id_tipo_detalle}
                        value={tipologia.id_tipo_detalle}
                      >
                        {tipologia.nombre_tipo_detalle ?? "Sin nombre"}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonCol>
                <IonCol
                  style={{
                    display: "flex",
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IonSelect
                    onIonChange={(e: any) =>
                      setDetallesTarifa((prev: any[]) => {
                        const copy = [...prev];
                        copy[index].id_tipo_pension = e.target.value;
                        return copy;
                      })
                    }
                  >
                    {props.tiposPension &&
                      props.tiposPension.map((tipo: any) => (
                        <IonSelectOption
                          key={tipo.id_tipo_pension}
                          value={tipo.id_tipo_pension}
                        >
                          {tipo.tipo_pension}
                        </IonSelectOption>
                      ))}
                  </IonSelect>
                </IonCol>
                <IonCol
                  style={{
                    display: "flex",
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IonInput
                    label="$"
                    onIonInput={(e: any) =>
                      setDetallesTarifa((prev: any[]) => {
                        const copy = [...prev];
                        copy[index].monto_tarifa = parseInt(e.target.value);
                        return copy;
                      })
                    }
                  />
                  <IonButton
                    fill="clear"
                    onClick={() => handleEliminarDetalle(index)}
                  >
                    <IonIcon color="danger" icon={trash} />
                  </IonButton>
                </IonCol>
              </IonRow>
            ))}
            <IonRow>
              <IonButton onClick={() => handleAgregarDetalle()}>
                Agregar detalle
              </IonButton>
            </IonRow>
            <IonRow
              style={{
                display: "flex",
                alignContent: "right",
                alignItems: "right",
                justifyContent: "right",
                fontWeight: "bold",
                marginRight: "60pt",
              }}
            >
              <IonButton color="danger" onClick={() => handleEliminar()}>
                Eliminar
              </IonButton>
              <IonButton color="success" onClick={() => handleGuardar()}>
                Guardar
              </IonButton>
            </IonRow>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonRow>
  );
}
