import { IonCard, IonHeader, IonCardTitle, useIonRouter, IonGrid, IonCol } from "@ionic/react";



export default function HomePrestadorView(props: any) {
  const router = useIonRouter();

  const push = (uri: string) => {
    if (!router) return;
    router.push(uri);
  };
  return (
    <IonGrid
      style={{
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <IonCol>
        <IonCard button onClick={() => push("/my-places")}>
          <IonHeader
            style={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
              padding: "13pt",
            }}
          >
            <img
              alt="Silhouette of mountains"
              src="public\3.4. Menu prestador\Mis establecimientos.png"
              width={"100pt"}
              height={"auto"}
              style={{}}
            />
            <IonCardTitle
              style={{
                fontSize: "16pt",
                fontWeight: "bold",
                paddingTop: "13pt",
              }}
            >
              Mis Establecimientos
            </IonCardTitle>
          </IonHeader>
        </IonCard>

      </IonCol>
      <IonCol>
        <IonCard button onClick={() => push("/my-offers")}>
          <IonHeader
            style={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
              padding: "13pt",
            }}
          >
            <img
              alt="Silhouette of mountains"
              src="public\3.4. Menu prestador\Mis ofertas turisticas.png"
              width={"100pt"}
              height={"auto"}
              style={{}}
            />
            <IonCardTitle
              style={{
                fontSize: "16pt",
                fontWeight: "bold",
                paddingTop: "13pt",
              }}
            >
              Mis ofertas
            </IonCardTitle>
          </IonHeader>
        </IonCard>
      </IonCol>
      <IonCol>
        <IonCard button onClick={() => push("/mis-reservas")}>
          <IonHeader
            style={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
              padding: "13pt",
            }}
          >
            <img
              alt="Silhouette of mountains"
              src="public\3.4. Menu prestador\Mis reservas.png"
              width={"100pt"}
              height={"auto"}
              style={{}}
            />
            <IonCardTitle
              style={{
                fontSize: "16pt",
                fontWeight: "bold",
                paddingTop: "13pt",
              }}
            >
              Mis Reservas
            </IonCardTitle>
          </IonHeader>
        </IonCard>
      </IonCol>
      <IonCol>
        <IonCard button disabled>
          <IonHeader
            style={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
              padding: "13pt",
            }}
          >
            <img
              alt="Silhouette of mountains"
              src="public\3.4. Menu prestador\Informes y estadisticas.png"
              width={"100pt"}
              height={"auto"}
              style={{}}
            />
            <IonCardTitle
              style={{
                fontSize: "16pt",
                fontWeight: "bold",
                paddingTop: "13pt",
              }}
            >
              Reportes
            </IonCardTitle>
          </IonHeader>
        </IonCard>
      </IonCol>
    </IonGrid>
  );
}
