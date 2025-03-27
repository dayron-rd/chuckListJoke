// APUNTAR A LOS ELEMENTOS DEL DOM
/* document.addEventListener('DOMContentLoaded', () => {
}); */

const btngetJoke = document.getElementById('fetchJoke');
const btnRecoverJoke = document.getElementById('recoverJokes');
const btnRemoveAll = document.getElementById('removeAllJokes');
const jokeContainer = document.getElementById('container');
const canvas = document.getElementById('jokeCanva').getContext('2d');

// DEFINIENDO VARIABLES AUXILIARES
let counterJoke = localStorage.length;
let keyJoke = '';
let jokeTextLength;

// CONTROL INICIAL DE LA APLICACION
checkJokesAtLocalStorage();

// DEFINIENDO DOATOS DE LA GRAFICA
    let jokeData = {
        labels: [],
        datasets: [{
            label: 'Jokes',
            data: [],
            backgroundColor: 'rgba(36, 27, 29, 0.2)', 
            borderColor: 'rgba(36, 27, 29, 1)',
            borderWidth: 1
        }]
    }
    
// DEFINIENDO LA GRAFICA
    let jokeChart = new Chart(canvas, {
        type: 'bar',
        data: jokeData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    jokeChart.id = 'jokeCanva';
      
    //console.log(jokeChart.data.datasets[0].data[0]);
    //jokeChart.destroy();

// CHEQUEA SI EXISTEN CHISTES GUARDADOS PARA CONTROLAR EL ESTADO DE LOS BOTONES
function checkJokesAtLocalStorage(){
    if(localStorage.length > 0)
    {
        btnRecoverJoke.style.display = 'block';
        btnRemoveAll.style.display = 'block';

    } 
    else{
        btnRecoverJoke.style.display = 'none';        
        btnRemoveAll.style.display = 'none';
    }
}

// FUNCION QUE OBTIENE UN CHISTE A TRAVES DE LA API
function getJokeByFetch(){
    fetch('https://api.chucknorris.io/jokes/random')
    .then(response => response.json())
    .then(data => {
       insertJokesAtDom(data.value);
       keyJoke = 'joke' + String(counterJoke);
       localStorage.setItem(keyJoke, data.value);
       counterJoke++;
       checkJokesAtLocalStorage();
         jokeData.labels.push(keyJoke);
         jokeData.datasets[0].data.push(data.value.length);
         jokeChart.update();

    });
}

// FUNCION QUE RECUPERA LOS CHISTES ALMACENADOS EN EL LOCALSTORAGE
function recoverJokes(){
    for(let i = 0; i <= localStorage.length; i++){
        let joke = localStorage.key(i);
        let jokeText = localStorage.getItem(joke);
        insertJokesAtDom(jokeText);
    }
}

// FUNCION QUE INSERTA ELEMENTOS EN EL DOM
function insertJokesAtDom(joke){
    const jokeDiv = document.createElement('div');
    jokeDiv.classList = 'jokeDivStyle';
    const jokeText = document.createElement('h3');
    jokeText.textContent = joke;
    const btnDeleteJoke = document.createElement('button');
    btnDeleteJoke.innerHTML = "Delete Joke";
    btnDeleteJoke.classList = 'btnDeleteJoke';
    btnDeleteJoke.addEventListener('click', deleteJoke);
    jokeDiv.appendChild(jokeText);
    jokeDiv.appendChild(btnDeleteJoke);
    jokeDiv.id = counterJoke;
    jokeContainer.appendChild(jokeDiv);
}

// FUNCION QUE ELIMINA EL CHISTE ASOCIADO AL BOTON ENLAZADO
function deleteJoke(){
        for(let i = 0; i <= localStorage.length; i++){
        let joke = localStorage.key(i);
        let jokeTextLocalStorage = localStorage.getItem(joke);
        if(jokeTextLocalStorage == this.parentElement.firstChild.textContent){
            localStorage.removeItem(joke);
            console.log(jokeContainer.childNodes[i]);
            const node = document.getElementById(i);
            console.log(node);
            jokeContainer.removeChild(node);

            //ELIMINAR EL CHISTE ESPECIFICO DE LA GRAFICA
            let control = jokeData.datasets[0].data[i];
            jokeData.datasets[0].data.splice(0,i);
            control = jokeData.datasets[0].data;
            jokeChart.update();
            break;
        }
        checkJokesAtLocalStorage();
        if(localStorage.length == 0){
            counterJoke = 0;
        }
}}

// FUNCION QUE ELIMINA TODOS LOS CHISTES
function removeAll(){
    localStorage.clear();
    jokeContainer.innerHTML = "";;
    counterJoke = 0;
    jokeData.labels = [];
    jokeData.datasets[0].data = [];
    jokeChart.update();

}

// DEFINIENDO LAS INTERRUPCIONES
btngetJoke.addEventListener('click', getJokeByFetch);
btnRecoverJoke.addEventListener('click', recoverJokes);
btnRemoveAll.addEventListener('click', removeAll);