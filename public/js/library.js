console.log('Client Side JS library loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.querySelector('#msg-1');
const msg2 = document.querySelector('#msg-2');


weatherForm.addEventListener('submit', (e) => {
    //This function will prevent browser from refreshing on submit which is default behaviour
    e.preventDefault();

    const location = search.value;

    msg1.textContent = 'Loading..';
    msg2.textContent = '';      //Clear the message 2

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data && data.error)
            {                
                msg1.textContent = data.error;
            }else{                
                msg1.textContent = data.Location;
                msg2.textContent = data.Forecast;                
            }        
        });
    });
});