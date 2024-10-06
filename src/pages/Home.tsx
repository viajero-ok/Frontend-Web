import {
	IonAvatar,
	IonButton,
	IonChip,
	IonContent,
	IonHeader,
	IonImg,
	IonLabel,
	IonPage,
	IonPopover,
	IonTitle,
	IonToolbar,
} from "@ionic/react";

import "./Home.css";
import { getApi } from "../App/Default/DefaultService";
import { useAuth } from "../hooks/UseAuth/AuthProvider";
import { transform } from "ol/proj";
import ProfileChip from "../components/ProfileChip/ProfileChip";
import DefaultLoggedLayout from "../Views/Layouts/DefaultLoggedLayout";
import { useEffect, useState } from "react";
import { PERFILES } from "../App/consts/UsuarioConsts";
import HomeVisitanteView from "../Views/Home/Visitante/HomeVisitanteView";
import HomeTuristaView from "../Views/Home/Turista/HomeTuristaView";
import HomePrestadorView from "../Views/Home/Prestador/HomePrestadorView";

const Home: React.FC = () => {
	const [perfil, setPerfil] = useState<number>();
	const auth = useAuth();

	useEffect(() => {
		if (!auth) return;
		setPerfil(auth.getPerfil());
	}, [auth]);

	return (
		<DefaultLoggedLayout>
			<IonContent style={{ overflowY: 'hidden' }}>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Blank</IonTitle>
					</IonToolbar>
					<h1>Perfil: {perfil}</h1>
				</IonHeader>
				<IonContent style={{ overflowY: 'hidden' }}>
					<div className="logo-container">
						<IonImg
							src={`../public/3.1. Logos/Logo con nombre.png`}
							className="logo"
						/>
						<p className="logo-title">¿A dónde vamos?</p>
					</div>
					{perfil == PERFILES.INVITADO.id && <HomeVisitanteView />}
					{perfil == PERFILES.TURISTA.id && <HomeTuristaView />}
					{perfil == PERFILES.PRESTADOR.id && <HomePrestadorView />}
				</IonContent>
			</IonContent>
		</DefaultLoggedLayout>
	);
};

export default Home;
