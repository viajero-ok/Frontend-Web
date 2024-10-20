import {
	IonContent,
	IonHeader,
	IonItem,
	IonList,
	IonMenu,
	IonMenuButton,
	IonMenuToggle,
	IonPage,
	IonTitle,
	IonToolbar,
	useIonRouter,
} from "@ionic/react";
import { useEffect, useState } from "react";
import LoginNavbar from "../../components/LoginNavbar/LoginNavbar";
import ProfileChip from "../../components/ProfileChip/ProfileChip";
import { useAuth } from "../../hooks/UseAuth/AuthProvider";
import { PERFILES } from "../../App/consts/UsuarioConsts";

export default function DefaultLoggedLayout({ children }: any) {
	const [logged, setLogged] = useState<boolean>();
	const [perfilSeleccionado, setPerfilSeleccionado] = useState<number>();
	const auth = useAuth();
	const router = useIonRouter();

	const push = (uri: string) => {
		if (!router) return;
		router.push(uri);
	};

	useEffect(() => {
		if (auth) {
			setLogged(auth.isLogged);
			setPerfilSeleccionado(auth.perfilSeleccionado);
		}
	}, [auth]);

	return (
		<>
			{logged && (
				<IonMenu contentId="burger">
					<IonHeader>
						<IonToolbar>
							<IonTitle
								style={{
									display: "flex",
									position: "absolute",
									float: "left",
									top: "50%",
									transform: "translateY(-50%)",
									fontWeight: "bolder",
									fontSize: "21pt",
									marginLeft: "13pt",
								}}
							>
								viajero
							</IonTitle>
						</IonToolbar>
					</IonHeader>
					<IonContent>
						<IonList lines="none" style={{ marginTop: "13pt" }}>
							<IonMenuToggle>
								<IonItem button onClick={() => push("/")}>
									Inicio
								</IonItem>
							</IonMenuToggle>
							<IonMenuToggle>
								<IonItem
									button
									onClick={() => push("/my-places")}
								>
									Mis establecimientos
								</IonItem>
							</IonMenuToggle>
							<IonMenuToggle>
								<IonItem
									button
									onClick={() => push("/my-offers")}
								>
									Mis ofertas turísticas
								</IonItem>
							</IonMenuToggle>
							<IonMenuToggle>
								<IonItem button disabled>
									Mis reservas
								</IonItem>
							</IonMenuToggle>
							<IonMenuToggle>
								<IonItem button disabled>
									Informes y estadísticas
								</IonItem>
							</IonMenuToggle>
						</IonList>
					</IonContent>
				</IonMenu>
			)}
			<IonPage id="burger">
				<IonHeader>
					<IonToolbar>
						<IonMenuToggle
							slot="start"
							style={{
								display: "inline-block",
								marginLeft: "13pt",
							}}
						>
							<IonMenuButton
								style={{ fontSize: "24pt" }}
							></IonMenuButton>
						</IonMenuToggle>
						<IonTitle
							style={{
								display: "flex",
								position: "absolute",
								float: "left",
								top: "calc(50% - 1.5pt)",
								transform: "translateY(-50%)",
								fontWeight: "bolder",
								fontSize: "21pt",
								marginLeft: "-13pt",
							}}
						>
							viajero
						</IonTitle>
						<IonTitle
							style={{
								position: "absolute",
								left: "50%",
								top: "50%",
								transform: "translateX(-50%) translateY(-50%)",
							}}
						>
							¡Hola,{" "}
							{perfilSeleccionado == -1
								? "viajero"
								: perfilSeleccionado == PERFILES.TURISTA.id
								? "turista"
								: "prestador"}
							!
						</IonTitle>
						<div
							style={{
								display: "flex",
								position: "relative",
								float: "right",
								marginRight: "31pt",
							}}
						>
							{auth && logged && <ProfileChip />}
							{auth && logged == false && <LoginNavbar />}
						</div>
					</IonToolbar>
				</IonHeader>
				<IonContent fullscreen>
					<IonHeader collapse="condense">
						<IonToolbar>
							<IonTitle size="large">Blank</IonTitle>
						</IonToolbar>
					</IonHeader>
					<IonContent>{children}</IonContent>
				</IonContent>
			</IonPage>
		</>
	);
}
