console.log('Inside Momentum Lab')


function init(){


// Part1: Get The Data

//HTML Elements
    const randomImgElement = document.querySelector('#unsplashImg')
    const temperatureTextElement = document.querySelector('#temperature')
    const temperatureIconElement = document.querySelector('#temperatureIcon')
    const temperatureCityElement = document.querySelector('#city')
    const dataElement = document.querySelector('#date')
    const quoteElement = document.querySelector('#quote')
    const quoteAuthorElement = document.querySelector('#quoteAuthor')
    const listElement = document.querySelector('#list')
    const todoInputElement = document.querySelector('#todoListInput')



//////////////////////////////////////////////// Random Photo from Unsplash ////////////////////////////////////////////////

    async function getRandomUnsplahPhoto(){
        try{
            const response = await axios({ //axios takes an argument (an obj)
                    method: 'get',
                    url: "https://api.unsplash.com/photos/random?client_id=mi0ZntaQ2xcRWGshVIoC_bKwsqBQS2WJLP2BIcMCEk0&query=nature&orientation=landscape"
                })
                console.log(response.data) 
        
                // If image height is less than screen height, make it cover
        
                randomImgElement.style.backgroundImage = "url(" + response.data.urls.raw + ")"
        }
        catch( error ){
            console.error("Something went wrong while fetching the image:", error);
        }
    }

    getRandomUnsplahPhoto()


//////////////////////////////////////// Weather and Temperature from Open Weather ////////////////////////////////////////

    async function getOpenWeatherTemperature(){
        const response = await axios({ //axios takes an argument (an obj)
                method: 'get',
                url: "https://api.openweathermap.org/data/2.5/weather?q=mecca&appid=94d1b061cce4a09f00d0ebf1fcdc8f88&units=metric"
            })
            console.log(response.data) 
            temperatureTextElement.textContent = `${response.data.main.temp}°C `
            //https://rodrigokamada.github.io/openweathermap/images/
            //console.log(response.data.weather[0].main)
            temperatureIconElement.src = `https://rodrigokamada.github.io/openweathermap/images/${response.data.weather[0].icon}_t.png`
            temperatureCityElement.textContent = response.data.name

    }

    getOpenWeatherTemperature()

    
/////////////////////////////////////////////// Random Quote from Zenquotes ///////////////////////////////////////////////
 
    async function getForismaticQuote(){ //using Zenquotes API
        const response = await axios({ //axios takes an argument (an obj)
                method: 'get',
                url: "https://zenquotes.io/api/random"
            })
            //console.log(response) 
            console.log(response.data[0].q) 
            console.log(response.data[0].a) 
            quoteElement.textContent = `"${response.data[0].q}"`
            quoteAuthorElement.textContent = `-${response.data[0].a}`
            

    }

    getForismaticQuote()

/////////////////////////////////////////////////////// Today's Date ///////////////////////////////////////////////////////

    let todaysDate = new Date()
    let hour = todaysDate.getHours();
    let minute = todaysDate.getMinutes();

    dataElement.textContent = `${hour}:${minute}`


//////////////////////////////////////////////////////// To-do List ////////////////////////////////////////////////////////
    todoInputElement.addEventListener("keypress", function(event){
        if (event.key === "Enter") {
            if(todoInputElement.value !== ''){
                // const newToDoItem = todoInputElement.value
                const newToDoItem = document.createElement('li')
                //newToDoItem.textContent = todoInputElement.value

                const newCheckbox = document.createElement('input')
                newCheckbox.type = 'checkbox'
                newCheckbox.classList.add('todo-checkbox')

                // newToDoItem.addchile(newCheckbox)
                newToDoItem.appendChild(newCheckbox)
                newToDoItem.appendChild( document.createTextNode( todoInputElement.value)); //
        
                listElement.appendChild(newToDoItem)
                todoInputElement.value=''

        
            }
        }

    })


}

document.addEventListener('DOMContentLoaded', init)


