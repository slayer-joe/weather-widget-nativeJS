const weather = () => {

    
    function getPosition() {
     
        return new Promise((res, rej) => {
            navigator.geolocation.getCurrentPosition(res, rej);
        });
    }
    
    async function main() {
        let position = await getPosition();  
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;

        return [latitude,longitude];
    }
    
    
    function createApp() {
        let appWrap = document.createElement('div');
        appWrap.classList.add('wrap');
        appWrap.innerHTML = `
        <div class="input-block">
        <h2 class="title">Погода</h2>
        <input type="text" name="city" placeholder="Введите навзвание города">
        </div>
        `
       
        document.body.appendChild(appWrap);
        let input = document.querySelector('input');
        getLocalWeatherData();

        let okButton = document.createElement('button');
            okButton.classList.add('ok');
            okButton.textContent = 'OK';

        input.addEventListener('click', (event)=>{
            
            document.querySelector('.input-block').appendChild(okButton)

            okButton.addEventListener('click', (ev)=>{
                getData(event.target.value);
                event.target.value = '';
                ev.target.remove();
            })
            
        })
        input.addEventListener('keyup', (event)=>{
  
        
                if(event.keyCode === 13) {
                    getData(event.target.value);
                    event.target.value = '';
                    okButton.remove();
                }
      
        })
    
    }
    createApp();
    
    async function getLocalWeatherData() {

        let arr = await main();

        positionURL = `http://api.weatherapi.com/v1/current.json?key=512f3f7917664e3e9da163831211101&lang=ru&q=${arr}`,

        positionResponse = await fetch(positionURL),
        positionData = await positionResponse.json();
        console.log(positionData)
   
            localWeather(positionData);

    }

    function localWeather(data) {
        

        let localPos = document.createElement('div');
        localPos.classList.add('local');
        document.querySelector('.wrap').appendChild(localPos);
        localPos.innerHTML = `
        <div class="location">
        <h4 class="country">${data.location.country}</h4>
        <p class="city">${data.location.name}</p>
        </div><div>
        <div class="time">
        <p class="date">${new Date().getDate()}.${'0'+ (new Date().getMonth() + 1)}.${new Date().getFullYear()}</p>
        <p class="time">${new Date().getHours()}:${new Date().getMinutes()}</p>
        </div>
        <div class="location-info">
        <p class="condition">${data.current.condition.text}</p>
        <img src="${data.current.condition.icon}">
       
        <p class="temp">${data.current.temp_c}&deg</p>
        </div></div>
        `
        switch(true) {
            case +data.current.temp_c <= -20:
                document.querySelector('.wrap').style.background = 'linear-gradient(90deg, rgba(231,53,53,0) 0%, rgba(50,50,240,1) 100%)';
            break;//темно фиолетовый
            case +data.current.temp_c > -20 && +data.current.temp_c <= -10:
                document.querySelector('.wrap').style.background = 'linear-gradient(90deg, rgba(231,53,53,0) 0%, rgba(50,137,240,1) 100%)';
            break;//темный синий
            case +data.current.temp_c <= 0 && +data.current.temp_c > -10:
            document.querySelector('.wrap').style.background = 'linear-gradient(90deg, rgba(231,53,53,0) 0%, rgba(50,204,240,1) 100%)';
            break;//голубой
            case +data.current.temp_c > 0 && +data.current.temp_c <= 10:
                document.querySelector('.wrap').style.background = 'linear-gradient(90deg, rgba(231,53,53,0) 0%, rgba(50,240,145,1) 100%)';
            break;//зеленый
            case +data.current.temp_c > 10 && +data.current.temp_c <= 20:
                document.querySelector('.wrap').style.background = 'linear-gradient(90deg, rgba(231,53,53,0) 0%, rgba(233,240,50,1) 100%)';
            break;//желтый
            case +data.current.temp_c > 20 && +data.current.temp_c < 29:
                document.querySelector('.wrap').style.background = 'linear-gradient(90deg, rgba(231,53,53,0) 0%, rgba(255, 0, 0, 1))';
            break;//оранжевый
            case +data.current.temp_c >= 30:
                document.querySelector('.wrap').style.background = 'linear-gradient(90deg, rgba(231,53,53,0) 0%, rgba(255, 0, 0, 1))';
            break;//красный
          


           
            
        }
    }
   
            let app = document.createElement('div');
            app.classList.add('weather');

    


    async function getData(city) {
    try{
        currentUrl = `http://api.weatherapi.com/v1/current.json?key=512f3f7917664e3e9da163831211101&q=${city}&lang=ru`,
        predictUrl = `http://api.weatherapi.com/v1/forecast.json?key=512f3f7917664e3e9da163831211101&q=${city}&days=4&lang=ru`;
        

        let currentResponse = await fetch(currentUrl),
        currentData = await currentResponse.json(),
        predictResponse = await fetch(predictUrl),
        predictData = await predictResponse.json();
        console.log(predictData)
        showCurrentWeather(currentData, predictData)
        
    } catch {
       alert('Не верный город')
    }
       
    }

    
    

    function showCurrentWeather(data, predict) {
        app.innerHTML = `
        <div class="now">
        <h2 class="country">${data.location.country}</h2>
        <h3 class="city">${data.location.name}</h3>
        <p class="time">Сейчас</p>
        <img src="${data.current.condition.icon}">
        <p class="temp">${Math.round(data.current.temp_c)}&deg</p></div>
        `

        document.querySelector('.wrap').insertBefore(app, document.querySelector('.local'));

        switch(true) {
        case +data.current.temp_c <= -20:
            document.querySelector('.wrap').style.backgroundColor = 'rgba(50,50,240,1)';
        break;//темно фиолетовый
        case +data.current.temp_c > -20 && +data.current.temp_c <= -10:
            document.querySelector('.wrap').style.backgroundColor = 'rgba(50,137,240,1)';
        break;//темный синий
        case +data.current.temp_c <= 0 && +data.current.temp_c > -10:
        document.querySelector('.wrap').style.backgroundColor = 'rgba(50,204,240,1)';
        break;//голубой
        case +data.current.temp_c > 0 && +data.current.temp_c <= 10:
            document.querySelector('.wrap').style.backgroundColor = 'rgba(50,240,145,1)';
        break;//зеленый
        case +data.current.temp_c > 10 && +data.current.temp_c <= 20:
            document.querySelector('.wrap').style.backgroundColor = 'rgba(233,240,50,1)';
        break;//желтый
        case +data.current.temp_c > 20 && +data.current.temp_c < 29:
            document.querySelector('.wrap').style.backgroundColor = 'rgba(255, 0, 0, 1)';
        break;//оранжевый
        case +data.current.temp_c >= 30:
            document.querySelector('.wrap').style.backgroundColor = 'rgba(255, 0, 0, 1)';
        break;//красный
    }

        
        predict.forecast.forecastday.forEach((element) => {
            
                let predictDay = document.createElement('div');
                predictDay.classList.add('day');
                app.appendChild(predictDay);
                predictDay.innerHTML = `
                <p class="date">${element.date}</p>
                <img src="${element.day.condition.icon}">
                <div class="temp">
                <p class="mintemp">${Math.round(element.day.maxtemp_c)}&deg</p>&nbsp&nbsp<p class="maxtemp">${Math.round(element.day.mintemp_c)}&deg</p>
                </div>`
            
           
        });
      
    }
}

window.addEventListener('load', weather);