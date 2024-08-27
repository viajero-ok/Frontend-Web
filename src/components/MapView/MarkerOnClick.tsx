import { LatLng, LeafletMouseEvent } from "leaflet";
import { useState } from "react";
import { Marker, Popup, useMap, useMapEvents } from "react-leaflet";

type TMarkerOnClick = {
  onClick?: (e: LeafletMouseEvent) => any;
};
export default function MarkerOnClick(props: TMarkerOnClick) {
  const [position, setPosition] = useState<LatLng>();

  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      if (props.onClick) props.onClick(e);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return (
    position != undefined && (
      <Marker position={position}>
        <Popup>Usted se encuentra aquí</Popup>
      </Marker>
    )
  );
}
