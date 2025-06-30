import { LatLng, marker } from "leaflet";
import React from "react";

export type TMarker = { id: number; pos: LatLng };

type TMapContextConfig = {
  autoLoc?: boolean;
  search?: boolean;
  markerOnClick?: boolean;
};

type MapViewContextValue = {
  markerList: TMarker[];
  relocateMarker: (pos: LatLng, id?: number) => void;
  newMarker: (pos: LatLng) => number;
} & TMapContextConfig;

const MapViewContext = React.createContext<MapViewContextValue>(
  {} as MapViewContextValue
);

const useMapViewWithin = () => {
  const context = React.useContext(MapViewContext);
  if (!context)
    throw new Error(
      "useMapView without props should be used only within <MapViewProvider></MapViewProvider>"
    );

  return {
    ...context,
  };
};

const useMapView = (props?: TMapContextConfig) => {
  /**
   * useMapView(...props) will craete the context
   * useMapView() will return the context or an error if there is no context
   * This is done this way so that the context is usable at the same level as the Provider
   * without loosing it's encapsulation
   */
  if (!props) return useMapViewWithin();

  const [markerList, setMarkerList] = React.useState<TMarker[]>([]);
  const [lastMarkerId, setLastMarkerId] = React.useState<number>(0);

  const relocateMarker = (pos: LatLng, id: number = 1) => {
    if (markerList.length == 0) {
      newMarker(pos);
      return;
    }
    setMarkerList((prev: TMarker[]) => [
      ...prev.filter((marker: TMarker) => marker.id != id),
      { id, pos },
    ]);
  };

  const newMarker = (pos: LatLng) => {
    const newId = lastMarkerId + 1;
    setMarkerList((prev: TMarker[]) => [...prev, { id: newId, pos }]);
    setLastMarkerId((prev: number) => newId);
    return newId;
  };

  const context: MapViewContextValue = {
    /** Map parameters, setted when the view is created */
    autoLoc:
      props.autoLoc ?? false /** Automatic positioning with browser location */,
    search: props.search ?? false /** Search field  */,
    markerOnClick:
      props.markerOnClick ??
      false /** Allow setting a marker when clicking on the map */,

    markerList /** List of visible markers */,
    relocateMarker,
    newMarker,
  };

  return context;
};

const MapViewProvider = ({
  children,
  ...ctx
}: {
  children: React.ReactNode;
} & MapViewContextValue) => {
  return (
    <MapViewContext.Provider value={ctx}>{children}</MapViewContext.Provider>
  );
};

export { MapViewProvider, useMapView };

// const MapViewProvider = ({
//   children,
//   ...props
// }: {
//   children: React.ReactNode;
// } & MapViewContextValue) => {
//   const [markerList, setMarkerList] = React.useState<TMarker[]>([]);
//   const [lastMarkerId, setLastMarkerId] = React.useState<number>(0);

//   const relocateMarker = (id: number, pos: LatLng) => {
//     setMarkerList((prev: TMarker[]) => [
//       ...prev.filter((marker: TMarker) => marker.id != id),
//       { id, pos },
//     ]);
//   };

//   const newMarker = (pos: LatLng) => {
//     const newId = lastMarkerId + 1;
//     setMarkerList((prev: TMarker[]) => [...prev, { id: newId, pos }]);
//     setLastMarkerId((prev: number) => prev + 1);
//     return newId;
//   };

//   const context: MapViewContextValue = {
//     /** Map parameters, setted when the view is created */
//     autoLoc:
//       props.autoLoc ?? false /** Automatic positioning with browser location */,
//     search: props.search ?? false /** Search field  */,
//     markerOnClick:
//       props.markerOnClick ??
//       false /** Allow setting a marker when clicking on the map */,

//     markerList /** List of visible markers */,
//     relocateMarker,
//     newMarker,
//   };

//   return (
//     <MapViewContext.Provider value={context}>
//       {children}
//     </MapViewContext.Provider>
//   );
// };

// const useMapView = () => {
//   const context = React.useContext(MapViewContext);
//   if (!context)
//     throw new Error(
//       "useMapView should be used within <MapViewProvider></MapViewProvider>"
//     );

//   return {
//     ...context,
//   };
// };

// export { MapViewProvider, useMapView };
