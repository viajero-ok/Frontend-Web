import { IonButton, IonCol, IonGrid, IonRow, useIonRouter } from "@ionic/react";
import { useForm } from "../../../../../hooks/UseForm/FormProvider";

import { useEffect, useState } from "react";
import {
	getDatosDeRegistroNuevoAlojamiento,
	guardarAlojamiento,
	guardarImagenDeAlojamiento,
	obtenerDatosRegistradosAlojamiento,
	TBodyGuardarAlojamiento,
	THorariosCheckInCheckOut,
} from "../../../../../App/Alojamientos/NuevoAlojamiento";
import MultimediaUpload from "../../../../../components/MultimediaUpload/MultimediaUpload";
import ComodidadesServicios from "./ComodidadesServicios";
import DatosBasicos from "./DatosBasicos";
import PoliticasNormas from "./PoliticasNormas";
import Reservas from "./Reservas";

type TAlojamientoForm = {
	id: string;
};
export default function AlojamientoForm(props: TAlojamientoForm) {
	const [caracteristicas, setCaracteristicas] = useState<any>();
	const [politicasDeCancelacion, setPoliticasDeCancelacion] = useState<any>();
	const [tiposPagoAnticipado, setTiposPagoAnticipado] = useState<any>();
	const [metodosDePago, setMetodosDePago] = useState<any>();

	const [datosRegistrados, setDatosRegistrados] = useState<any>();

	const [formCaracteristicas, setFormCaracteristicas] = useState<number[]>(
		[]
	);
	const [formMetodosDePago, setFormMetodosDePago] = useState<number[]>([]);
	const [formHorarios, setFormHorarios] = useState<
		THorariosCheckInCheckOut[]
	>([]);
	const router = useIonRouter();
	const form = useForm();

	const handleGuardar = () => {
		if (!form) return;

		const s = form.schema;
		let body: TBodyGuardarAlojamiento = {
			id_oferta: props.id,
			caracteristicas: formCaracteristicas,
			metodos_de_pago: formMetodosDePago,
			observaciones: {
				texto_observacion_comodidades_y_servicios_oferta: "",
				texto_observacion_canchas_deportes: "",
				texto_observacion_normas: "",
				texto_observacion_politica_garantia: "",
			},
			politicas_reserva_y_datos_basicos: {
				datos_basicos: {
					id_tipo_oferta: 0,
					id_sub_tipo_oferta: 0,
					id_establecimiento: 0,
					nombre_alojamiento: s.nombre_alojamiento,
					descripcion_alojamiento: s.descripcion_alojamiento,
				},
				politicas_reserva: {
					id_politica_cancelacion: s.id_politica_cancelacion,
					plazo_dias_cancelacion: parseInt(s.plazo_dias_cancelacion),
					solicita_garantia: false,
					monto_garantia: 0.0, // float
					id_tipo_pago_anticipado: 1,
					porcentaje_pago_anticipado: 0.0, // float
					monto_pago_anticipado: 0.0, // float
					minimo_dias_estadia: parseInt(s.minimo_dias_estadia),
				},
			},
			check_in_out: formHorarios,
		};
		guardarAlojamiento(body)
			.then((response) => {
				console.log("response: ", response);
			})
			.catch(() => {});
	};

	const handleImageService = (file: File) => {
		console.log("file service: ", file);
		return guardarImagenDeAlojamiento({
			imagen: file,
			id_oferta: props.id,
		});
	};

	useEffect(() => {
		getDatosDeRegistroNuevoAlojamiento()
			.then((response: any) => {
				setCaracteristicas(response.data.caracteristicas);
				setPoliticasDeCancelacion(response.data.politicas_cancelacion);
				setTiposPagoAnticipado(response.data.tipos_pago_anticipado);
				setMetodosDePago(response.data.metodos_pago);
			})
			.catch((error: any) => {});
	}, []);

	useEffect(() => {
		obtenerDatosRegistradosAlojamiento(props.id).then((response: any) => {
			setDatosRegistrados(response.data.datos);
		});
	}, []);

	useEffect(() => {
		if (!datosRegistrados) return;
		if (!form) return;

		// Establecer los valores del formulario con los datos registrados
		form.setValue("nombre_alojamiento", datosRegistrados.datos_basicos.nombre);
		form.setValue("descripcion_alojamiento", datosRegistrados.datos_basicos.descripcion);
		
		// Establecer observaciones
		form.setValue("texto_observacion_comodidades_y_servicios_oferta", datosRegistrados.observaciones?.texto_observacion_comodidades_y_servicios_oferta || "");
		form.setValue("texto_observacion_canchas_deportes", datosRegistrados.observaciones?.texto_observacion_canchas_deportes || "");
		form.setValue("texto_observacion_normas", datosRegistrados.observaciones?.texto_observacion_normas || "");
		form.setValue("texto_observacion_politica_garantia", datosRegistrados.observaciones?.texto_observacion_politica_garantia || "");
		
		// Verificar si politicas_reserva está definido antes de acceder a sus propiedades
		if (datosRegistrados.politicas_reserva) {
			form.setValue("id_politica_cancelacion", datosRegistrados.politicas_reserva.id_politica_cancelacion);
			form.setValue("plazo_dias_cancelacion", datosRegistrados.politicas_reserva.plazo_dias_cancelacion);
			form.setValue("solicita_garantia", datosRegistrados.politicas_reserva.solicita_garantia);
			form.setValue("monto_garantia", datosRegistrados.politicas_reserva.monto_garantia);
			form.setValue("id_tipo_pago_anticipado", datosRegistrados.politicas_reserva.id_tipo_pago_anticipado);
			form.setValue("porcentaje_pago_anticipado", datosRegistrados.politicas_reserva.porcentaje_pago_anticipado);
			form.setValue("monto_pago_anticipado", datosRegistrados.politicas_reserva.monto_pago_anticipado);
			form.setValue("minimo_dias_estadia", datosRegistrados.politicas_reserva.minimo_dias_estadia);
		}
	}, [datosRegistrados]);

	return (
		<IonGrid style={{}}>
			<DatosBasicos />
			<ComodidadesServicios
				caracteristicas={caracteristicas}
				formCaracteristicas={formCaracteristicas}
				setFormCaracteristicas={setFormCaracteristicas}
			/>
			<PoliticasNormas
				idOferta={props.id}
				caracteristicas={caracteristicas}
				formCaracteristicas={formCaracteristicas}
				setFormCaracteristicas={setFormCaracteristicas}
				politicasDeCancelacion={politicasDeCancelacion}
				horarios={formHorarios}
				setHorarios={setFormHorarios}
			/>
			<Reservas
				tipoPagoAnticipado={tiposPagoAnticipado}
				formMetodosDePago={formMetodosDePago}
				metodosDePago={metodosDePago}
				setFormMetodosDePago={setFormMetodosDePago}
			/>
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
