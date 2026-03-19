import { useIonRouter } from "@ionic/react";
import { cn } from "../../../components/ui/Form/Field";
import { Select } from "../../../components/ui/Select/Select";
import { useNewOffer } from "./Provider/NewOfferProvider";

export const OfferCard = ({
  onClick,
  title,
  imgSrc,
  disabled,
}: {
  onClick: () => void;
  title: string;
  imgSrc: string;
  disabled?: boolean;
}) => {
  return (
    <div
      className={cn(
        disabled
          ? "bg-gray-50"
          : "cursor-pointer hover:shadow-sm hover:bg-[var(--color-viajero)]/5 transition-all duration-400"
      )}
      onClick={onClick}
    >
      <div
        className={cn(
          "flex flex-col items-center justify-center border border-gray-200 p-4 rounded-md"
        )}
      >
        <img
          alt={"offer card " + title + " image"}
          src={imgSrc}
          width={"300pt"}
          height={"auto"}
          style={{}}
        />
        <div
          className={cn(
            "text-xl font-bold",
            disabled ? "text-gray-400" : "text-gray-600"
          )}
        >
          {title}
        </div>
      </div>
    </div>
  );
};

export default function OfferTypeSelection() {
  const router = useIonRouter();

  const offer = useNewOffer();

  return (
    <div className="flex w-full h-full items-center justify-center">
      <div className="flex flex-col p-4 px-8 w-fit">
        <div className="flex flex-row gap-4 items-center justify-between">
          <div className="text-3xl text-gray-600 font-bold">
            Elegí el tipo de oferta que querés registrar
          </div>
          <button
            className="viajero-button-ghost py-2 px-4"
            onClick={() => {
              router.goBack();
            }}
          >
            Cancelar
          </button>
        </div>
        <div className="flex flex-row gap-4 w-full justify-center mt-8">
          <OfferCard
            onClick={() => offer.setTipoOferta("alojamiento")}
            title="Alojamiento"
            imgSrc="/3.5. Registro oferta/1-Alojamiento.png"
          />
          <OfferCard
            onClick={() => offer.setTipoOferta("actividad")}
            title="Actividad"
            imgSrc="/3.5. Registro oferta/2-Actividades.png"
          />
          <OfferCard
            onClick={() => offer.setTipoOferta("evento")}
            title="Evento"
            imgSrc="/3.5. Registro oferta/3-Eventos.png"
          />
        </div>
      </div>
    </div>
  );
}
