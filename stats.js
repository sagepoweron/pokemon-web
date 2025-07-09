const cardHolder = document.getElementById("cardHolder");
const chartHolder = document.getElementById("chartHolder");
const params = new URLSearchParams(window.location.search);


loadInfo();


async function loadInfo()
{
    try
    {
        
        search = params.get("search");
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + search);
        //const response = await fetch("https://pokeapi.co/api/v2/pokemon/blissey");

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

        //console.log(data.stats[0].stat.name);
        //console.log(data.stats[0].base_stat);

        createChart(data.stats);
    }
    catch (error)
    {
        console.error(error);
    }
}



function createChart(stats)
{
    [stats[5], stats[3]] = [stats[3], stats[5]]; //swap sp attack and speed to match game layout

    let myData = stats.map(element => element.base_stat);
    //let myData = [stats[0].base_stat, stats[1].base_stat, stats[2].base_stat, stats[5].base_stat, stats[4].base_stat, stats[3].base_stat];

  new Chart(chartHolder, {
    type: 'radar',
    data: {
      //labels: [stats[0].stat.name, stats[1].stat.name, stats[2].stat.name, stats[3].stat.name, 'Purple', 'Orange'],
      //labels: ["HP", "Attack", "Defense", "Speed", "Sp. Def", "Sp. ATK"],
      labels: stats.map(element => element.stat.name),
      datasets: [{
        label: 'Base Stats',
        data: myData,
        borderWidth: 1
      }]
    },
    options: {
        responsive: true,
        /*plugins: {
            title: {
                display: true,
                text: 'Chart.js Radar Chart'
            }
        },*/
        scales: {
            r: {
                angleLines: {
                    display: true
                },
                //suggestedMin: 0,
                //suggestedMax: 255
                min: 0,
                max: 255
            }
    }
    }
  });
}


