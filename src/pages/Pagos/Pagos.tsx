import React, { Component } from "react";
import { autorizarPago } from "../../App/Pagos/Pagos";
import { IonContent, IonPage, useIonRouter } from "@ionic/react";

const Pagos: React.FC = () => {
	const handleAutorizarPago = async () => {
		const response = await autorizarPago();
		console.log(response);
		push(response.url);
	};

	const router = useIonRouter();

	const push = (uri: string) => {
		if (!router) return;
		router.push(uri);
	};

	return (
		<IonPage>
			<IonContent>
				<div>
					<button onClick={handleAutorizarPago}>
						Autorizar pago
					</button>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default Pagos;
