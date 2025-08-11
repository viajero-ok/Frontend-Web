import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

import { LeafletMouseEvent } from "leaflet";
import { CSSProperties, useEffect, useMemo, useState } from "react";
import { ClassNameValue } from "tailwind-merge";
import { cn } from "../ui/Form/Field";
import LeafletControlGeocoder from "./LeafletControlGeocoder";
import MarkerPin from "./MarkerPin";
import SingleMarkerOnClick from "./SingleMarkerOnClick";
import { TMarker, useMapView } from "./useMapView";

const ComponentResize = () => {
  const map = useMap();

  setTimeout(() => {
    map.invalidateSize();
  }, 0);

  return null;
};

const Recenter = (props: {
  pos: { lat: number; lng: number };
  zoom?: number;
}) => {
  const map = useMap();
  useEffect(() => {
    map.setView([props.pos.lat, props.pos.lng], props.zoom);
  }, [props.pos]);
  return null;
};

type TMap = {
  initPos?: { lat: number; lng: number };
  initZoom?: number;
  autoLoc?: boolean;
  style?: CSSProperties;
  zoom?: boolean;
  onClick?: (e: LeafletMouseEvent) => any;
  pos?: { lat: number; lgn: number } | null;
  setMarker?: { lat: number; lng: number } | null;
  className?: ClassNameValue;
};
const Map = (props: TMap) => {
  const [pos, setPos] = useState<{ lat: number; lng: number }>(
    props.initPos
      ? { ...props.initPos }
      : {
          lat: -31.44158447746307,
          lng: -64.19357580741155,
        }
  );
  const [zoom, setZoom] = useState<number>(13);

  useEffect(() => {
    if (!props.autoLoc) return;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setPos({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  useMemo(() => {
    if (!props.pos) return;
    setPos({
      lat: props.pos.lat,
      lng: props.pos.lgn,
    });
  }, [props.pos]);

  useMemo(() => {
    if (!props.setMarker) return;
    setPos({
      lat: props.setMarker.lat,
      lng: props.setMarker.lng,
    });
    setZoom(15);
  }, [props.setMarker]);

  const { autoLoc, search, markerOnClick, markerList } = useMapView();

  return (
    <>
      <MapContainer
        center={[pos.lat, pos.lng]}
        zoom={props.initZoom ?? 13}
        style={props.style ?? {}}
        zoomControl={props.zoom ?? false}
        className={cn(props.className)}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          //url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          //url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png" --> clarito
        />
        <ComponentResize />
        <Recenter pos={pos} zoom={zoom} />

        {search && <LeafletControlGeocoder />}
        {markerOnClick && (
          <SingleMarkerOnClick onClick={props.onClick ?? undefined} />
        )}

        {markerList && markerList.map((marker: TMarker) => (
          <MarkerPin key={marker.id} marker={marker} />
        ))}
      </MapContainer>
    </>
  );
};

interface IMapView {
  style?: any;
  zoom?: boolean;
  autoLoc?: boolean;
  initPos?: { lat: number; lng: number };
  initZoom?: number;
  onClick?: (e: LeafletMouseEvent) => any;
  pos?: { lat: number; lgn: number } | null;
  setMarker?: { lat: number; lng: number } | null;
  className?: ClassNameValue;
}
export default function MapView(props: IMapView) {
  return <Map {...props} />;
}
