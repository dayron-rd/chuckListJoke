// APUNTAR A LOS ELEMENTOS DEL DOM
document.addEventListener('DOMContentLoaded', () => {
   
});
const btngetJoke = document.getElementById('fetchJoke');
const btnRecoverJoke = document.getElementById('recoverJokes');
const btnRemoveAll = document.getElementById('removeAllJokes');
const jokeContainer = document.getElementById('container');
const canvas = document.getElementById('jokeCanva').getContext('2d');

// DEFINIENDO VARIABLES AUXILIARES
let counterJoke = localStorage.length;
let keyJoke = '';
let jokeTextLength;

// DEFINIENDO LA GRAFICA
let jokeData = {
    labels: [],
    datasets: [{
        label: 'Jokes',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.2)', 
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
    }]
}

// DEFINIENDO LA GRAFICA
const jokeChart = new Chart(canvas, {
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

// ACTUALIZACION DE LA GRAFICA
function updateChart(data){

    jokeChart.labels = keyJoke;
    jokeChart.data.datasets[0].data = data.value.length;
    console.log(jokeChart.data.datasets[0].data);
    console.log(jokeChart.data);
    jokeChart.update();
}



// CONTROL INICIAL DE LA APLICACION
checkJokesAtLocalStorage();


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
       updateChart(data);
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
    jokeContainer.appendChild(jokeDiv);
}

// FUNCION QUE ELIMINA EL CHISTE ASOCIADO AL BOTON ENLAZADO
function deleteJoke(){
        for(let i = 0; i <= localStorage.length; i++){
        let joke = localStorage.key(i);
        let jokeTextLocalStorage = localStorage.getItem(joke);
        console.log(jokeTextLocalStorage);
            localStorage.removeItem(joke);
            jokeContainer.removeChild(jokeContainer.childNodes[i]);
            break;
        }
        checkJokesAtLocalStorage();
        if(localStorage.length == 0){
            counterJoke = 0;
        }
}

// FUNCION QUE ELIMINA TODOS LOS CHISTES
function removeAll(){
    localStorage.clear();
    jokeContainer.innerHTML = "";;
    counterJoke = 0;

}






// DEFINIENDO LAS INTERRUPCIONES
btngetJoke.addEventListener('click', getJokeByFetch);
btnRecoverJoke.addEventListener('click', recoverJokes);
btnRemoveAll.addEventListener('click', removeAll);