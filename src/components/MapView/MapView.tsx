import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

import { useEffect, useState } from "react";
import LeafletControlGeocoder from "./LeafletControlGeocoder";

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

const Map = (props: any) => {
  const { positionInfos } = props;
  // get the location from geolocation
  const [pos, setPos] = useState({
    lat: props.initPos.lat ?? 0.0,
    lng: props.initPos.lgn ?? 0.0,
  });

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

  return (
    <>
      <MapContainer
        center={[pos.lat, pos.lng]}
        zoom={13}
        style={props.style ?? { height: "100vh" }}
        zoomControl={props.zoom ?? false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          //url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
          //url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
        />
        <ComponentResize />
        <Recenter pos={pos} />
        {props.search && <LeafletControlGeocoder />}
      </MapContainer>
    </>
  );
};

interface IMapView {
  style: any;
  zoom?: boolean;
  search?: boolean;
  autoLoc?: boolean;
  initPos?: {lat: number; lgn: number}
}
export default function MapView(props: IMapView) {
  return <Map positionInfos={[]} {...props} />;
}
