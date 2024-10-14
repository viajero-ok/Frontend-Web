import { IonButton, IonCol, IonGrid, IonRow, useIonRouter } from "@ionic/react";
import AgregarTipologia from "./AgregarTipologia";
import Habitacion from "./Habitacion";
import { useEffect, useState } from "react";
import {
	guardarImagenDeHabitacion,
	obtenerDatosRegistradosHabitacion,
	obtenerDatosRegistroHabitacion,
} from "../../../../../App/Alojamientos/Habitacion";
import MultimediaUpload from "../../../../../components/MultimediaUpload/MultimediaUpload";

type THabitacionesForm = {
	id: string;
};
export default function HabitacionesForm(props: any) {
	const [habitacionSelected, setHabitacionSelected] = useState<any>();
	const [habitacionesList, setHabitacionesList] = useState<any[]>([]);
	const [datosRegistro, setDatosRegistro] = useState<any>();
	const router = useIonRouter();
	const handleObtenerDatosRegistrados = () => {
		obtenerDatosRegistradosHabitacion(props.id).then((response: any) => {
			setHabitacionesList(response.data.datos);
		});
	};

	useEffect(() => {
		obtenerDatosRegistroHabitacion()
			.then((response: any) => {
				setDatosRegistro(response.data);
			})
			.catch(() => {});
		handleObtenerDatosRegistrados();
	}, []);

	return (
		<IonGrid style={{}}>
			<AgregarTipologia
				setHabitacionSelected={setHabitacionSelected}
				habitaciones={habitacionesList}
				setHabitaciones={setHabitacionesList}
				id={props.id}
				handleObtenerDatos={handleObtenerDatosRegistrados}
			/>
			{habitacionSelected &&
				habitacionesList.filter(
					(habitacion: any) =>
						habitacion.id_tipo_detalle == habitacionSelected
				)[0] && (
					<Habitacion
						habitacion={
							habitacionesList.filter(
								(habitacion: any) =>
									habitacion.id_tipo_detalle ==
									habitacionSelected
							)[0]
						}
						habitacionSelected={habitacionSelected}
						setHabitacionSelected={setHabitacionSelected}
						setHabitaciones={setHabitacionesList}
						idOferta={props.id}
						handleObtenerDatosRegistrados={
							handleObtenerDatosRegistrados
						}
						datosRegistro={datosRegistro}
					/>
				)}
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
				>
					Guardar
				</IonButton>
			</IonRow>
		</IonGrid>
	);
}
