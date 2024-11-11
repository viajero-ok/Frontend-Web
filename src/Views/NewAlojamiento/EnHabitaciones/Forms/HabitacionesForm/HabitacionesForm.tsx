import { IonButton, IonCol, IonGrid, IonModal, IonRow, useIonRouter, IonIcon } from "@ionic/react";
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
	const [openConfirm, setOpenConfirm] = useState<boolean>(false);
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
			.catch(() => { });
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
					onClick={() => setOpenConfirm(true)}
				>
					Registrar
				</IonButton>
				<IonModal
					isOpen={openConfirm}
					onDidDismiss={() => setOpenConfirm(false)}
					style={{ "--height": "fit-content" }}
				>
					<div className="wrapper">
						<IonGrid
							style={{ display: "flex", flexDirection: "column", flexGrow: 0 }}
						>
							<IonRow>
							<h4 style={{ paddingLeft: "31%",fontWeight: "bold" }}>¡Alojamiento registrado!</h4>
								<IonCol style={{ display: "flex", justifyContent: "right" }}>
									<IonButton
										size="small"
										fill="clear"
										onClick={() => setOpenConfirm(false)}
									>
										{/* <IonIcon icon={close} /> */}
									</IonButton>
								</IonCol>
							</IonRow>
							<IonRow style={{ justifyContent: "center", padding: "8pt" }}>
								<h3>El alojamiento se registró con éxito.</h3>
							</IonRow>
							<IonRow
								style={{
									justifyContent: "right",
									padding: "8pt",
									paddingTop: "0",
								}}
							>
								<IonButton 
								style={{ marginLeft: "1rem", "--background": "#F08408", "--color": "white", "--border-color": "#F08408", "--border-style": "solid", "--border-width": "1px"}}
								onClick={() => {
									router && router.push("/my-offers");
									setOpenConfirm(false);}}>
									Aceptar
								</IonButton>

							</IonRow>
						</IonGrid>
					</div>
				</IonModal>
				{/* <IonButton
					style={{
						"--background": "#F08408",
					}}
				>
					Guardar
				</IonButton> */}
			</IonRow>
		</IonGrid>
	);
}
