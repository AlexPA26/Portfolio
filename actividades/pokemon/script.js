const API = "https://pokeapi.co/api/v2/pokemon/"
const imgPokemon = document.getElementById("image")
const namePokemon = document.getElementById("name")
const numberPokemon = document.getElementById("number")
const boton = document.querySelector(".boton")
const cardElement = document.getElementById("card")

const weightPokemon = document.getElementById("weight")
const heightPokemon = document.getElementById("height")

const botonEnviar = document.getElementById("enviar")
const valorBusqueda = document.getElementById("busqueda")

let loading = document.getElementById("loading")

botonEnviar.addEventListener('click', function (e)
{
    e.preventDefault()

    let busqueda = valorBusqueda.value
    mostrarBusqueda(busqueda)
})



function mostrarBusqueda(name)
{
    loading.textContent = "Cargando..."
    let fetchData = async (url) =>
    {
        try
        {
            let response = await fetch(url)

            
            if (!response.ok)
            {
                loading.textContent = "No se ha encontrado al Pokémon"
                throw new Error("Error de red:" + response.statusText)
            }
            let data = await response.json()

            
            imgPokemon.src = data.sprites.other.dream_world.front_default
            namePokemon.innerText = data.name
            weightPokemon.innerText = (data.weight / 10) + "kg"
            heightPokemon.innerText = (data.height / 10) + "m"
            numberPokemon.innerText = "ID: " + data.id

            console.log(number);

            cardElement.querySelectorAll(".type-button").forEach((button) => button.remove())
            let types = data.types

            types.forEach((element) =>
            {
                let newButton = document.createElement("button")
                newButton.classList.add(element.type.name)
                newButton.classList.add("type-button")
                newButton.innerText = element.type.name
                cardElement.appendChild(newButton)
            });
            cardElement.hidden = false;
            loading.textContent = ""
        }
        catch (error)
        {
            console.error(error)
        }
    };

    fetchData(`${API}${name}`)
}

boton.addEventListener('click', function (e)
{
    cardElement.hidden = true;
    loading.textContent = "Cargando..."
    let fetchData = async (url) =>
    {
        try
        {
            let response = await fetch(url)
            if (!response.ok)
            {
                loading.textContent = "No se ha encontrado al Pokémon"
                throw new Error("Error de red:" + response.statusText)
            }
            let data = await response.json()

            
            imgPokemon.src = data.sprites.other.dream_world.front_default
            namePokemon.innerText = data.name
            weightPokemon.innerText = (data.weight / 10) + "kg"
            heightPokemon.innerText = (data.height / 10) + "m"
            numberPokemon.innerText = number

            cardElement.querySelectorAll(".type-button").forEach((button) => button.remove())
            let types = data.types

            types.forEach((element) =>
            {
                console.log(element.type.name);

                let newButton = document.createElement("button")
                newButton.classList.add(element.type.name)
                newButton.classList.add("type-button")
                newButton.innerText = element.type.name
                cardElement.appendChild(newButton)
            });
            cardElement.hidden = false;
            loading.textContent = ""
        }
        catch (error)
        {
            console.error(error)
        }
    };

    function getRandomNumber(min, max)
    {
        return Math.floor(Math.random() * (max - min)) + min
    }

    let number = getRandomNumber(1, 1000)
    fetchData(`${API}${number}`)

})

function mostrarRandom()
{
    
}
