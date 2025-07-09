const results = document.getElementById("results");
const searchText = document.getElementById("query");
const searchButton = document.getElementById("searchButton");
const clearButton = document.getElementById("clear");

searchButton.addEventListener("click", onSearchClicked);
clearButton.addEventListener("click", clear);
const offsetButton = document.getElementById("offset");
const limitButton = document.getElementById("limit");
const multiButton = document.getElementById("multi");

multiButton.addEventListener("click", onMultiClicked);

const statsButton = document.getElementById("statsButton");
statsButton.addEventListener("click", onStatsClicked);

//fetchData();


async function onSearchClicked()
{
    clear();
    
    const query = searchText.value.toLowerCase();
    await search(query);
}

async function onMultiClicked()
{
    clear();
    
    //const query = searchText.value.toLowerCase();
    const limit = limitButton.value;
    const offset = offsetButton.value;
    await searchMultiple(offset, limit);
}

function onStatsClicked()
{
    window.location.href = "stats.html";
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

        createResult(data);
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
    window.location.href = "stats.html?" + params.toString();
}



function saveInfo(index)
{
    sessionStorage.setItem("index", index);
}
function save2(index)
{
    sessionStorage.setItem("index2", index);
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

function clear()
{ 
    results.replaceChildren();
}


function capitalizeFirstLetter(str)
{
    const [first, ...rest] = str;
    return first.toUpperCase() + rest.join('');
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

    const saveButton = document.createElement("button");
    saveButton.innerText = "Save";
    saveButton.onclick = () => saveInfo(data.name);
    card.append(saveButton);

    const saveButton2 = document.createElement("button");
    saveButton2.innerText = "Save";
    saveButton2.onclick = () => save2(data.name);
    card.append(saveButton2);
}