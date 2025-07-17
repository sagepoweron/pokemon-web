const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

export async function getPokemon(query: string)
{
    try
    {
        const response = await fetch(BASE_URL + encodeURIComponent(query));

        if (!response.ok)
        {
            throw new Error("Unable to fetch data");
        }

        const data = await response.json();

        if (typeof data.results !== 'undefined')
        {
            return data.results;
        }

        return [data];
    }
    catch (error)
    {
        return [];
    }
}

export async function getPokemonList(offset: string, limit: string)
{
    try
    {
        const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        const response = await fetch(url);

        if (!response.ok)
        {
            throw new Error("Unable to fetch data");
        }

        const data = await response.json();

        return data.results;
    }
    catch (error)
    {
        console.error(error);
    }
}