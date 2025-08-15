import { IonIcon, useIonRouter } from "@ionic/react";
import { bookmarkOutline, location } from "ionicons/icons";

// Import Swiper styles
import {
  Banknote,
  Bed,
  BedDouble,
  BedSingle,
  LogIn,
  LogOut,
  Sofa,
  User,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import "swiper/css";
import { obtenerOfertaTuristica } from "../../App/Ofertas/Ofertas";
import MapView from "../../components/MapView/MapView";
import {
  MapViewProvider,
  useMapView,
} from "../../components/MapView/useMapView";

const RenderImages = ({ imagenes }: { imagenes: any[] }) => {
  if (imagenes.length == 1)
    return (
      <div
        className="w-full aspect-video bg-center bg-cover"
        style={{ backgroundImage: `url(${imagenes[0]})` }}
      />
    );

  if (imagenes.length == 2)
    return (
      <div className="flex flex-row gap-4 w-full">
        <div
          className="w-full aspect-video bg-center bg-cover"
          style={{ backgroundImage: `url(${imagenes[0]})` }}
        />
        <div
          className="w-full aspect-video bg-center bg-cover"
          style={{ backgroundImage: `url(${imagenes[1]})` }}
        />
      </div>
    );

  if (imagenes.length == 3)
    return (
      <div className="flex flex-row gap-4 w-full">
        <div
          className="w-2/3 aspect-video bg-center bg-cover"
          style={{ backgroundImage: `url(${imagenes[0]})` }}
        />
        <div className="w-1/3 flex flex-col justify-center gap-4">
          <div
            className="w-full aspect-video bg-center bg-cover"
            style={{ backgroundImage: `url(${imagenes[1]})` }}
          />
          <div
            className="w-full aspect-video bg-center bg-cover"
            style={{ backgroundImage: `url(${imagenes[2]})` }}
          />
        </div>
      </div>
    );

  if (imagenes.length == 4)
    return (
      <div className="flex flex-col w-full gap-4">
        <div
          className="w-full aspect-video bg-center bg-cover"
          style={{ backgroundImage: `url(${imagenes[0]})` }}
        />
        <div className="flex flex-row gap-4 justify-center w-full">
          <div
            className="w-full aspect-video bg-center bg-cover"
            style={{ backgroundImage: `url(${imagenes[1]})` }}
          />
          <div
            className="w-full aspect-video bg-center bg-cover"
            style={{ backgroundImage: `url(${imagenes[2]})` }}
          />
          <div
            className="w-full aspect-video bg-center bg-cover"
            style={{ backgroundImage: `url(${imagenes[3]})` }}
          />
        </div>
      </div>
    );

  if (imagenes.length > 4)
    return (
      <div className="flex flex-col w-full gap-4">
        <div
          className="w-full aspect-video bg-center bg-cover"
          style={{ backgroundImage: `url(${imagenes[0]})` }}
        />
        <div className="flex flex-row gap-4 justify-center w-full">
          <div
            className="w-full aspect-video bg-center bg-cover"
            style={{ backgroundImage: `url(${imagenes[1]})` }}
          />
          <div
            className="w-full aspect-video bg-center bg-cover"
            style={{ backgroundImage: `url(${imagenes[2]})` }}
          />
          <div
            className="w-full aspect-video bg-center bg-cover"
            style={{ backgroundImage: `url(${imagenes[3]})` }}
          />
          <div
            className="relative w-full aspect-video bg-center bg-cover"
            style={{ backgroundImage: `url(${imagenes[4]})` }}
          >
            <div className="flex w-full h-full absolute bg-gray-50/45 cursor-pointer hover:bg-[var(--color-viajero)]/50 transition-colors duration-75 text-white font-bold justify-center items-center">
              Ver más
            </div>
          </div>
        </div>
      </div>
    );

  return <div>no images</div>;
};

export default function VerOfertaView() {
  const [datos, setDatos] = useState<any>();
  const params: any = useParams();
  const router = useIonRouter();

  useMemo(() => {
    console.log("params: ", params);
    if (!params.id) return;
    if (!params.fecha_desde) return;
    if (!params.fecha_hasta) return;
    if (!params.cantidad_personas) return;
    obtenerOfertaTuristica({
      id_oferta: params.id,
      fecha_desde: params.fecha_desde,
      fecha_hasta: params.fecha_hasta,
      cantidad_personas: params.cantidad_personas,
    })
      .then((response: any) => {
        setDatos(response.data);
        console.log("response: ", response.data);
      })
      .catch((error: any) => {
        console.log("error: ", error);
      });
  }, []);

  const StyledDiv = styled.div`
    position: relative;
    border-left: 3pt solid lightgray;
    transition-duration: 0.25s;
    cursor: pointer;
  `;

  const StyledOver = styled.span`
    transition-duration: 0.25s;
    cursor: pointer;
    background-color: transparent;
    color: transparent;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 999;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 18pt;

    &:hover {
      background-color: #f08408;
      color: white;
    }
  `;

  const map = useMapView({});

  const getCamaIcon = (nombreCama: string) => {
    if (nombreCama == "Cama doble") return <BedDouble className="w-[12pt]" />;
    if (nombreCama == "Cama individual")
      return <BedSingle className="w-[12pt]" />;
    if (nombreCama == "Sofá-cama") return <Sofa className="w-[12pt]" />;
    return <Bed className="w-[12pt]" />;
  };

  return (
    <div className="flex flex-col mx-8 mt-4 pb-12">
      <div className="flex flex-row justify-between items-center p-4  border border-gray-200 rounded-md">
        <div className="flex flex-col gap-2">
          <div className="text-2xl text-gray-600 font-bold">
            {datos?.datos_basicos.nombre}
          </div>
          <div className="flex flex-row gap-1 items-center">
            <IonIcon
              className="text-xl text-[var(--color-viajero)]"
              icon={location}
            />
            <span className="text-sm text-gray-600">
              {datos?.domicilio.numero} {datos?.domicilio.nombre_calle}
              {", "}
              {datos?.domicilio.localidad}
              {", "}Córdoba
            </span>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <IonIcon
            className="text-3xl text-gray-600 cursor-pointer"
            icon={bookmarkOutline}
          />
          {/* <button className="viajero-button px-4 py-2">Reservar</button> */}
        </div>
      </div>
      <div className="flex flex-row gap-4 mt-4 justify-between">
        <div className="flex flex-fow w-full">
          <RenderImages
            imagenes={
              datos
                ? datos.imagenes_oferta.map(
                    (img: any) => "data:image/png;base64," + img.imagen
                  )
                : []
            }
          />
        </div>
        <div className="flex flex-col justify-end gap-4 w-1/3">
          <div className="border border-gray-200 bg-gray-50 rounded-md p-4 flex h-2/3 items-center">
            <span className="text-md text-gray-600 italic">
              No hay reseñas disponibles para esta oferta
            </span>
          </div>
          <MapViewProvider {...map}>
            <MapView className="w-full aspect-video rounded-md border border-[#bbb] hover:border-black" />
          </MapViewProvider>
        </div>
      </div>

      <div className="flex flex-row gap-4 items-center mt-4">
        <div className="mt-4 flex flex-col w-full">
          <div className="w-full flex flex-row justify-center text-xl text-gray-600">
            {datos?.datos_basicos.descripcion}
          </div>
          <div className="flex flex-row gap-2 justify-center mt-4">
            {datos?.caracteristicas.map((caracteristica: any) => (
              <div className="p-4 text-gray-600 border border-gray-200 rounded-md">
                {caracteristica.caracteristica}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-8">
        <div className="w-full text-2xl text-gray-600 border border-gray-200 bg-gray-50 font-bold p-4 rounded-md">
          Disponibilidad
        </div>
        <table className="mt-2 border-x border-[var(--color-viajero)]">
          <thead className="">
            <tr className="">
              <td className="p-4 text-sm font-bold text-white bg-[var(--color-viajero)]/95">
                Alojamiento
              </td>
              <td className="p-4 text-sm font-bold text-white bg-[var(--color-viajero)]/95">
                Cantidad de personas
              </td>
              <td className="p-4 text-sm font-bold text-white bg-[var(--color-viajero)]/95">
                Precio por {datos?.datos_basicos.noches_estadia} noches
              </td>
              <td className="p-4 text-sm font-bold text-white bg-[var(--color-viajero)]/95"></td>
            </tr>
          </thead>
          <tbody>
            {datos?.tipos_detalles.map((detalle: any) => (
              <tr>
                <td className="p-4 text-sm text-gray-600 border-r border-[var(--color-viajero)] border-b flex flex-col gap-1">
                  <span className="font-bold text-[var(--color-viajero)] cursor-pointer hover:underline">
                    {detalle.tipo_detalle}
                  </span>
                  <span className=" text-xs">
                    {detalle.camas_cantidad.map((cama: any) => (
                      <span className="flex flex-row gap-1 items-center">
                        {getCamaIcon(cama.nombre_cama)} {cama.cantidad}{" "}
                        {cama.nombre_cama}
                      </span>
                    ))}
                  </span>
                  <span className="flex flex-row gap-2 justify-start">
                    {detalle.caracteristicas.map((caracteristica: any) => (
                      <span className="text-xs">
                        {caracteristica.caracteristica}
                      </span>
                    ))}
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-600 border-r border-[var(--color-viajero)] border-b">
                  <span className="w-full flex flex-row justify-center">
                    {new Array(params.cantidad_personas).map(() => (
                      <User />
                    ))}
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-600 border-r border-[var(--color-viajero)] border-b">
                  <span className="w-full flex flex-row justify-center">
                    <div className="flex flex-col">
                      <div className="text-xl text-gray-600 font-bold">
                        AR$ {`${detalle.precio_total}`.replace(".", ",")}
                      </div>
                      <div className="text-xs italic text-gray-600">
                        + impuestos y tasas
                      </div>
                    </div>
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-600 border-b border-[var(--color-viajero)]">
                  <button
                    onClick={() => {
                      datos &&
                        router.push(
                          `/oferta/reservar/${datos.datos_basicos.id_oferta_turistica}/${detalle.id_tipo_detalle}/${params.fecha_desde}/${params.fecha_hasta}/${params.cantidad_personas}`
                        );
                    }}
                    className="viajero-button px-4 py-2 w-full"
                  >
                    Reservar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-col gap-4">
        <div className="p-4 rounded-md text-xl font-bold text-gray-600 bg-gray-50 border border-gray-200">
          Información importante
        </div>
        <div className="grid grid-flow-row flex-col border border-gray-200 rounded-md">
          <div className="grid grid-cols-10 p-4">
            <div className="col-span-3 flex justify-center items-center gap-2 text-gray-600 font-bold">
              <LogIn className="text-gray-600" /> Check-in
            </div>
            <div className="col-span-7 justify-start items-start flex flex-row">
              {[
                { tag: "Lun", key: "aplica_lunes" },
                { tag: "Mar", key: "aplica_martes" },
                { tag: "Mie", key: "aplica_miercoles" },
                { tag: "Jue", key: "aplica_jueves" },
                { tag: "Vie", key: "aplica_viernes" },
                { tag: "Sab", key: "aplica_sabado" },
                { tag: "Dom", key: "aplica_domingo" },
              ].map((dia: { tag: string; key: string }) => (
                <div className="flex flex-col">
                  <div className="text-gray-600 text-md font-bold px-4 py-2">
                    {dia.tag}
                  </div>
                  {datos &&
                    datos.horarios_check_in_out
                      .filter((h: any) => h[dia.key] == 1)
                      .map((h: any, i: number) => (
                        <div className="text-md text-gray-600 px-4 py-2">{`${
                          i > 0 ? " - " : ""
                        }${h.check_in_hora}:${h.check_in_minuto}`}</div>
                      ))}
                </div>
              ))}
            </div>
          </div>
          <div className="w-full border-b border-gray-200" />
          <div className="grid grid-cols-10 p-4">
            <div className="col-span-3 flex justify-center items-center gap-2 text-gray-600 font-bold">
              <LogOut className="text-gray-600" /> Check-out
            </div>
            <div className="col-span-7 justify-start items-start flex flex-row">
              {[
                { tag: "Lun", key: "aplica_lunes" },
                { tag: "Mar", key: "aplica_martes" },
                { tag: "Mie", key: "aplica_miercoles" },
                { tag: "Jue", key: "aplica_jueves" },
                { tag: "Vie", key: "aplica_viernes" },
                { tag: "Sab", key: "aplica_sabado" },
                { tag: "Dom", key: "aplica_domingo" },
              ].map((dia: { tag: string; key: string }) => (
                <div className="flex flex-col">
                  <div className="text-gray-600 text-md font-bold px-4 py-2">
                    {dia.tag}
                  </div>
                  {datos &&
                    datos.horarios_check_in_out
                      .filter((h: any) => h[dia.key] == 1)
                      .map((h: any, i: number) => (
                        <div className="text-md text-gray-600 px-4 py-2">{`${
                          i > 0 ? " - " : ""
                        }${h.check_out_hora}:${h.check_out_minuto}`}</div>
                      ))}
                </div>
              ))}
            </div>
          </div>
          <div className="w-full border-b border-gray-200" />
          <div className="grid grid-cols-10 p-4">
            <div className="col-span-3 flex justify-center items-center gap-2 text-gray-600 font-bold">
              <Banknote className="text-gray-600" /> Métodos de pago
            </div>
            <div className="col-span-7 justify-start items-start flex flex-row">
              {datos?.metodos_pago.map((metodo: any) => (
                <div className="p-4 border border-gray-200 rounded-md text-gray-600">
                  {metodo.metodo_pago}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
