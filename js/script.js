// APUNTAR A LOS ELEMENTOS DEL DOM
const btngetJoke = document.getElementById('fetchJoke');
const jokeContainer = document.getElementById('container');

// DEFINIENDO VARIABLES AUXILIARES
let counterJoke = localStorage.length;
let keyJoke = '';
console.log('Existen ' + counterJoke + ' elementos en el localstorage');

// FUNCION QUE OBTIENE UN CHISTE A TRAVES DE LA API
function getJokeByFetch(){

    fetch('https://api.chucknorris.io/jokes/random')
    .then(response => response.json())
    .then(data => {
       insertJokesAtDom(data.value);
       keyJoke = 'joke' + String(counterJoke);
       localStorage.setItem(keyJoke, data.value);
       counterJoke++;
    });
}

// FUNCION QEU INSERTA ELEMENTOS EN EL DOM
function insertJokesAtDom(joke){
    const jokeDiv = document.createElement('div');
    jokeDiv.classList = 'jokeDivStyle';
    const jokeText = document.createElement('h3');
    jokeText.textContent = joke;
    const btnDeleteJoke = document.createElement('button')
    btnDeleteJoke.innerHTML = "Delete Joke";
    btnDeleteJoke.classList = 'btnDeleteJoke';

    jokeDiv.appendChild(jokeText);
    jokeDiv.appendChild(btnDeleteJoke);
    jokeContainer.appendChild(jokeDiv);
}

// DEFINIENDO LAS INTERRUPCIONES
btngetJoke.addEventListener('click', getJokeByFetch);