const cardHolder = document.getElementById("cardHolder");
const chartHolder = document.getElementById("chartHolder");
//const params = new URLSearchParams(window.location.search);


loadInfo();

async function loadInfo()
{
    let names = [];

    const data = sessionStorage.getItem('names');
    if (data)
    {
        names = JSON.parse(data);
    }
    else
    {
        return;
    }

    let datas = [];
    for (let index = 0; index < names.length; index++)
    {
        const element = names[index];
        let data2 = await getData(element);
        createCard(data2);
        datas.push(data2);
    }
    createChart(datas);
}

async function getData(name)
{
    try
    {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + name);

        if (!response.ok)
        {
            throw new Error("Unable to fetch data");
        }

        return await response.json();
    }
    catch (error)
    {
        console.error(error);
    }
}
function createCard(data)
{
    const card = document.createElement("div");
    card.classList.add("card");
    cardHolder.append(card);
    
    {
        const element = document.createElement("h1");
        element.innerText = data.name;
        card.append(element);
    }
    
    {
        const element = document.createElement("img");
        element.src = data.sprites.front_default;
        card.append(element);
    }
}

function createDataset(data)
{
    let chartLabel = data.name;

    let chartData = data.stats.map(element => element.base_stat);
    [chartData[3], chartData[5]] = [chartData[5], chartData[3]]; //swap speed and sp. attack to match games

    return {label: chartLabel, data: chartData, borderWidth: 1};
}


function createChart(datas)
{
    const datasets = datas.map(element => createDataset(element));

    let chartLabels = ["HP", "Attack", "Defense", "Speed", "Sp. Def", "Sp. ATK"];
    //let chartLabels = datas[0].stats.map(element => element.stat.name);

    new Chart(chartHolder, {
    type: 'radar',
    data: {
      labels: chartLabels,
      datasets: datasets
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