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

//const statsButton = document.getElementById("statsButton");
//statsButton.addEventListener("click", onStatsClicked);

const compareList = document.getElementById("compareList");
const goComparePageButton = document.getElementById("goComparePage");
goComparePageButton.addEventListener("click", goComparePage);
const clearCompareListButton = document.getElementById("clearCompareList");
clearCompareListButton.addEventListener("click", clearCompare);

const loadingBar = document.getElementById("loadingBar");


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

function goComparePage()
{
    window.location.href = "compare.html";
}






function addCompare(name)
{
    let names = [];

    const data = sessionStorage.getItem('names');
    if (data)
    {
        names = JSON.parse(data);
        if (names.includes(name)) return;
    }

    names.push(name);
    sessionStorage.setItem("names", JSON.stringify(names));

    updateCompareList();
}
function removeCompare(name)
{
    const data = sessionStorage.getItem('names');
    if (data)
    {
        let names = JSON.parse(data);

        const index = names.indexOf(name);
        if (index > -1)
        {
            names.splice(index, 1);
        }

        sessionStorage.setItem("names", JSON.stringify(names));
    }
    
    updateCompareList();
}

function updateCompareList()
{
    compareList.replaceChildren();

    const data = sessionStorage.getItem('names');
    if (data)
    {
        let names = JSON.parse(data);

        for (let index = 0; index < names.length; index++)
        {
            const name = names[index];
            createCompareCard(name);
        }
    }
}
updateCompareList();


function createCompareCard(name)
{
    const card = document.createElement("li");
    card.classList.add("result");
    compareList.append(card);

    {
        const element = document.createElement("h4");
        element.innerText = capitalizeFirstLetter(name);
        card.append(element);
    }

    {
        const button = document.createElement("button");
        button.innerText = "Remove \u{1F7A8}";
        button.onclick = () => removeCompare(name);
        card.append(button);
    }
}







function clearCompare()
{
    sessionStorage.clear();
    compareList.replaceChildren();
}





async function searchMultiple(offset, limit)
{
    try
    {
        loadingBar.classList.remove("hidden");

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

        loadingBar.classList.add("hidden");
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
    infoButton.innerText = "Info \u{2192}";
    infoButton.onclick = () => goInfoPage(data.name);
    card.append(infoButton);

    {
        const button = document.createElement("button");
        button.innerText = "Compare";
        button.onclick = () => addCompare(data.name);
        card.append(button);
    }
    
}