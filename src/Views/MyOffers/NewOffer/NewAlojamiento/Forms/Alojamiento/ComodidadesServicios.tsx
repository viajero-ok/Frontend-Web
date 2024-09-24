import { IonCheckbox, IonCol, IonRow } from "@ionic/react";
import Field from "../../../../../../components/Field/Field";
import { useForm } from "../../../../../../hooks/UseForm/FormProvider";

type TComodidadesServicios = {
  caracteristicas: any;
};
export default function ComodidadesServicios(props: TComodidadesServicios) {
  const form = useForm();
  return (
    props.caracteristicas && (
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
                  {props.caracteristicas.caracteristicas_espacios_uso_comun?.map(
                    (caracteristica: any) => (
                      <IonRow
                        style={{ margin: "3pt" }}
                        key={caracteristica.id_caracteristica}
                      >
                        <IonCheckbox labelPlacement="end">
                          {caracteristica.caracteristica}
                        </IonCheckbox>
                      </IonRow>
                    )
                  )}
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
                  {props.caracteristicas.caracteristicas_servicios?.map(
                    (caracteristica: any) => (
                      <IonRow
                        style={{ margin: "3pt" }}
                        key={caracteristica.id_caracteristica}
                      >
                        <IonCheckbox labelPlacement="end">
                          {caracteristica.caracteristica}
                        </IonCheckbox>
                      </IonRow>
                    )
                  )}
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
                  {props.caracteristicas.caracteristicas_entretenimiento?.map(
                    (caracteristica: any) => (
                      <IonRow
                        style={{ margin: "3pt" }}
                        key={caracteristica.id_caracteristica}
                      >
                        <IonCheckbox labelPlacement="end">
                          {caracteristica.caracteristica}
                        </IonCheckbox>
                      </IonRow>
                    )
                  )}
                </div>
              </IonCol>
            </IonRow>
          </IonCol>
        </IonRow>
        <IonRow>
          <Field form={form} name="observaciones" label="Observaciones" />
        </IonRow>
      </>
    )
  );
}
