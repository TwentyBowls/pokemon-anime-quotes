let sprite = document.querySelector(".sprite")
let says = document.querySelector(".says")
let animeQuote = document.querySelector(".animeQuote")

document.querySelector(".choiceBtn").addEventListener("click", genPokeChoice)
document.querySelector(".randBtn").addEventListener("click", genPokeRand)

function genPokeChoice(){
    //random name fetch
    fetchPokeChoice()
}

function genPokeRand(){
    //choose for me fetch
    fetchPokeRand()
}

function fetchPokeChoice(){
    let input = document.querySelector(".input").value
    //pokemon fetch
    fetch(`https://pokeapi.co/api/v2/pokemon/${input}`)
    .then(res => res.json())
    .then(data => {
        // displays the sprite
        sprite.src = data.sprites.front_default
        // gets the name of the type of pokemon
        pokemonType = data.name
        // capitalizes the first letter of the pokemon name type
        pokemonType = pokemonType.charAt(0).toUpperCase() + pokemonType.slice(1)
        // says = `${randName} the ${data.name} says...`
        // console.log(`sprite url is ${sprite}`)
        // console.log(`the pokemon is a ${pokemonType} `)
        setInterval(fetchName(pokemonType), 400)
    })
    .catch(err => {
        console.log(`error ${err}`)
    })    
}

function fetchPokeRand(){
    let randPokeID = Math.ceil(Math.random() * 898)
    //pokemon fetch
    fetch(`https://pokeapi.co/api/v2/pokemon/${randPokeID}`)
    .then(res => res.json())
    .then(data => {
        // displays the sprite
        sprite.src = data.sprites.front_default
        // gets the name of the type of pokemon
        pokemonType = data.name
        // capitalizes the first letter of the pokemon name type
        pokemonType = pokemonType.charAt(0).toUpperCase() + pokemonType.slice(1)
        // says = `${randName} the ${data.name} says...`
        // console.log(`sprite url is ${sprite}`)
        // console.log(`the pokemon is a ${pokemonType} `)
        setInterval(fetchName(pokemonType), 300)
    })
    .catch(err => {
        console.log(`error ${err}`)
    })  
}

function fetchName(pokemonName){
    fetch("https://random-names-api.herokuapp.com/random")
    .then(res => res.json())
    .then(nam => {
        randName = nam.body.name
        // console.log(`randName inside of the fetch is ${randName}`)
        says.innerText = (`${randName} the ${pokemonName} says...`)
        says.classList.add("slideup")
        setInterval( _ => says.classList.remove("slideup"), 300)
        setInterval(fetchQuote(), 300)
    })
    .catch(err => {
        console.log(`error ${err}`)
    }) 
}

function fetchQuote(){
    fetch('https://animechan.vercel.app/api/random')
    .then(response => response.json())
    .then(quote => {
        animeQuote.innerText = `"${quote.quote}"`
        animeQuote.classList.add("slideup")
        setInterval( _ => animeQuote.classList.remove("slideup"), 300)
        // console.log(`anime quote says: ${animeQuote}`)    
    })
    .catch(err => {
        console.log(`error ${err}`)
    })    
}

