/* eslint-disable */
const mercadopago = new MercadoPago(process.env.REACT_APP_MERCADOPAGO_PUBLIC_KEY, {
    locale: 'es-AR' // The most common are: 'pt-BR', 'es-AR' and 'en-US'
});


export default mercadopago;
