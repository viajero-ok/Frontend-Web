import "leaflet/dist/leaflet.css";
import {
  LayerGroup,
  LayersControl,
  MapContainer,
  TileLayer,
  useMap,
} from "react-leaflet";

import { CSSProperties, useEffect, useMemo, useState } from "react";
import LeafletControlGeocoder from "./LeafletControlGeocoder";
import { CSSOptions } from "vite";
import MarkerOnClick from "./MarkerOnClick";
import { LeafletMouseEvent } from "leaflet";
import MarkerPin from "./MarkerPin";
import { ClassNameValue } from "tailwind-merge";

const ComponentResize = () => {
  const map = useMap();

  setTimeout(() => {
    map.invalidateSize();
  }, 0);

  return null;
};

const Recenter = (props: { pos: { lat: number; lng: number } }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([props.pos.lat, props.pos.lng]);
  }, [props.pos]);
  return null;
};

type TMap = {
  initPos?: { lat: number; lng: number };
  initZoom?: number;
  autoLoc?: boolean;
  style?: CSSProperties;
  zoom?: boolean;
  search?: boolean;
  markerOnClick?: boolean;
  onClick?: (e: LeafletMouseEvent) => any;
  pos?: { lat: number; lgn: number } | null;
  setMarker?: { lat: number; lng: number } | null;
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
  }, [props.setMarker]);

  return (
    <>
      <MapContainer
        center={[pos.lat, pos.lng]}
        zoom={props.initZoom ?? 13}
        style={props.style ?? { height: "100vh" }}
        zoomControl={props.zoom ?? false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          //url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          //url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png" --> clarito
        />
        <ComponentResize />
        <Recenter pos={pos} />
        {props.search && <LeafletControlGeocoder />}
        {props.markerOnClick && (
          <MarkerOnClick onClick={props.onClick ?? undefined} />
        )}
        {props.setMarker != null && <MarkerPin pos={props.setMarker} />}
      </MapContainer>
    </>
  );
};

interface IMapView {
  style?: any;
  zoom?: boolean;
  search?: boolean;
  autoLoc?: boolean;
  initPos?: { lat: number; lng: number };
  initZoom?: number;
  markerOnClick?: boolean;
  onClick?: (e: LeafletMouseEvent) => any;
  pos?: { lat: number; lgn: number } | null;
  setMarker?: { lat: number; lng: number } | null;
  className?: ClassNameValue;
}
export default function MapView(props: IMapView) {
  return <Map {...props} />;
}
