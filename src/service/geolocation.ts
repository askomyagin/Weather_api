interface City {
    city: string;
}

const GetAddress = async (lat: number, lng: number): Promise<City> => {
    var url =
        'https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address';
    var token = '50b7382271a1996ab76fc418509f61d68f21e1fb';
    var query = { lat: lat, lon: lng };

    const res = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Token ' + token,
        },
        body: JSON.stringify(query),
    });

    if (!res.ok) {
        throw new Error(`Could not fetch, received ${res.status}`);
    }

    const data = await res.json();
    return _transformWeather(data);
};

const _transformWeather = (res: any): City => {
    return {
        city: res.suggestions[0].data.city,
    };
};

export default GetAddress;
