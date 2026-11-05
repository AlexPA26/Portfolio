const API = "https://pokeapi.co/api/v2/pokemon/"
const imgPokemon = document.getElementById("image")
const namePokemon = document.getElementById("name")
const numberPokemon = document.getElementById("number")
const boton = document.querySelector(".boton")
const cardElement = document.getElementById("card")

const weightPokemon = document.getElementById("weight")
const heightPokemon = document.getElementById("height")

boton.addEventListener('click', function (e)
{
    cardElement.hidden = true;
    console.log("Botón pulsado");
    let fetchData = async (url) =>
    {
        try
        {
            let response = await fetch(url)
            if (!response.ok)
            {
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

});

// const pokeAPI = "https://pokeapi.co/api/v2/pokemon/";
// const imgElement = document.getElementById("image");
// const nameElement = document.getElementById("name");
// const numberElement = document.getElementById("number");
// const cardElement = document.getElementById("card");

// let fetchData = async (url) => {
//   try {
//     let response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`Error de red: ${response.statusText}`);
//     }
//     let data = await response.json();

//     imgElement.src = data.sprites.other.dream_world.front_default;
//     nameElement.innerText = `${data.name}`;
//     numberElement.innerText = `#${number}`;

//     let types = data.types;

//     types.forEach((element) => {
//       console.log(element.type.name);

//       let newButton = document.createElement("button");
//       newButton.classList.add(element.type.name);
//       newButton.innerText = element.type.name;
//       cardElement.appendChild(newButton);
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };

// function getRandomNumber(min, max) {
//   return Math.floor(Math.random() * (max - min)) + min;
// }

// let number = getRandomNumber(1, 151);
// fetchData(`${pokeAPI}${number}`);
