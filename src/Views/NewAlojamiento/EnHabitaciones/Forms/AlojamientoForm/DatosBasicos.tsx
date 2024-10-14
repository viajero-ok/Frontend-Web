import { IonCol, IonRow } from "@ionic/react";
import Field from "../../../../../components/Field/Field";
import { useForm } from "../../../../../hooks/UseForm/FormProvider";

export default function DatosBasicos(props: any) {
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
				<IonCol>
					<Field
						form={form}
						name="nombre_alojamiento"
						label="Nombre"
					/>
					<Field
						textarea
						rows={4}
						maxLength={200}
						form={form}
						name="descripcion_alojamiento"
						label="Descripción"
					/>
				</IonCol>
			</IonRow>
		</div>
	);
}
