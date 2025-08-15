import {
  IonCard,
  IonCardTitle,
  IonCol,
  IonHeader,
  useIonRouter
} from "@ionic/react";

export default function HomePrestadorView(props: any) {
  const router = useIonRouter();

  const push = (uri: string) => {
    if (!router) return;
    router.push(uri);
  };
  return (
    <div className="">
      <div className="flex flex-row gap-4 px-8 py-4">
        <IonCard
          button
          onClick={() => push("/my-places")}
          className="border border-gray-100 shadow-none hover:shadow-md"
        >
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

        <IonCol>
          <IonCard
            button
            onClick={() => push("/my-offers")}
            className="border border-gray-100 shadow-none hover:shadow-md"
          >
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
          <IonCard
            button
            onClick={() => push("/mis-reservas")}
            className="border border-gray-100 shadow-none hover:shadow-md"
          >
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
          <IonCard
            button
            disabled
            className="border border-gray-100 shadow-none hover:shadow-md"
          >
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
      </div>
    </div>
  );
}
