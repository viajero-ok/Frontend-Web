import { IonCheckbox, IonCol, IonRow } from "@ionic/react";
import Field from "../../../../../../components/Field/Field";
import { useForm } from "../../../../../../hooks/UseForm/FormProvider";

export default function ComodidadesServicios(props: any) {
  const form = useForm();
  return (
    <>
      <IonRow
        style={{
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "13pt",
        }}
      >
        <h3 style={{ fontWeight: "bold" }}>
          Comodidades y servicios del establecimiento
        </h3>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonRow
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "13pt",
            }}
          >
            <h4 style={{ borderBottom: "2pt solid #F08408", padding: "2pt" }}>
              Espacios de uso común
            </h4>
          </IonRow>
          <IonRow>
            <IonCol
              style={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div>
                <IonRow style={{ margin: "3pt" }}>
                  <IonCheckbox labelPlacement="end">Sala de estar</IonCheckbox>
                </IonRow>
                <IonRow style={{ margin: "3pt" }}>
                  <IonCheckbox labelPlacement="end">
                    Sala de conferencias
                  </IonCheckbox>
                </IonRow>
                <IonRow style={{ margin: "3pt" }}>
                  <IonCheckbox labelPlacement="end">
                    Sala de usos múltiples
                  </IonCheckbox>
                </IonRow>
                <IonRow style={{ margin: "3pt" }}>
                  <IonCheckbox labelPlacement="end">
                    Sala de convenciones
                  </IonCheckbox>
                </IonRow>
                <IonRow style={{ margin: "3pt" }}>
                  <IonCheckbox labelPlacement="end">
                    Sala de juegos p/ niños
                  </IonCheckbox>
                </IonRow>
                <IonRow style={{ margin: "3pt" }}>
                  <IonCheckbox labelPlacement="end">
                    Quincho/Galería
                  </IonCheckbox>
                </IonRow>
                <IonRow style={{ margin: "3pt" }}>
                  <IonCheckbox labelPlacement="end">Sala de juegos</IonCheckbox>
                </IonRow>
              </div>
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
              marginBottom: "13pt",
            }}
          >
            <h4 style={{ borderBottom: "2pt solid #F08408", padding: "2pt" }}>
              Servicios
            </h4>
          </IonRow>
          <IonRow>
            <IonCol
              style={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div>
                <IonRow style={{ margin: "3pt" }}>
                  <IonCheckbox labelPlacement="end">Cochera</IonCheckbox>
                </IonRow>
                <IonRow style={{ margin: "3pt" }}>
                  <IonCheckbox labelPlacement="end">
                    Cochera cubierta
                  </IonCheckbox>
                </IonRow>
                <IonRow style={{ margin: "3pt" }}>
                  <IonCheckbox labelPlacement="end">Lavandería</IonCheckbox>
                </IonRow>
                <IonRow style={{ margin: "3pt" }}>
                  <IonCheckbox labelPlacement="end">
                    Cobertura médica
                  </IonCheckbox>
                </IonRow>
                <IonRow style={{ margin: "3pt" }}>
                  <IonCheckbox labelPlacement="end">Bar</IonCheckbox>
                </IonRow>
                <IonRow style={{ margin: "3pt" }}>
                  <IonCheckbox labelPlacement="end">Restaurante</IonCheckbox>
                </IonRow>
                <IonRow style={{ margin: "3pt" }}>
                  <IonCheckbox labelPlacement="end">Spa</IonCheckbox>
                </IonRow>
                <IonRow style={{ margin: "3pt" }}>
                  <IonCheckbox labelPlacement="end">Sauna</IonCheckbox>
                </IonRow>
                <IonRow style={{ margin: "3pt" }}>
                  <IonCheckbox labelPlacement="end">Gimnasio</IonCheckbox>
                </IonRow>
              </div>
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
              marginBottom: "13pt",
            }}
          >
            <h4 style={{ borderBottom: "2pt solid #F08408", padding: "2pt" }}>
              Entretenimiento
            </h4>
          </IonRow>
          <IonRow>
            <IonCol
              style={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div>
                <IonRow style={{ margin: "3pt" }}>
                  <IonCheckbox labelPlacement="end">Pileta</IonCheckbox>
                </IonRow>
                <IonRow style={{ margin: "3pt" }}>
                  <IonCheckbox labelPlacement="end">
                    Pileta climatizada
                  </IonCheckbox>
                </IonRow>
                <IonRow style={{ margin: "3pt" }}>
                  <IonCheckbox labelPlacement="end">
                    Cancha de deporte
                  </IonCheckbox>
                </IonRow>
                <IonRow style={{ margin: "3pt" }}>
                  <IonCheckbox labelPlacement="end">
                    Juegos para niños
                  </IonCheckbox>
                </IonRow>
                <IonRow style={{ margin: "3pt" }}>
                  <IonCheckbox labelPlacement="end">
                    Acceso privado a río
                  </IonCheckbox>
                </IonRow>
              </div>
            </IonCol>
          </IonRow>
        </IonCol>
      </IonRow>
      <IonRow>
        <Field form={form} name="observaciones" label="Observaciones" />
      </IonRow>
    </>
  );
}
