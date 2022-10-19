const form = document.querySelector('form');
const input = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');


form.addEventListener('submit', async (e) => {
    message1.textContent = 'loading...';
    message2.textContent = '';
    e.preventDefault();
    const weatherResponse = await fetch(`http://localhost:3000/weather?address=${input.value}`);
    const weatherJson = await weatherResponse.json();
    if(weatherJson.error){
        message1.textContent = weatherJson.error;
    } else {
        let { location, forecast } = weatherJson;
        message1.textContent = location;
        message2.textContent = forecast;
    }
});