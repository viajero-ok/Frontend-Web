import React from "react";
import { getUbicaciones } from "../../App/Ubicaciones/Ubicaciones";

/**
 * Encapsula la lógica para seleccionar un domicilio
 * - Listar provincias
 * - Listar departamentos para la provincia seleccionada
 * - Listar localidades para el departamento seleccionado
 * - Resetear listado de localidades al cambiar de departamento
 * - Resetear listados departamentos y localidades al cambiar provincia
 *
 * TODO: Agregar posibilidad de seleccionar pais (?)
 */

type TProvincia = any;
type TDepartamento = any;
type TLocalidad = any;

type TUbicaciones = {
  provincias: TProvincia[];
  departamentos: TDepartamento[];
  localidades: TLocalidad[];
};

type DomicilioSelectionContextValue = TUbicaciones & {
  provinciaSelected: number | null;
  departamentoSelected: number | null;
  localidadSelected: number | null;

  selectProvincia: (id: number) => void;
  selectDepartamento: (id: number) => void;
  selectLocalidad: (id: number) => void;
};

const useDomicilioSelection = ({
  ubicaciones,
  provinciaSelection,
  departamentoSelection,
  localidadSelection,
}: {
  ubicaciones: {
    provincias: TProvincia[];
    departamentos: TDepartamento[];
    localidades: TLocalidad[];
  };
  provinciaSelection: number;
  departamentoSelection: number;
  localidadSelection: number;
}) => {
  const [provincias, setProvincias] = React.useState<TProvincia[]>(
    ubicaciones.provincias
  ); /** Esto podria ser `const provincias = ...` pero se deja así por si luego se desea agregar manejo de paises */
  const [departamentos, setDepartamentos] = React.useState<TDepartamento[]>([]);
  const [localidades, setLocalidades] = React.useState<TLocalidad[]>([]);
  const [provinciaSelected, setProvinciaSelected] = React.useState<
    number | null
  >(null);
  const [departamentoSelected, setDepartamentoSelected] = React.useState<
    number | null
  >(departamentoSelection ?? null);
  const [localidadSelected, setLocalidadSelected] = React.useState<
    number | null
  >(localidadSelection ?? null);

  React.useEffect(
    () => selectProvincia(provinciaSelection ?? null),
    [provinciaSelection]
  );
  React.useEffect(
    () => selectDepartamento(departamentoSelection ?? null),
    [departamentoSelection]
  );
  React.useEffect(() => {
    selectLocalidad(localidadSelection ?? null);
  }, [localidadSelection]);

  React.useEffect(() => {
    if (!ubicaciones) return;
    if (provinciaSelected != null)
      setDepartamentos(
        ubicaciones.departamentos.filter(
          (departamento: TDepartamento) =>
            departamento.id_provincia == provinciaSelected
        )
      );
    if (provinciaSelected != null && departamentoSelected != null)
      setLocalidades(
        ubicaciones.localidades.filter(
          (localidad: TLocalidad) =>
            localidad.id_departamento == departamentoSelected
        )
      );
  }, [provinciaSelected, departamentoSelected]);

  const selectProvincia = (id: number) => {
    setProvinciaSelected(id);
    setDepartamentoSelected(null);
    setLocalidadSelected(null);
    setLocalidades([]);
  };
  const selectDepartamento = (id: number) => {
    setDepartamentoSelected(id);
    setLocalidadSelected(null);
  };
  const selectLocalidad = (id: number) => setLocalidadSelected(id);

  const context: DomicilioSelectionContextValue = {
    provincias,
    departamentos,
    localidades,
    provinciaSelected,
    departamentoSelected,
    localidadSelected,

    selectProvincia,
    selectDepartamento,
    selectLocalidad,
  };

  return context;
};

export { useDomicilioSelection };
