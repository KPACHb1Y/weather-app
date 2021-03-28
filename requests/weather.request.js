const rp = require('request-promise');

module.exports = async function(city = '') {
    if (!city) {
        throw new Error('Поле город не может быть пустым')
    }

    const KEY = '1af6d6f817ee346a9d9f80c7a5439b4b';
    const uri = 'http://api.openweathermap.org/data/2.5/weather'

    const options = {
        uri,
        qs: {
            appid: KEY,
            q: city,
            units: 'imperial'
        },
        json: true
    }

    try {
        const data = await rp(options);

        const celsius = (data.main.temp - 32) * 5/9

        return {
            weather: `${data.name}: ${celsius.toFixed(0)}`,
            error: null
        }
    } catch (error) {
        return {
            weather: null,
            error: error.error.message
        }
    }
}
