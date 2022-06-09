const api = {
    key: "63434ab0221d5cba2468e6b84ddf7c63",
    url: "https://api.openweathermap.org/data/2.5/weather",
};

const form = document.querySelector("#seachForm");
const searchCountry = document.querySelector("#searchCountry");

const country = document.querySelector("#country");
const date = document.querySelector("#date");
const grades = document.querySelector("#grades");
const tempImg = document.querySelector("#tempImg");
const statusTime = document.querySelector("#statusTime");
const gradesRange = document.querySelector("#gradesRange");

function updateImg(data) {
    const tem = toCelsius(data.main.temp)
    let src = 'imagenes/temp-mid.png'
    if(tem > 26){
        src = 'imagenes/temp-high.png'
    } else if(tem < 20) {
        src = "imagenes/temp-low.png";
    }
    tempImg.src = src
}

async function search(query) {
    try {
        const response = await fetch(`${api.url}?q=${query}&appid=${api.key}&lang=es`);
        const data = await response.json()
        
        country.textContent = `${data.name}, ${data.sys.country}`
        date.textContent = new Date().toLocaleDateString()
        grades.textContent = toCelsius(data.main.temp) + ' °c'
        statusTime.textContent = data.weather[0].description
        gradesRange.textContent = `${toCelsius(data.main.temp_min)} °c / ${toCelsius(data.main.temp_max)} °c`

        updateImg(data)
    } catch (error) {
        console.log(error);
    }
}


function toCelsius(k) {
    return Math.round(k - 273.15)
}

function onSubmit(e){
    e.preventDefault()
    search(searchCountry.value)
}

form.addEventListener('submit', onSubmit, true)

document.addEventListener('DOMContentLoaded', e => {
    search('londres')
})