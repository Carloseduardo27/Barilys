const axios = require('axios');

exports.getExchangeRate = async (req, res) => {
  try {
    const apiKey = process.env.EXCHANGE_RATE_API_KEY;
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

    const response = await axios.get(url);
    const rate = response.data.conversion_rates.VES;

    if (!rate) {
      return res
        .status(404)
        .json({ msg: 'Tasa de cambio para VES no encontrada.' });
    }

    res.json({ rate });
  } catch (error) {
    console.error('Error al obtener la tasa de cambio:', error.message);
    res.status(500).send('Error del servidor al obtener la tasa de cambio.');
  }
};
