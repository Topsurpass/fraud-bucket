import { Bar } from "react-chartjs-2";
import { data } from "@/data/charts-data";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
);

const chartData = {
	labels: data.map((item) => item.year),
	datasets: [
		{
			label: "Total fraud",
			data: data.map((item) => item.total),
			backgroundColor: "rgba(75, 192, 192, 0.6)",
		},
		{
			label: "Recovered",
			data: data.map((item) => item.recovered),
			backgroundColor: "rgba(54, 162, 235, 0.6)",
		},
		{
			label: "Pending",
			data: data.map((item) => item.pending),
			backgroundColor: "rgba(255, 206, 86, 0.6)",
		},
	],
};

export const BarChart = () => {
    const options = {
		responsive: true,
		plugins: {
			title: {
				display: true,
				text: "Yearly Fraud Analysis",
            },
		},
	};

    return <Bar options={options} data={chartData} />;
}