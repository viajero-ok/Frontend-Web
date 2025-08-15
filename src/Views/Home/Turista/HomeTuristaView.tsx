import ConsultaOfertasCard from "../../../components/ConsultaOfertas/ConsultaOfertasCard";
import {
  ConsultaOfertasProvider
} from "../../../components/ConsultaOfertas/ConsultaOfertasProvider";
import HomeTuristaForm from "./HomeTuristaForm";


export default function HomeTuristaView() {
  return (
    <div className="flex flex-col">
      <div
        style={{
          width: "100%",
          height: "400pt",
          backgroundImage: "url(/images/panoramic_1.jpg)",
          backgroundPosition: "center 25%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />
      <div className="flex flex-col px-8 w-full justify-center">
        <ConsultaOfertasProvider>
          <HomeTuristaForm />
          <ConsultaOfertasCard />
        </ConsultaOfertasProvider>
      </div>
    </div>
  );
}
