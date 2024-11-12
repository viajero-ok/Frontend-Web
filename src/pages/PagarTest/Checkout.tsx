import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useEffect } from "react";

type TCheckoutProps = {
  preferenceId: string;
  publicKey: string;
  style?: any;
};
export default function Checkout(props: TCheckoutProps) {
  useEffect(() => {
    if (!props.publicKey) return;
    initMercadoPago(props.publicKey);

    return () => {
      //   window?.cardPaymentBrickController?.unmount();
    };
  }, []);

  return (
    <div style={props.style ?? {}}>
      <Wallet
        initialization={{
          preferenceId: props.preferenceId,
        }}
        customization={{ texts: { valueProp: "smart_option" } }}
        locale="es-AR"
      />
    </div>
  );
}
