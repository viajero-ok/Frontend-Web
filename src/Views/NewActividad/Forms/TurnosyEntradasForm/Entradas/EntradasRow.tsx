import {
	IonButton,
	IonCheckbox,
	IonCol,
	IonIcon,
	IonInput,
	IonItem,
	IonLabel,
	IonRow,
	IonPopover,
} from "@ionic/react";
import Field from "../../../../../components/Field/Field";
import { useForm } from "../../../../../hooks/UseForm/FormProvider";
import { add, trash, helpCircle } from "ionicons/icons";
import { Dispatch, SetStateAction, useState } from "react";
import { useMaskito } from "@maskito/react";
import { maskitoTimeOptionsGenerator } from "@maskito/kit";
import { eliminarEntrada } from "../../../../../App/Actividades/TurnosyHorarios";

type TRowData = {
	entradas: [
		{
			id_entrada: number;
			nombre: string;
			descripcion: string;
		},
	];
};

type TEntradasRow = {
	setRows: Dispatch<SetStateAction<any[]>>;
	id: number;
};
export default function EntradasRow(props: TEntradasRow) {
	const [showTooltip, setShowTooltip] = useState<boolean>(false);
	const [data, setData] = useState<TRowData>({
		entradas: [
			{
				id_entrada: props.id,
				nombre: "",
				descripcion: "",
			},
		],
	});

	const handleEliminar = () => {
		eliminarEntrada(props.id)
			.then((response: any) => {
				props.setRows((prev: any[]) => [
					...prev.filter((row: any) => row.id_entrada != props.id),
				]);
			})
			.catch((_) => { });
	};

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
						<IonItem>{/* 
							<IonLabel>Nombre de Entrada</IonLabel> */}
							<IonInput
								label="Nombre de Entrada"
								style={{ textAlign: "center" }}
							/>
							{/* <IonIcon icon={helpCircle} slot="end"
								onMouseEnter={() => {
									setShowTooltip(true);
								}}
								onMouseLeave={() => {
									setShowTooltip(false);
								}}
								style={{ cursor: "pointer" }}
							/>
							<IonPopover
								isOpen={showTooltip}
								side="top"
								onDidDismiss={() => setShowTooltip(false)}
							>
								Ingresá el nombre de la entrada, por ejemplo: "Entrada General"

							</IonPopover> */}
						</IonItem>
					</IonCol>
					<IonCol>
						<IonItem>
							<IonInput
								label="¿Qué incluye?"
								style={{ textAlign: "center" }}
								placeholder="¿Qué incluye?"
							/>
						</IonItem>
					</IonCol>
				</IonRow>
			</IonCol>
		</IonRow>
	);
}
