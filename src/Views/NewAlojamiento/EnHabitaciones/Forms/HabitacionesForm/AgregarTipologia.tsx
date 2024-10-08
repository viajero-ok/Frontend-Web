import {
	IonButton,
	IonCol,
	IonGrid,
	IonIcon,
	IonInput,
	IonItem,
	IonRow,
} from "@ionic/react";
import { add, trash } from "ionicons/icons";
import { Dispatch, SetStateAction, useState } from "react";
import { crearHabitacion } from "../../../../../App/Alojamientos/Habitacion";

type TAgregarTipologia = {
	handleObtenerDatos: () => void;
	setHabitacionSelected: Dispatch<SetStateAction<any>>;
	setHabitaciones: Dispatch<SetStateAction<any>>;
	habitaciones: any[];
	id: string;
};
export default function AgregarTipologia(props: TAgregarTipologia) {
	const handleAgregar = () => {
		crearHabitacion(props.id).then((response: any) =>
			props.handleObtenerDatos()
		);
	};

	return (
		<div
			style={{
				border: "2pt solid #F08408",
				borderRadius: "8pt",
				paddingTop: "13pt",
				width: "80%",
				marginLeft: "10%",
				marginRight: "10%",
				marginBottom: "20pt",
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
				<h3 style={{ fontWeight: "bold" }}>Tipologías</h3>
			</IonRow>
			<IonRow>
				<IonCol
					style={{
						display: "flex",
						alignContent: "center",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<IonButton
						style={{ "--background": "#F08408" }}
						onClick={() => handleAgregar()}
					>
						<IonIcon icon={add} />
						&nbsp;AGREGAR NUEVA TIPOLOGÍA
					</IonButton>
				</IonCol>
			</IonRow>
			<IonRow>
				<IonGrid
					style={{
						borderRadius: "8pt",
						margin: "31pt",
						marginLeft: "60pt",
						marginRight: "60pt",
						paddingLeft: "31pt",
						paddingRight: "31pt",
						padding: "31pt",
					}}
				>
					<IonRow>
						<IonCol
							style={{
								display: "flex",
								alignContent: "center",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<h4 style={{ fontWeight: "bold" }}>
								Nombre Tipología
							</h4>
						</IonCol>
						<IonCol
							style={{
								display: "flex",
								alignContent: "center",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<h4 style={{ fontWeight: "bold" }}>Cantidad</h4>
						</IonCol>
					</IonRow>
					{props.habitaciones.map((habitacion: any, index: any) => (
						<IonRow
							key={index}
							style={{
								backgroundColor: "#F084084D",
								margin: "6pt",
								borderRadius: "8pt",
								cursor: "pointer",
							}}
							onClick={() =>
								props.setHabitacionSelected(
									habitacion.id_tipo_detalle
								)
							}
						>
							<IonCol
								style={{
									display: "flex",
									alignContent: "center",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								{habitacion.tipo_detalle ?? "Sin nombre"}
							</IonCol>
							<IonCol
								style={{
									display: "flex",
									alignContent: "center",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								{habitacion.cantidad ?? 0}
							</IonCol>
						</IonRow>
					))}
				</IonGrid>
			</IonRow>
		</div>
	);
}
