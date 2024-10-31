import {
	IonButton,
	IonCheckbox,
	IonCol,
	IonIcon,
	IonInput,
	IonItem,
	IonRow,
} from "@ionic/react";
import Field from "../../../../../components/Field/Field";
import { useForm } from "../../../../../hooks/UseForm/FormProvider";
import { add, trash } from "ionicons/icons";
import { Dispatch, SetStateAction, useState } from "react";
import { useMaskito } from "@maskito/react";
import { maskitoTimeOptionsGenerator } from "@maskito/kit";
import { eliminarHorario } from "../../../../../App/Actividades/TurnosyHorarios";

type TRowData = {
	id_horario: number;
	inicio: {
		hora_inicio: string;
		minuto_inicio: string;
	};
	fin: {
		hora_fin: string;
		minuto_fin: string;
	};
	aplica_todos_los_dias: boolean;
	dias_semana: {
		aplica_lunes: boolean;
		aplica_martes: boolean;
		aplica_miercoles: boolean;
		aplica_jueves: boolean;
		aplica_viernes: boolean;
		aplica_sabado: boolean;
		aplica_domingo: boolean;
	};
	sin_cupo: boolean;
	cupo_maximo: number;
};

type TTurnosRow = {
	setRows: Dispatch<SetStateAction<any[]>>;
	id: number;
};
export default function TurnosRow(props: TTurnosRow) {
	const [data, setData] = useState<TRowData>({
		id_horario: props.id,
		inicio: {
			hora_inicio: "",
			minuto_inicio: "",
		},
		fin: {
			hora_fin: "",
			minuto_fin: "",
		},
		aplica_todos_los_dias: false,
		dias_semana: {
			aplica_lunes: false,
			aplica_martes: false,
			aplica_miercoles: false,
			aplica_jueves: false,
			aplica_viernes: false,
			aplica_sabado: false,
			aplica_domingo: false,
		},
		sin_cupo: false,
		cupo_maximo: 0,
	});

	const handleEliminar = () => {
		eliminarHorario({ id_horario: props.id })
			.then((response: any) => {
				props.setRows((prev: any[]) => [
					...prev.filter((row: any) => row.id_horario != props.id),
				]);
			})
			.catch((_) => { });
	};

	const horaInicioMask = useMaskito({
		options: maskitoTimeOptionsGenerator({
			mode: "HH:MM",
			step: 1,
		}),
	});
	const horaFinMask = useMaskito({
		options: maskitoTimeOptionsGenerator({
			mode: "HH:MM",
			step: 1,
		}),
	});

	return (
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
						<IonItem>
							<IonInput
								style={{ textAlign: "center" }}
								placeholder="Hora Inicio"
								ref={async (cardRef) => {
									if (cardRef) {
										const input =
											await cardRef.getInputElement();
										horaInicioMask(input);
									}
								}}
							/>
						</IonItem>
					</IonCol>
					<IonCol>
						<IonItem>
							<IonInput
								style={{ textAlign: "center" }}
								placeholder="Hora Fin"
								ref={async (cardRef) => {
									if (cardRef) {
										const input =
											await cardRef.getInputElement();
										horaFinMask(input);
									}
								}}
							/>
						</IonItem>
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
						<IonCheckbox
							labelPlacement="stacked"
							style={{ margin: "3pt" }}
						>
							L
						</IonCheckbox>
						<IonCheckbox
							labelPlacement="stacked"
							style={{ margin: "3pt" }}
						>
							M
						</IonCheckbox>
						<IonCheckbox
							labelPlacement="stacked"
							style={{ margin: "3pt" }}
						>
							M
						</IonCheckbox>
						<IonCheckbox
							labelPlacement="stacked"
							style={{ margin: "3pt" }}
						>
							J
						</IonCheckbox>
						<IonCheckbox
							labelPlacement="stacked"
							style={{ margin: "3pt" }}
						>
							V
						</IonCheckbox>
						<IonCheckbox
							labelPlacement="stacked"
							style={{ margin: "3pt" }}
						>
							S
						</IonCheckbox>
						<IonCheckbox
							labelPlacement="stacked"
							style={{ margin: "3pt" }}
						>
							D
						</IonCheckbox>
					</div>
				</IonRow>
			</IonCol>
			<IonCol>
				<IonItem>
					{/* <Field
						value={data.sin_cupo}
						form={form}
						name="sin_cupo"
						label="Sin Cupo"
					/> */}
				</IonItem>
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
					<IonButton color="danger" onClick={() => handleEliminar()}>
						<IonIcon icon={trash} />
					</IonButton>
				</IonRow>
				{/* <h3>id: {props.id}</h3> */}
			</IonCol>
		</IonRow>
	);
}
