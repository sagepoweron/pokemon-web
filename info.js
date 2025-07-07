const cardHolder = document.getElementById("cardHolder");

loadInfo();


async function loadInfo()
{
    try
    {
        var params = new URLSearchParams(window.location.search);
        search = params.get("search");

        const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + search);

        if (!response.ok)
        {
            throw new Error("Unable to fetch data");
        }

        const data = await response.json();

        const card = document.createElement("div");
        card.classList.add("card");
        cardHolder.append(card);
        
        const name = document.createElement("h1");
        name.innerText = data.name;
        card.append(name);

        const image = document.createElement("img");
        image.src = data.sprites.front_default;
        card.append(image);
    }
    catch (error)
    {
        console.error(error);
    }
}