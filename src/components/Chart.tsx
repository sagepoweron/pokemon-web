import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);


export interface BaseStat {
  base_stat: number
  effort: number
  stat: Stat
}

export interface Stat {
  name: string
  url: string
}



export function Chart({name, stats}: {name:string, stats:BaseStat[]})
{
    if (stats.length === 0)
    {
        return(<div>No Results</div>);
    }


    [stats[5], stats[3]] = [stats[3], stats[5]]; //swap sp attack and speed to match game layout

    //let myData = [stats[0].base_stat, stats[1].base_stat, stats[2].base_stat, stats[5].base_stat, stats[4].base_stat, stats[3].base_stat];

    const chartData = {
        //labels: [stats[0].stat.name, stats[1].stat.name, stats[2].stat.name, stats[3].stat.name, 'Purple', 'Orange'],
        //labels: ["HP", "Attack", "Defense", "Speed", "Sp. Def", "Sp. ATK"],
        labels: stats.map((element) => element.stat.name),
        datasets: [{
            label: name,
            data: stats.map((element) => element.base_stat),
            backgroundColor: "rgba(255, 0, 0, 0.3)",
            borderColor: "rgba(255, 0, 0, 1)",
            borderWidth: 1
        }]
    }
    const chartOptions = {
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

    return(
        <Radar data={chartData} options={chartOptions}>

        </Radar>
    );
}