const results = document.getElementById("results");

const searchText = document.getElementById("query");
const searchButton = document.getElementById("searchButton");
const clearButton = document.getElementById("clear");
searchButton.addEventListener("click", onSearchClicked);
clearButton.addEventListener("click", clearList);

const offsetButton = document.getElementById("offset");
const limitButton = document.getElementById("limit");
const multiButton = document.getElementById("multi");
multiButton.addEventListener("click", onMultiClicked);

//fetchData();


async function onSearchClicked()
{
    clearList();
    
    const query = searchText.value.toLowerCase();
    await search(query);
}

async function onMultiClicked()
{
    clearList();
    
    //const query = searchText.value.toLowerCase();
    const limit = limitButton.value;
    const offset = offsetButton.value;
    await searchMultiple(offset, limit);
}




async function search(query)
{
    try
    {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + query);

        if (!response.ok)
        {
            throw new Error("Unable to fetch data");
        }

        const data = await response.json();

        createCard(data);
    }
    catch (error)
    {
        console.error(error);
    }
}

function goInfoPage(query)
{
    let params = new URLSearchParams();
    params.append("search", query);
    window.location.href = "info.html?" + params.toString();
}











async function searchMultiple(offset, limit)
{
    try
    {
        const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        const response = await fetch(url);
        //const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0");

        if (!response.ok)
        {
            throw new Error("Unable to fetch data");
        }

        const data = await response.json();

        data.results.forEach(element => {
            createResult(element);
        });

        
    }
    catch (error)
    {
        console.error(error);
    }
}


function clearList()
{
    results.replaceChildren();
}


function capitalizeFirstLetter(str)
{
    const [first, ...rest] = str;
    return first.toUpperCase() + rest.join('');
}

function createCard(data)
{
    const card = document.createElement("div");
    card.classList.add("card");
    results.append(card);
    
    const name = document.createElement("h1");
    name.innerText = capitalizeFirstLetter(data.name);
    card.append(name);

    const image = document.createElement("img");
    image.src = data.sprites.front_default;
    card.append(image);

    const infoButton = document.createElement("button");
    infoButton.innerText = "Info";
    infoButton.onclick = () => goInfoPage(data.name);
    card.append(infoButton);
}

function createResult(data)
{
    const card = document.createElement("li");
    card.classList.add("result");
    results.append(card);

    const name = document.createElement("h4");
    name.innerText = capitalizeFirstLetter(data.name);
    card.append(name);

    const infoButton = document.createElement("button");
    infoButton.innerText = "Info";
    infoButton.onclick = () => goInfoPage(data.name);
    card.append(infoButton);

}