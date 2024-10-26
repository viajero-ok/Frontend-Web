import AUTH_API from "../AuthBackendApi";

export const autorizarPago = async () =>
	await AUTH_API.get(
		`/pagos/solicitar-autorizacion-prestador`
	);
