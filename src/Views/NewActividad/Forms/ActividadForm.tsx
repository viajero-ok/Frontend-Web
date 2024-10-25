import { IonButton, IonCol, IonGrid, IonRow, useIonRouter } from "@ionic/react";
import { useState } from "react";
import { guardarImagenDeAlojamiento } from "../../../App/Alojamientos/NuevoAlojamiento";
import Field from "../../../components/Field/Field";
import MultimediaUpload from "../../../components/MultimediaUpload/MultimediaUpload";
import { useForm } from "../../../hooks/UseForm/FormProvider";
import GuiaForm from "./GuiaForm";

type TActividadForm = {
  idOferta: string;
};
export default function ActividadForm(props: TActividadForm) {
  const [datosRegistrados, setDatosRegistrados] = useState<any>();

  const form = useForm();
  const router = useIonRouter();
  const handleGuardar = () => {};
  const handleImageService = (file: File) => {
    return guardarImagenDeAlojamiento({
      imagen: file,
      id_oferta: props.idOferta,
    });
  };

  return (
    <IonGrid style={{}}>
      <IonRow>
        <IonCol
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <Field
            form={form}
            name="nombre_actividad"
            label="Nombre de la actividad"
          />
        </IonCol>
        <IonCol
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <Field
            select
            form={form}
            name="id_categoria"
            label="Categoría"
            options={[]}
          />
        </IonCol>
        <IonCol
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <Field
            select
            form={form}
            name="id_subcategoria"
            label="Sub-categoría"
            options={[]}
          />
        </IonCol>
      </IonRow>
      <IonRow
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <Field
          textarea
          form={form}
          name="descripcion_actiidad"
          label="Descripción de la actividad"
        />
      </IonRow>
      <IonRow>
        <IonCol
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <Field
            form={form}
            name="duracion_actividad"
            label="Duración (horas)"
          />
        </IonCol>
        <IonCol
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <Field
            form={form}
            name="distancia_actividad"
            label="Distancia (km)"
          />
        </IonCol>
        <IonCol
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <Field
            select
            form={form}
            name="id_dificultad"
            label="Dificultad"
            options={[]}
          />
        </IonCol>
      </IonRow>
      <IonRow
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <Field
          textarea
          form={form}
          name="requisitos_actividad"
          label="Requisitos y/o recomendaciones"
        />
      </IonRow>
      <IonRow>
        <GuiaForm />
      </IonRow>
      <IonRow>
        <IonCol
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <IonRow
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "13pt",
            }}
          >
            <h4
              style={{
                borderBottom: "2pt solid #F08408",
                padding: "2pt",
              }}
            >
              Pago anticipado
            </h4>
          </IonRow>
          <IonRow>
            <Field select form={form} name="" label="" options={[]} />
          </IonRow>
          <IonRow>
            <Field
              form={form}
              name="porcentaje_pago_anticipado"
              label="Porcentaje"
            />
          </IonRow>
        </IonCol>
        <IonCol
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <IonRow
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "13pt",
            }}
          >
            <h4
              style={{
                borderBottom: "2pt solid #F08408",
                padding: "2pt",
              }}
            >
              Política de cancelación
            </h4>
          </IonRow>
          <IonRow>
            <Field select form={form} name="" label="" options={[]} />
          </IonRow>
          <IonRow>
            <Field
              form={form}
              name="plazos_dias_cancelacion"
              label="Plazo de cancelación (en días)"
            />
          </IonRow>
        </IonCol>
        <IonCol
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <IonRow
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "13pt",
            }}
          >
            <h4
              style={{
                borderBottom: "2pt solid #F08408",
                padding: "2pt",
              }}
            >
              Métodos de pago
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
              {/* <div>
                {props.caracteristicas.caracteristicas_entretenimiento?.map(
                  (caracteristica: any) => (
                    <IonRow
                      style={{ margin: "3pt" }}
                      key={caracteristica.id_caracteristica}
                    >
                      <Check
                        list={props.formCaracteristicas}
                        id={caracteristica.id_caracteristica}
                        setList={props.setFormCaracteristicas}
                        label={caracteristica.caracteristica}
                      />
                    </IonRow>
                  )
                )}
              </div> */}
            </IonCol>
          </IonRow>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol style={{ width: "80%", marginLeft: "10%", marginRight: "10%" }}>
          <MultimediaUpload
            service={handleImageService}
            uploaded={datosRegistrados?.imagenes ?? []}
          />
        </IonCol>
      </IonRow>
      <IonRow
        style={{
          justifyContent: "space-around",
          marginTop: "10pt",
          marginBottom: "10pt",
        }}
      >
        <IonButton
          color="light"
          onClick={() => router && router.push("/my-offers")}
        >
          Volver
        </IonButton>
        <IonButton
          style={{
            "--background": "#F08408",
          }}
          onClick={() => handleGuardar()}
        >
          Guardar
        </IonButton>
      </IonRow>
    </IonGrid>
  );
}
