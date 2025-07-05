const searchButton = document.getElementById("searchButton");
const clearButton = document.getElementById("clear");
const searchText = document.getElementById("searchText");
const pokemonList = document.getElementById("pokemonList");

searchButton.addEventListener("click", searchForPokemon);
clearButton.addEventListener("click", clearList);

//fetchData();


async function searchForPokemon()
{
    clearList();

    try
    {
        const searchValue = searchText.value.toLowerCase();
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + searchValue);

        if (!response.ok)
        {
            throw new Error("Unable to fetch data");
        }

        const data = await response.json();

        const container = document.createElement("li");
        container.classList.add("card");
        pokemonList.append(container);
        
        const name = document.createElement("h1");
        name.innerText = data.name;
        container.append(name);

        const image = document.createElement("img");
        image.src = data.sprites.front_default;
        container.append(image);
    }
    catch (error)
    {
        console.error(error);
    }
}




async function searchForPokemonByName(searchName)
{
    try
    {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + searchName.toLowerCase());

        if (!response.ok)
        {
            throw new Error("Unable to fetch data");
        }

        const data = await response.json();

        const container = document.createElement("div");
        pokemonList.append(container);
        
        const name = document.createElement("h1");
        name.innerText = data.name;
        container.append(name);

        const image = document.createElement("img");
        image.src = data.sprites.front_default;
        container.append(image);
    }
    catch (error)
    {
        console.error(error);
    }
}













async function searchForMultiplePokemon()
{
    try
    {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=5&offset=0");

        if (!response.ok)
        {
            throw new Error("Unable to fetch data");
        }

        const data = await response.json();
        console.log(data);

        data.results.forEach(element => {
            const container = document.createElement("div");
            pokemonList.append(container);
            
            const name = document.createElement("h1");
            name.innerText = element.name;
            container.append(name);

            const button = document.createElement("button");
            button.innerText = "Search";
            button.addEventListener("click", () => {
                searchForPokemonByName(element.name);
            });
            container.append(button);
        });

        
    }
    catch (error)
    {
        console.error(error);
    }
}


function clearList()
{
    pokemonList.replaceChildren();
}