    const weatherBox = document.querySelector('.weatherBox')
    const city = document.querySelector('.city');
    const date = document.querySelector('.date');
    const weatherImg = document.querySelector('.weatherImg');
    const containerTemp = document.querySelector('.containerTemp');
    const temperatureNumber = document.querySelector('.temperature');
    const tempUnit = document.querySelector('.tempUnit');
    const condition = document.querySelector('.condition');
    const minMax = document.querySelector('.minMax');
  //const wind = document.querySelector('.wind');
    const humidity = document.querySelector('.humidity');

  // Função feita para permissão de localização do usuário
window.addEventListener('load', getlocation)
    function getlocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showWeatherByLocation, handleLocationError);
        } else {
            displayError('Geolocalização não é suportada pelo seu navegador');
        }
}

  // Função para exibir o clima com base na localização do usuário
    function showWeatherByLocation(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const apiKey = 'e73bd5df8d023bbc52b418b1a8a11e77';

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&lang=pt_br&units=metric`)
            .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter o clima da localização');
            }
            return response.json();
        })
            .then(data => {
            displayResult(data);
            clearError();
        })
            .catch(error => {
            displayError(error.message);
    });
}

      // Função para lidar com erros de localização
    function handleLocationError(error) {
        let errorMessage = '';

        switch (error.code) {
            case error.PERMISSION_DENIED:
            errorMessage.style.display = 'none';
            break;
            case error.POSITION_UNAVAILABLE:
            errorMessage.style.display = 'Não foi possível localizar o usuário';
            break;
            case error.TIMEOUT:
            errorMessage.style.display = 'none';
            break;
            case error.UNKNOWN_ERROR:
            errorMessage = 'Erro desconhecido ao obter a localização do usuário';
            break;
        }

        displayError(errorMessage);
}


function getWeather() {
    const cidade = document.querySelector('.buscarCidade').value; 
    const apiKey = 'e73bd5df8d023bbc52b418b1a8a11e77';

  // Resetar animação ao buscar uma nova cidade no input
        weatherBox.style.animation = 'none';
        setTimeout(() => {
        weatherBox.style.animation = '';
        }, 0);

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&lang=pt_br&units=metric`)
    .then(response => {
        if (!response.ok) {
        throw new Error('Cidade não encontrada');
        }
        return response.json();
    })
    .then(data => {
        displayResult(data);
        clearError();
    })
    .catch(error => {
        displayError(error.message);
    });
}

  // Função para exibir os dados do clima no HTML
    function displayResult(data) {

    weatherBox.style.display = 'block';
    weatherBox.classList.add('fadeAnim')

    city.innerText = `${data.name}, ${data.sys.country}`

    let now = new Date();
    date.innerText = dateBuilder(now);

    let iconCode = data.weather[0].icon;
    weatherImg.innerHTML = `<img src="icons/${iconCode}.png">`;

    let temperature = `${Math.round(data.main.temp)}`;
    temperatureNumber.innerHTML = temperature;
    tempUnit.innerHTML = `°C`;

    conditionTemp = data.weather[0].description;
    condition.innerText = capitalizeFirstLetter(conditionTemp);

    minMax.innerText = `${Math.round(data.main.temp_min)}°C / ${Math.round(data.main.temp_max)}°C`;

    //wind.innerText = `Ventos à ${data.wind_guts} km/h`;

    humidity.innerText = `Umidade de ${data.main.humidity} %`;

}

  // Evento de clique e keypress para obter o clima
    const btnWeather = document.querySelector('.btnWeather');
    const btnCity = document.querySelector('.buscarCidade'); 
    
    btnWeather.addEventListener('click', getWeather);
    btnCity.addEventListener('keypress', enter)
    
    function enter(event) {
        key = event.keyCode
        if (key === 13) {
  // Resetar animação ao buscar uma nova cidade no input
        weatherBox.style.animation = 'none';
        setTimeout(() => {
        weatherBox.style.animation = '';
        }, 0);
            getWeather();
        }
    }

  // Função para exibir a data do dia no weatherBox
    function dateBuilder(d) {
    
    let days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    let months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julio", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    let day = days[d.getDay()]; //getDay: 0-6
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
}  

    function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

  // Função para exibir mensagem de erro
    function displayError(message) {
    
    const errorElement = document.querySelector('.error');
    const weatherBox = document.querySelector('.weatherBox');
    
    weatherBox.style.display = 'none';
    errorElement.classList.add('fadeAnim')
    errorElement.style.display = 'block';
    errorElement.textContent = `${message}`;
}

  // Função para limpar mensagem de erro
    function clearError() {
    
    const errorElement = document.querySelector('.error');
    
    errorElement.style.display = 'none';
    errorElement.textContent = '';
}

  // Função para converter temperatura de Celsius para Fahrenheit
    containerTemp.addEventListener('click', changeTemp)
    
    function changeTemp() {
    tempNumberNow = temperatureNumber.innerHTML

    if (tempUnit.innerHTML === "°C") {
        let f = (tempNumberNow * 1.8) + 32
        tempUnit.innerHTML = "°F"
        temperatureNumber.innerHTML = Math.round(f)
    }
    else {
        let c = (tempNumberNow - 32) / 1.8
        tempUnit.innerHTML = "°C"
        temperatureNumber.innerHTML = Math.round(c)
    }
}