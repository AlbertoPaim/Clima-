document.querySelector(".busca").addEventListener("submit", async (e) => {
  e.preventDefault();

  let input = document.querySelector("#searchInput").value;

  if (input !== "") {
    showMsg("Carregando...");

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=e5218b8ae4a7928fa8526dcc469a9ab8&units=metric&lang=pt_br`;


    let results = await fetch(url)
    let json = await results.json()
   

    if (json.cod == 200) {
        showInfo({
            name: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            feelsLike: json.main.feels_like,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            windDeg: json.wind.deg,
            desc: json.weather[0].description
        })
    } else {
        document.querySelector('.resultado').style.display = 'none'
        showMsg("Localização não encontrada");
    }

    
  }
});


function showInfo(json) {
    showMsg('')
    document.querySelector('.resultado').style.display = 'block'
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country} `
    document.querySelector('.tempInfo').innerHTML = `${json.temp}<sup>ºC</sup>` 
    document.querySelector('.tempMax').innerHTML = `${json.tempMax}<sup>ºC</sup>`
    document.querySelector('.tempMin').innerHTML = `${json.tempMin}<sup>ºC</sup>`
    document.querySelector('.tempFeel').innerHTML = `${json.feelsLike}<sup>ºC</sup>`
    document.querySelector('.Descripition').innerHTML = json.desc
    document.querySelector('.vento img').src = `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windDeg-90}deg)`
    
    style="transform: rotate(0deg)"
}



function showMsg(msg) {

  document.querySelector(".aviso").innerHTML = msg;
}
