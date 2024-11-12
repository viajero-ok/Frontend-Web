import { Wallet } from "@mercadopago/sdk-react";

type TCheckoutProps = {
  preferenceId: string;
};
export default function Checkout(props: TCheckoutProps) {
  // useEffect(() => {
  //   initMercadoPago("APP_USR-df748500-705e-4007-a307-a2072f78d3f0");

  //   return () => {
  //     //   window?.cardPaymentBrickController?.unmount();
  //   };
  // }, []);

  return (
    <Wallet
      initialization={{
        preferenceId: props.preferenceId,
      }}
      customization={{ texts: { valueProp: "smart_option" } }}
      locale="es-AR"
    />
  );
}
