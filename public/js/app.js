const weatherForm=document.querySelector('form');

const search=document.querySelector('input');

const messageOne=document.querySelector('#message-1');
const messageTwo=document.querySelector('#message-2');
const messageThree=document.querySelector('#message-3');
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    messageOne.textContent='Loading...';
    messageTwo.textContent='';
    messageThree.textContent='';
    const location=search.value;

    fetch('/weather?address='+location+'').then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error;
        }
        else{
            messageOne.textContent=data.location+'. Current Date and time:'+data.forecastData.currenttime;
            messageTwo.textContent='The temperature outside is '+data.forecastData.temperature+' degree celcius with humity '+data.forecastData.humidity;
            messageThree.textContent='Its '+data.forecastData.descriptions+'. The temperature feels like '+data.forecastData.feelslike+' degree celcius';
        }
    })
})
})