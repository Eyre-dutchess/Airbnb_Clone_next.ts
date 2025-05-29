import countries from "world-countries";

const formattedCountries = countries.map((country)=>({
    flag:country.flag,
    value: country.cca2,
    region: country.region,
    latlng: country.latlng,
    label: country.name.common,
}))

export const useCountries = () =>{
    const getAll = () => formattedCountries;

    const getByValue = (value: string) =>{
        return formattedCountries.find(item=> item.value=== value)
    }

    return {
        getAll, getByValue
    }
}