import { Radar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
} from 'chart.js';
import type { Pokemon } from "../types";
import { isNullOrUndef } from "chart.js/helpers";
ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

export function Chart({pokemon}: {pokemon: Pokemon})
{
    if (isNullOrUndef(pokemon))
    {
        return(<div>No Results</div>);
    }

    const stats = [...pokemon.stats];
    [stats[5], stats[3]] = [stats[3], stats[5]]; //swap sp attack and speed to match game layout

    const chartData = {
        labels: ["HP", "Attack", "Defense", "Speed", "Sp. Def", "Sp. ATK"],
        //labels: pokemon.stats.map((element) => element.stat.name),
        datasets: [{
            label: "Base Stats",
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