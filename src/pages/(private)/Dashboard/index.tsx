import { CardCompo } from "@/components/features/Card";
import { Chart } from "react-google-charts";
import { dashboardData } from "@/data/dashboard-data";
import { addCommas } from "@/utils/helpers";

export default function Dashboard() {
	const data = [
		["Year", "Total", "Recovered", "Pending"],
		["2024", 5065134, 3065134, 2000000],
	];

	const options = {
		chart: {
			title: "Yearly Fraud Analysis",
			subtitle: "",
		},
	};

	return (
		<section className="flex flex-col gap-6 pb-[55px] md:flex-row md:gap-10">
			<div className="flex w-full flex-col gap-6 md:w-1/2 md:gap-3">
				{dashboardData.map((dashboard, idx) => (
					<CardCompo
						className="flex flex-grow items-center justify-center"
						key={idx}
					>
						<div className="flex h-full flex-col items-center justify-center mt-3">
							<p className="text-2xl font-bold md:text-3xl">
								{addCommas(dashboard.amount)}
							</p>
							<p className="text-slate-400">{dashboard.title}</p>
						</div>
					</CardCompo>
				))}
			</div>
			<div className="w-full md:w-1/2">
				<div className="h-96 rounded-lg border bg-etzBlue-800 p-4 text-xs shadow-lg md:h-full">
					<Chart
						chartType="Bar"
						width="100%"
						height="100%"
						data={data}
						options={options}
						style={{
							backgroundColor: "#ffffff",
							padding: "10px",
							borderRadius: "8px",
						}}
					/>
				</div>
			</div>
		</section>
	);
}
