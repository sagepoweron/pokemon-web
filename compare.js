const cardHolder = document.getElementById("cardHolder");
const chartHolder = document.getElementById("chartHolder");
//const params = new URLSearchParams(window.location.search);


loadInfo();


async function loadInfo()
{
    let index = sessionStorage.getItem("index");
    console.log(index);

    let index2 = sessionStorage.getItem("index2");

    if (index === null) return;

    try
    {
        
        //search = params.get("search");
        //const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + search);
        //const response = await fetch("https://pokeapi.co/api/v2/pokemon/blissey");
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + index);
        const response2 = await fetch("https://pokeapi.co/api/v2/pokemon/" + index2);

        if (!response.ok)
        {
            throw new Error("Unable to fetch data");
        }

        const data = await response.json();
        const data2 = await response2.json();

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

        createChart(data.stats, data2.stats);
    }
    catch (error)
    {
        console.error(error);
    }
}



function createChart(stats, stats2)
{
    let myData = [stats[0].base_stat, stats[1].base_stat, stats[2].base_stat, stats[3].base_stat, stats[4].base_stat, stats[5].base_stat];
    let myData2 = [stats2[0].base_stat, stats2[1].base_stat, stats2[2].base_stat, stats2[3].base_stat, stats2[4].base_stat, stats2[5].base_stat];

  new Chart(chartHolder, {
    type: 'radar',
    data: {
      //labels: [stats[0].stat.name, stats[1].stat.name, stats[2].stat.name, stats[3].stat.name, 'Purple', 'Orange'],
      labels: ["HP", "Attack", "Defense", "Sp. ATK", "Sp. Def", "Speed"],
      datasets: [{
        label: 'Base Stats',
        data: myData,
        borderWidth: 1
      }, {
        label: 'Second',
        data: myData2,
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


