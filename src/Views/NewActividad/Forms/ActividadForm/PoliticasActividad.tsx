import {
    IonButton,
    IonCheckbox,
    IonCol,
    IonIcon,
    IonRow,
    IonTitle,
    IonSelect,
    IonSelectOption,
    IonItem,
    IonText
} from "@ionic/react";
import Field from "../../../../components/Field/Field";
import { useForm } from "../../../../hooks/UseForm/FormProvider";
import { Dispatch, SetStateAction, useState } from "react";
import Check from "../../../../components/Check/Check";

type TPoliticasActividad = {
    tipoPagoAnticipado: any;
    politicasDeCancelacion: any;
    metodosDePago: any;
    formMetodosDePago: number[];
    setFormMetodosDePago: Dispatch<SetStateAction<number[]>>;
};
export default function PoliticasActividad(props: TPoliticasActividad) {
    const form = useForm();
    const [todos, setTodos] = useState<boolean>(false);
    const [tipoPagoAnticipado, setTipoPagoAnticipado] = useState<number>();

    return (
        props.metodosDePago &&
        props.tipoPagoAnticipado &&
        props.politicasDeCancelacion && (
            <div
                style={{
                    padding: "10pt",
                    paddingBottom: "20pt",
                    marginBottom: "30pt",
                    width: "80%",
                    marginLeft: "10%",
                    border: "2px solid #F08408",
                    borderRadius: "10pt",
                }}
            >
                <IonRow
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignContent: "center",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "10pt",
                    }}
                >
                    <h3 style={{ fontWeight: "bold" }}>
                        Políticas de reserva
                    </h3>
                </IonRow>
                <IonCol>
					<IonCol>
						<IonRow
							style={{
								display: "flex",
								flexDirection: "column",
								alignContent: "center",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<h4
								style={{
									borderBottom: "2pt solid #F08408",
									padding: "2pt",
									marginBottom: "31pt",
								}}
							>
								Pago anticipado
							</h4>
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
							<div>
								<IonRow>
									<IonItem>
										<IonSelect
											label="Tipo de pago"
											onIonChange={(e) =>
												setTipoPagoAnticipado(
													e.target.value
												)
											}
										>
											{props.tipoPagoAnticipado.map(
												(tipo: any) => (
													<IonSelectOption
                                                        key={tipo.id_tipo_pago_anticipado}
														value={
															tipo.id_tipo_pago_anticipado
														}
													>
														{
															tipo.tipo_pago_anticipado
														}
													</IonSelectOption>
												)
											)}
										</IonSelect>
									</IonItem>
								</IonRow>
								<IonRow>
									{tipoPagoAnticipado == 1 && (
										<Field
											form={form}
											name="porcentaje_pago_anticipado"
											label="Porcentaje"
										/>
									)}
									{tipoPagoAnticipado == 2 && (
										<Field
											form={form}
											name="monto_pago_anticipado"
											label="Monto"
										/>
									)}
								</IonRow>
							</div>
						</IonRow>
					</IonCol>
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
                                    value={
                                        form?.schema.id_politica_cancelacion
                                    }
                                    select
                                    options={props.politicasDeCancelacion.map(
                                        (politica: any) => ({
                                            id: politica.id_politica_cancelacion,
                                            text: politica.politica_cancelacion,
                                        })
                                    )}
                                    form={form}
                                    name="id_politica_cancelacion"
                                    label="Tipo de política"
                                />
                            </IonRow>
                            <IonRow>
                                <Field
                                    value={
                                        form?.schema.plazo_dias_cancelacion
                                    }
                                    form={form}
                                    name="plazo_dias_cancelacion"
                                    label="Plazo de cancelación (días)"
                                />
                            </IonRow>
                        </IonCol>
                    </IonRow>
                </IonCol>
                <IonCol>
                    <IonRow
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignContent: "center",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <h4
                            style={{
                                borderBottom: "2pt solid #F08408",
                                padding: "2pt",
                                marginBottom: "31pt",
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
                            <IonRow style={{ marginBottom: "13pt" }}>
                                <IonText>
                                    Seleccioná los métodos de pago aceptados
                                    en el alojamiento
                                </IonText>
                            </IonRow>
                            <div>
                                <IonRow>
                                    <IonCheckbox
                                        labelPlacement="end"
                                        style={{ margin: "3pt" }}
                                        onIonChange={(e) =>
                                            setTodos(e.target.checked)
                                        }
                                    >
                                        Todos
                                    </IonCheckbox>
                                </IonRow>
                                {props.metodosDePago?.map((metodo: any) => (
                                    <IonRow
                                        style={{ margin: "3pt" }}
                                        key={metodo.id_metodo_pago}
                                    >
                                        <Check
                                            list={props.formMetodosDePago}
                                            forceChecked={todos}
                                            id={metodo.id_metodo_pago}
                                            setList={
                                                props.setFormMetodosDePago
                                            }
                                            label={metodo.metodo_pago}
                                        />
                                    </IonRow>
                                ))}
                            </div>
                        </IonCol>
                    </IonRow>
                </IonCol>
            </div>
        )
    );
}
