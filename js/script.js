// APUNTAR A LOS ELEMENTOS DEL DOM
const btngetJoke = document.getElementById('fetchJoke');
const btnRecoverJoke = document.getElementById('recoverJokes');
const jokeContainer = document.getElementById('container');

// DEFINIENDO VARIABLES AUXILIARES
let counterJoke = localStorage.length;
let keyJoke = '';
console.log('Existen ' + counterJoke + ' elementos en el localstorage');

// CONTROL INICIAL DE LA APLICACION
checkJokesAtLocalStorage();


// CHEQUEA SI EXISTEN CHISTES GUARDADOS PARA CONTROLAR EL ESTADO DE LOS BOTONES
function checkJokesAtLocalStorage(){
    if(localStorage.length > 0)
    {
        btnRecoverJoke.style.display = 'block';
    } 
    else{
        btnRecoverJoke.style.display = 'none';        
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
   /*  console.log(jokeContainer.childNodes[3]); */
        for(let i = 0; i <= localStorage.length; i++){
        let joke = localStorage.key(i);
        let jokeTextLocalStorage = localStorage.getItem(joke);
        console.log(jokeTextLocalStorage);


            localStorage.removeItem(joke);
            jokeContainer.removeChild(jokeContainer.childNodes[i]);
            break;
        }
}

// DEFINIENDO LAS INTERRUPCIONES
btngetJoke.addEventListener('click', getJokeByFetch);
btnRecoverJoke.addEventListener('click', recoverJokes);