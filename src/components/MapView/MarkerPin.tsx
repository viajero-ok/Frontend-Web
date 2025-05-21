import { LatLng, LeafletMouseEvent } from "leaflet";
import { useMemo, useState } from "react";
import { Marker, Popup, useMap, useMapEvents } from "react-leaflet";

type TMarker = {
  onClick?: (e: LeafletMouseEvent) => any;
  pos: { lat: number; lng: number };
};
export default function MarkerPin(props: TMarker) {
  const [position, setPosition] = useState<{ lat: number; lng: number }>();

  //   const map = useMapEvents({
  //     click(e) {
  //       setPosition(e.latlng);
  //       if (props.onClick) props.onClick(e);
  //       map.flyTo(e.latlng, map.getZoom());
  //     },
  //   });

  const map = useMap();

  useMemo(() => {
    if (!map) return;
    setPosition(props.pos);
    map.flyTo([props.pos.lat, props.pos.lng], map.getZoom());
  }, []);

  return (
    position != undefined && (
      <Marker position={[position.lat, position.lng]}>
        <Popup>Usted se encuentra aquí</Popup>
      </Marker>
    )
  );
}
