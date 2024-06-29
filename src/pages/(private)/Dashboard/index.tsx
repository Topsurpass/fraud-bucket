import { CardCompo } from "@/components/features/Card";
import { Chart } from "react-google-charts";
import { dashboardData, topAnalyst } from "@/data/dashboard-data";
import { addCommas } from "@/utils/helpers";
import { GiLaurelCrown } from "react-icons/gi";

export default function Dashboard() {
	const data = [
		["Year", "Total", "Recovered", "Pending"],
		["2021", 5065134, 3065134, 2000000],
		["2022", 5065134, 3065134, 2000000],
		["2023", 5065134, 3065134, 2000000],
		["2024", 5065134, 3065134, 2000000],
	];

	const options = {
		chart: {
			title: "Yearly Fraud Analysis",
			subtitle: "",
		},
	};
	const sortedAnalysts = [...topAnalyst].sort((a, b) => b.fraudCount - a.fraudCount);
	return (
		<section className="flex flex-col gap-6 pb-[55px] md:flex-row md:gap-10">
			
			<div className="md:w-2/3 flex flex-col gap-2">
				<div className="flex flex-col gap-5">
					<div><p className="font-bold md:text-lg">Fraud Overview</p></div>
					<div className="flex w-full flex-col gap-6 md:gap-3">
						{dashboardData.slice(0,1).map((dashboard, idx) => (
							<CardCompo
								className="flex flex-grow justify-center h-[70px] px-3"
								key={idx}
							>
								<div className="flex h-full flex-col justify-center">
									<p className="text-slate-400 text-sm">{dashboard.title}</p>

									<p className="text-2xl font-bold md:text-2xl">
										{addCommas(dashboard.amount)}
									</p>
								</div>
							</CardCompo>
						))}
					</div>
				</div>
					<div className="flex flex-col gap-2">
						<div className=""><p className="font-bold">Recovery Overview</p></div>
						<div className="flex">
							{dashboardData.slice(1,).map((dashboard, idx) => (
							<CardCompo
								className="flex justify-center w-full border h-[70px] px-3"
								key={idx}
							>
								<div className="flex flex-col justify-center">
									<p className="text-slate-400 text-sm">{dashboard.title}</p>
									<p className=" font-bold">
										{addCommas(dashboard.amount)}
									</p>
								</div>
							</CardCompo>
						))}
					</div>
				</div>			
				<div className="flex flex-col gap-2 w-full">
					<p className="font-bold">Fraud statistics</p>
					<div className="w-full">
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
				</div>			
			</div>
			<div className="md:w-[30%] flex flex-col gap-2">
				<div><p className="font-bold">Top Fraud Analyst</p></div>
				<div className="border bg-etzBlue-800 text-white p-3 rounded-xl">
					<div className="flex justify-between px-3 text-sm">
						<p>Names</p>
						<p>No of frauds detected</p>
					</div>
					{sortedAnalysts.map((analyst, idx) => (
						<div className="w-full flex justify-between p-3" key={idx}>
							<div>
								<p className="text-sm">{analyst.name}</p>
								<p className="text-xs">{ analyst.title}</p>
							</div>
							<div className="flex justify-center items-center gap-2">
								<p>{analyst.fraudCount}</p>
								{idx === 0 && <GiLaurelCrown className=""/>}
							</div>

						</div>
					))
						
					}
				</div>

			</div>
			
		</section>
	);
}
