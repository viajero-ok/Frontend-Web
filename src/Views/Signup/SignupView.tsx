import { useState } from "react";
import SignupForm from "./SignupForm";
import VerifyForm from "./VerifyForm";

type TSignupView = {
  params: { [key: string]: string };
};
export default function SignupView(props: any) {
  const { search } = window.location;
  const id = new URLSearchParams(search).get("id");
  const [idUsuario, setIdUsuario] = useState<string>(id ?? "");
  const schema = {
    email: "",
    password: "",
    passwordRepeated: "",
  };

  return (
    <div className="fixed flex flex-col w-full overflow-y-visible">
      <div className="fixed w-[35vw] mr-14 right-0 top-8 flex items-center">
        {idUsuario?.length == 0 ? (
          <SignupForm setIdUsuario={setIdUsuario} />
        ) : (
          <VerifyForm id={idUsuario} />
        )}
      </div>

      <div className="mt-8 ml-14 pb-20 max-w-[55vw]">
        <div className="bg-[url('/images/registro/city.jpg')] bg-cover bg-center rounded-t-3xl w-full h-50"></div>
        <div className="text-3xl text-gray-700 font-bold mt-4">
          Conocé más sobre VIAJERO 👇
        </div>
        <div className="text-gray-700 mt-4">
          🌍 Planificá tu viaje desde un solo lugar Nuestra plataforma te
          permite organizar tus vacaciones de forma simple, rápida y completa.
          Podés buscar y reservar alojamientos 🏡, descubrir actividades 🎟️ y
          eventos 📅 disponibles en tu destino, y armar un itinerario
          personalizado para aprovechar cada momento del viaje. Todo esto, desde
          una sola app pensada para viajeros como vos.
          <br />
          <br />
          🧭 Organizá tu experiencia como más te guste Guardá tus lugares
          favoritos, recibí notificaciones de eventos cercanos, gestioná tus
          reservas y mantené todo tu viaje organizado al detalle. Ya no
          necesitás usar diez aplicaciones diferentes: acá vas a poder
          visualizar, modificar y disfrutar tu planificación en un entorno
          cómodo e intuitivo.
          <br />
          <br />
          🤝 También para quienes ofrecen experiencias Si sos prestador
          turístico, la plataforma te permite publicar tus alojamientos,
          actividades o eventos, gestionar la disponibilidad y reservas, y
          comunicarte directamente con los turistas a través del chat 💬. Una
          solución integral para ayudarte a crecer y conectar con nuevos
          viajeros.
          <br />
          <br />
          ✈️ Viajá más, preocupate menos Ya sea que estés planeando una escapada
          de fin de semana o unas vacaciones largas, nuestra app está diseñada
          para que disfrutes más y te estreses menos. Registrate gratis y empezá
          a vivir una nueva forma de viajar 🌟
        </div>
      </div>
    </div>
  );
}
