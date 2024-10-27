import { IonCol, IonRow } from "@ionic/react";
import Field from "../../../../components/Field/Field";
import { useForm } from "../../../../hooks/UseForm/FormProvider";

export default function DatosBasicosActividad(props: any) {
    const form = useForm();
    return (
        <div
            style={{
                padding: "10pt",
                paddingBottom: "20pt",
                marginBottom: "30pt",
                marginLeft: "10%",
                border: "2px solid #F08408",
                borderRadius: "10pt",
                width: "80%",
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
                <h3 style={{ fontWeight: "bold" }}>Datos básicos</h3>
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
        </div>
    );
}

