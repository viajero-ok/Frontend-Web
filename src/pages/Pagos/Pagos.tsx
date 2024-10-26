import React, { Component } from "react";
import { autorizarPago } from "../../App/Pagos/Pagos";
import { IonContent, IonPage } from "@ionic/react";

const Pagos: React.FC = () => {
	return (
		<IonPage>
			<IonContent>
				<div>
					<button onClick={() => autorizarPago()}>
						Autorizar pago
					</button>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default Pagos;
