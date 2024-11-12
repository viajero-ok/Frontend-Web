import { IonContent, IonGrid, IonImg, IonRow, IonTitle } from "@ionic/react";
import Checkout from "../../pages/PagarTest/Checkout";
import { useParams } from "react-router";
import { useMemo, useState } from "react";
import { generarOrden } from "../../App/Pagos/Pagos";

export default function PagoView() {
  const [data, setData] = useState<{
    preferenceId: string;
    publicKey: string;
  }>();
  const params: any = useParams();

  useMemo(() => {
    if (!params.id) return;
    generarOrden(params.id).then((response: any) => {
      console.log("response: ", response);
      setData({
        preferenceId: response.data.preference_id,
        publicKey: response.data.pk_mp,
      });
    });
  }, []);

  return (
    <IonContent>

      <IonTitle style={{ marginTop: "10%", textAlign: "center", fontSize: "20pt", fontWeight: "bolder" }}>
        <IonImg
          src="icon.png"
          style={{ width: "50pt", aspectRatio: "1/1", margin: "auto" }}
        />
        <h1 style={{ fontWeight: "bold", fontSize: "18pt", color: "#f08408" }}>viajero</h1>
        Pagá tu reserva
        <h2 style={{ fontWeight: "normal", fontSize: "16pt", color: "#f08408" }}>¡Ya casi comienza tu aventura!</h2>
      </IonTitle>
      <IonGrid style={{ margin: "20pt", border: "2px solid #F08408" }}>

        <IonRow
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >

          <h1 style={{ fontWeight: "normal", fontSize: "12pt", color: "black" }}>Serás redirigido a la página de Mercado Pago para realizar el pago.</h1>

        </IonRow>
        <IonRow
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {data && (
            <Checkout
              preferenceId={data.preferenceId}
              publicKey={data.publicKey}
              style={{
                width: "250pt",
              }}
            />
          )}
        </IonRow>
      </IonGrid>
    </IonContent>
  );
}
