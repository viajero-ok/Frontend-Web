import {
	IonButton,
	IonCol,
	IonIcon,
	IonInput,
	IonItem,
	IonRow,
	IonTextarea,
	IonToggle,
} from "@ionic/react";
import { trash } from "ionicons/icons";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
	eliminarHabitacion,
	guardarHabitacion,
	guardarImagenDeHabitacion,
	obtenerDatosRegistroHabitacion,
	TBodyGuardarHabitacion,
} from "../../../../../App/Alojamientos/Habitacion";
import Check from "../../../../../components/Check/Check";
import MultimediaUpload from "../../../../../components/MultimediaUpload/MultimediaUpload";

type THabitacion = {
	habitacion: any;
	habitacionSelected: any;
	setHabitacionSelected: Dispatch<SetStateAction<any>>;
	setHabitaciones: Dispatch<SetStateAction<any>>;
	idOferta: string;
	handleObtenerDatosRegistrados: () => void;
	datosRegistro: any;
};
export default function Habitacion(props: THabitacion) {
	const [formCaracteristicas, setFormCaracteristicas] = useState<number[]>(
		[]
	);
	const [nombre, setNombre] = useState<string>(props.habitacion.tipo_detalle);
	const [cantidad, setCantidad] = useState<number>(props.habitacion.cantidad);
	const [plazas, setPlazas] = useState<
		{ id_tipo_cama: number; cantidad_camas: number }[]
	>([
		{ id_tipo_cama: 1, cantidad_camas: 0 },
		{ id_tipo_cama: 2, cantidad_camas: 0 },
		{ id_tipo_cama: 3, cantidad_camas: 0 },
	]);
	const [cantidadBaños, setCantidadBaños] = useState<number>();
	const [esBañoCompartido, setEsBañoCompartido] = useState<boolean>();
	const [esAdaptado, setEsAdaptado] = useState<boolean>();
	const [observaciones, setObservaciones] = useState<string>();

	const handleEliminar = () => {
		eliminarHabitacion(props.habitacionSelected).then(() => {
			props.setHabitaciones((prev: any[]) => [
				...prev.filter(
					(row: any) =>
						row.id_tipo_detalle != props.habitacionSelected
				),
			]);
			props.setHabitacionSelected(null);
		});
	};

	const handleGuardar = () => {
		const body: TBodyGuardarHabitacion = {
			id_oferta: props.idOferta,
			id_tipo_detalle: props.habitacionSelected,
			tipologia: {
				nombre_tipologia: nombre ?? "",
				cantidad: cantidad ?? 0,
			},
			plazas: plazas,
			baño: {
				cantidad_baños: cantidadBaños ?? 0,
				bl_baño_compartido: esBañoCompartido ?? false,
				bl_baño_adaptado: esAdaptado ?? false,
			},
			caracteristicas: formCaracteristicas,
			observaciones: {
				texto_observacion_comodidades_y_servicios_habitacion:
					"La habitación cuenta con aire acondicionado.",
			},
		};
		guardarHabitacion(body)
			.then(() => {
				props.handleObtenerDatosRegistrados();
			})
			.catch(() => { });
	};

	const handleImageService = (file: File) => {
		return guardarImagenDeHabitacion({
			imagen: file,
			id_oferta: props.idOferta,
			id_tipo_detalle: props.habitacionSelected,
		});
	};

	useEffect(() => {
		setNombre(props.habitacion.tipo_detalle);
		setCantidad(props.habitacion.cantidad);
		setFormCaracteristicas(
			props.habitacion.caracteristicas.map(
				(caracteristica: any) => caracteristica.id_caracteristica
			)
		);
		setCantidadBaños(props.habitacion.cantidad_baños);
		setEsBañoCompartido(props.habitacion.bl_baño_compartido);
		setEsAdaptado(props.habitacion.bl_baño_adaptado);
		setPlazas((prev: any) => {
			const copy = [...prev];
			if (props.habitacion.plazas.length == 0) return copy;
			copy[0].cantidad_camas = props.habitacion.plazas[0].cantidad_camas;
			copy[1].cantidad_camas = props.habitacion.plazas[1].cantidad_camas;
			copy[2].cantidad_camas = props.habitacion.plazas[2].cantidad_camas;
			return copy;
		});
	}, [props.habitacion]);

	return (
		<div
			style={{
				border: "2pt solid #F08408",
				borderRadius: "8pt",
				width: "80%",
				marginLeft: "10%",
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
				<h3 style={{ fontWeight: "bold" }}>Editar tipología</h3>
			</IonRow>
			<IonRow
				style={{
					border: "1pt solid #F08408",
					borderRadius: "8pt",
					width: "50%",
					position: "relative",
					left: "50%",
					transform: "translateX(-50%)",
					padding: "13pt",
					margin: "8pt",
				}}
			>
				<IonCol
					style={{
						display: "flex",
						alignContent: "center",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<IonItem>
						<IonInput
							value={nombre}
							placeholder="Nombre de la tipología"
							onIonInput={(e: any) => setNombre(e.target.value)}
						/>
					</IonItem>
				</IonCol>
				<IonCol
					style={{
						display: "flex",
						alignContent: "center",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<IonInput
						style={{ borderBottom: "1pt solid #F08408" }}
						value={cantidad}
						label="Cantidad"
						type="number"
						onIonInput={(e: any) =>
							setCantidad(parseInt(e.target.value))
						}
					/>
				</IonCol>
			</IonRow>
			<IonRow>
				<IonCol>
					{/* Sección de Plazas */}
					<IonRow
						style={{
							display: "flex",
							alignContent: "center",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<h3 style={{ fontWeight: "bold" }}>Plazas</h3>
					</IonRow>
					<IonRow
						style={{
							borderTop: "1pt solid #F08408",
							width: "50%",
							position: "relative",
							left: "50%",
							transform: "translateX(-50%)",
							padding: "13pt",
							margin: "8pt",
						}}
					>
						<IonCol>
							<IonRow
								style={{
									display: "flex",
									alignContent: "center",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<IonCol>Cama doble</IonCol>
								<IonCol>
									<IonInput
										style={{
											borderBottom: "1pt solid #F08408",
										}}
										type="number"
										placeholder="Cantidad"
										value={plazas[0].cantidad_camas}
										onIonInput={(e: any) =>
											setPlazas((prev: any) => {
												const copy = [...prev];
												copy[0].cantidad_camas =
													parseInt(e.target.value);
												return copy;
											})
										}
									/>
								</IonCol>
							</IonRow>
							<IonRow
								style={{
									display: "flex",
									alignContent: "center",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<IonCol>Cama individual</IonCol>
								<IonCol>
									<IonInput
										style={{
											borderBottom: "1pt solid #F08408",
										}}
										type="number"
										placeholder="Cantidad"
										value={plazas[1].cantidad_camas}
										onIonInput={(e: any) =>
											setPlazas((prev: any) => {
												const copy = [...prev];
												copy[1].cantidad_camas =
													parseInt(e.target.value);
												return copy;
											})
										}
									/>
								</IonCol>
							</IonRow>
							<IonRow
								style={{
									display: "flex",
									alignContent: "center",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<IonCol>Sofá-cama</IonCol>
								<IonCol>
									<IonInput
										style={{
											borderBottom: "1pt solid #F08408",
										}}
										type="number"
										placeholder="Cantidad"
										value={plazas[2].cantidad_camas}
										onIonInput={(e: any) =>
											setPlazas((prev: any) => {
												const copy = [...prev];
												copy[2].cantidad_camas =
													parseInt(e.target.value);
												return copy;
											})
										}
									/>
								</IonCol>
							</IonRow>
							<IonRow
								style={{
									display: "flex",
									alignContent: "center",
									alignItems: "center",
									justifyContent: "center",
									marginTop: "13pt",
								}}
							>
								<IonCol style={{ marginTop: "13pt", fontWeight: "bold" }}>
									Total de plazas
								</IonCol>
								<IonCol style={{ borderBottom: "1pt solid #F08408", fontWeight: "bold", marginTop: "13pt" }}>
									{plazas.reduce(
										(partialSum, a) =>
											partialSum + (a.id_tipo_cama === 1 ? a.cantidad_camas * 2 : a.cantidad_camas),
										0
									)}
								</IonCol>
							</IonRow>
						</IonCol>
					</IonRow>

					{/* Sección de Baños */}
					<IonRow
						style={{
							display: "flex",
							alignContent: "center",
							alignItems: "center",
							justifyContent: "center",
							marginTop: "20pt",
						}}
					>
						<h3 style={{ fontWeight: "bold" }}>Baños</h3>
					</IonRow>
					<IonRow
						style={{
							borderTop: "1pt solid #F08408",
							width: "50%",
							position: "relative",
							left: "50%",
							transform: "translateX(-50%)",
							padding: "13pt",
							margin: "8pt",
						}}
					>
						<IonCol>
							<IonRow
								style={{
									display: "flex",
									alignContent: "center",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<IonInput
									style={{
										borderBottom: "1pt solid #F08408",
									}}
									value={cantidadBaños}
									type="number"
									label="Cantidad"
									onIonInput={(e: any) =>
										setCantidadBaños(
											parseInt(e.target.value)
										)
									}
								/>
							</IonRow>
							<IonRow
								style={{
									display: "flex",
									alignContent: "flex-start",
									alignItems: "flex-start",
									justifyContent: "flex-start",
									padding: "13pt 0",
								}}
							>
								<IonToggle
									checked={esBañoCompartido}
									onIonChange={(e: any) =>
										setEsBañoCompartido(e.target.checked)
									}
								>
									Es baño compartido
								</IonToggle>
							</IonRow>
							<IonRow
								style={{
									display: "flex",
									alignContent: "flex-start",
									alignItems: "flex-start",
									justifyContent: "flex-start",
									padding: "0 0 13pt 0",
								}}
							>
								<IonToggle
									checked={esAdaptado}
									onIonChange={(e: any) =>
										setEsAdaptado(e.target.checked)
									}
								>
									Adaptado a personas con movilidad reducida
								</IonToggle>
							</IonRow>
						</IonCol>
					</IonRow>
				</IonCol>
			</IonRow>
			<IonRow
				style={{
					display: "flex",
					alignContent: "center",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<h4 style={{ fontWeight: "bold" }}>Comodidades y servicios</h4>
			</IonRow>
			<IonRow
				style={{
					borderTop: "1pt solid #F08408",
					width: "50%",
					position: "relative",
					left: "50%",
					transform: "translateX(-50%)",
					padding: "13pt",
					margin: "8pt",
					justifyContent: "space-between",
				}}
			>
				<IonCol
					style={{
						display: "flex",
						alignContent: "center",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<div>
						{props.datosRegistro &&
							props.datosRegistro.caracteristicas_habitaciones?.map(
								(caracteristica: any) => (
									<IonRow
										style={{ margin: "3pt" }}
										key={caracteristica.id_caracteristica}
									>
										<Check
											list={formCaracteristicas}
											id={
												caracteristica.id_caracteristica
											}
											setList={setFormCaracteristicas}
											label={
												caracteristica.caracteristica
											}
										/>
									</IonRow>
								)
							)}
					</div>
				</IonCol>
				<IonCol>
					<IonRow
						style={{
							display: "flex",
							alignContent: "center",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<IonTextarea
							rows={4}
							maxlength={200}
							name="otras"
							label="Otras"
						/>
					</IonRow>
				</IonCol>
			</IonRow>
			<IonRow>
				<IonCol style={{ paddingLeft: "100pt", paddingRight: "100pt" }}>
					<MultimediaUpload
						service={handleImageService}
						uploaded={props.habitacion?.imagenes ?? []}
					/>
				</IonCol>
			</IonRow>
			<IonRow
				style={{
					display: "flex",
					alignContent: "space-around",
					alignItems: "center",
					justifyContent: "space-around",
					padding: "13pt",
				}}
			>
				<IonButton
					style={{ "--background": "white", color: "#F08408" }}
					onClick={() => handleEliminar()}
				>
					<IonIcon icon={trash} /> Eliminar
				</IonButton>
				<IonButton
					style={{ "--background": "#F08408" }}
					onClick={() => handleGuardar()}
				>
					Guardar
				</IonButton>
			</IonRow>
		</div>
	);
}
