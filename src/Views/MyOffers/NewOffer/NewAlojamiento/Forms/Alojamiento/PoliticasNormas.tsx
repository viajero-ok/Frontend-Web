import {
  IonButton,
  IonCheckbox,
  IonCol,
  IonIcon,
  IonRow,
  IonTitle,
} from "@ionic/react";
import Field from "../../../../../../components/Field/Field";
import { add } from "ionicons/icons";
import { useForm } from "../../../../../../hooks/UseForm/FormProvider";

type TPoliticasNormas = {
  caracteristicas: any;
  politicasDeCancelacion: any;
};
export default function PoliticasNormas(props: TPoliticasNormas) {
  const form = useForm();
  return (
    props.caracteristicas &&
    props.politicasDeCancelacion && (
      <>
        <IonRow
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            margin: "31pt",
          }}
        >
          <h3 style={{ fontWeight: "bold" }}>
            Políticas y normas del establecimiento
          </h3>
        </IonRow>
        <IonRow
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IonTitle
            style={{
              borderBottom: "2pt solid #F08408",
              marginBottom: "31pt",
              padding: "2pt",
            }}
          >
            Horarios de ingreso y egreso
          </IonTitle>
        </IonRow>
        <IonRow
          style={{
            border: "2pt solid #F08408",
            borderRadius: "8pt",
            padding: "6pt",
            marginLeft: "31pt",
            marginRight: "31pt",
            marginBottom: "31pt",
          }}
        >
          <IonCol
            style={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IonRow style={{}}>
              <IonCol>
                <Field form={form} name="checkin" label="Check-In" />
              </IonCol>
              <IonCol>
                <Field form={form} name="checkout" label="Check-Out" />
              </IonCol>
            </IonRow>
          </IonCol>
          <IonCol style={{}}>
            <IonRow
              style={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IonCheckbox>Aplica todo los días</IonCheckbox>
            </IonRow>
            <IonRow
              style={{
                paddingTop: "13pt",
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div>
                <IonCheckbox labelPlacement="stacked" style={{ margin: "3pt" }}>
                  L
                </IonCheckbox>
                <IonCheckbox labelPlacement="stacked" style={{ margin: "3pt" }}>
                  M
                </IonCheckbox>
                <IonCheckbox labelPlacement="stacked" style={{ margin: "3pt" }}>
                  M
                </IonCheckbox>
                <IonCheckbox labelPlacement="stacked" style={{ margin: "3pt" }}>
                  J
                </IonCheckbox>
                <IonCheckbox labelPlacement="stacked" style={{ margin: "3pt" }}>
                  V
                </IonCheckbox>
                <IonCheckbox labelPlacement="stacked" style={{ margin: "3pt" }}>
                  S
                </IonCheckbox>
                <IonCheckbox labelPlacement="stacked" style={{ margin: "3pt" }}>
                  D
                </IonCheckbox>
              </div>
            </IonRow>
          </IonCol>
          <IonCol
            style={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IonRow
              style={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IonButton style={{ "--background": "#F08408" }}>
                <IonIcon icon={add} />
                &nbsp;AGREGAR OTRO
              </IonButton>
            </IonRow>
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
                marginBottom: "13pt",
              }}
            >
              <h4 style={{ borderBottom: "2pt solid #F08408", padding: "2pt" }}>
                Normas
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
                  {props.caracteristicas.caracteristicas_normas?.map(
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
                <Field form={form} name="otrasNormas" label="Otras" />
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
                Política de cancelación
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
                <IonRow>
                  <Field
                    select
                    options={props.politicasDeCancelacion.map(
                      (politica: any) => ({
                        id: politica.id_politica_cancelacion,
                        text: politica.politica_cancelacion,
                      })
                    )}
                    form={form}
                    name="tipoDePolitica"
                    label="Tipo de política"
                  />
                </IonRow>
                <IonRow>
                  <Field
                    form={form}
                    name="plazoDeCancelacion"
                    label="Plazo de cancelación (en días)"
                  />
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
                marginBottom: "13pt",
              }}
            >
              <h4 style={{ borderBottom: "2pt solid #F08408", padding: "2pt" }}>
                Política de garantía
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
                    <IonCheckbox labelPlacement="end">
                      Solicita garantía al ingresar
                    </IonCheckbox>
                  </IonRow>
                  <IonRow>
                    <Field
                      form={form}
                      name="montoDeGarantia"
                      label="Monto de la garantía"
                    />
                  </IonRow>
                  <IonRow>
                    <Field
                      form={form}
                      name="observacionesGarantia"
                      label="Observaciones"
                    />
                  </IonRow>
                </div>
              </IonCol>
            </IonRow>
          </IonCol>
        </IonRow>
      </>
    )
  );
}
