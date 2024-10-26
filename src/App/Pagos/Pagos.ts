import AUTH_API from "../AuthBackendApi";

export const autorizarPago = async () => {
	const response = await AUTH_API.get(
		`/pagos/solicitar-autorizacion-prestador`
	);
	return response.data;
};
