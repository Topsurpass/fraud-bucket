import { CardCompo } from "@/components/features/Card";
import { dashboardData, topAnalyst, fraudBanks } from "@/data/dashboard-data";
import { addCommas } from "@/utils/helpers";
import { GiLaurelCrown } from "react-icons/gi";
import { ColumnDef } from "@tanstack/react-table";
import { BankProps, AnalystProps, TransactionProps } from "@/types/form-types";
import { transactionsData } from "@/data/dashboard-data";
import { BarChart } from "@/components/features/Barchart";
import Table from "@/components/features/Table";

export default function Dashboard() {
	const bankColumns: ColumnDef<BankProps>[] = [
		{ accessorKey: "name", header: "Bank Names" },
		{ accessorKey: "fraudCount", header: "Fraud Cases" },
		{
			accessorKey: "amount",
			header: "Amount",
			cell: ({ row }) => (
				<div>
					<p className="text-sm">{addCommas(row.original.amount)}</p>
				</div>
			),
		},
	];
	const analystColumns: ColumnDef<AnalystProps>[] = [
		{
			accessorKey: "name",
			header: "Analyst",
			cell: ({ row }) => (
				<div>
					<p className="text-sm">{row.original.name}</p>
					<p className="text-xs">{row.original.title}</p>
				</div>
			),
		},
		{
			accessorKey: "fraudCount",
			header: "Fraud Cases",
			cell: ({ row, table }) => {
				const index = table.getCoreRowModel().rows.indexOf(row);
				return (
					<div className="flex items-center gap-2">
						<p>{row.original.fraudCount}</p>
						{index === 0 && (
							<GiLaurelCrown className="-mr-5 text-yellow-300" />
						)}
					</div>
				);
			},
		},
	];
	const transctionsColumns: ColumnDef<TransactionProps>[] = [
		{
			accessorKey: "date",
			header: () => <span className="font-bold">Date</span>,
			cell: ({ row }) => <p className="text-sm">{row.original.date}</p>,
		},
		// {
		// 	accessorKey: "name",
		// 	header: () => <span className="font-bold">Name</span>,
		// 	cell: ({ row }) => <p className="text-sm">{row.original.name}</p>,
		// },
		{
			accessorKey: "merchant",
			header: () => <span className="font-bold">Merchant</span>,
			cell: ({ row }) => (
				<p className="text-sm">{row.original.merchant}</p>
			),
		},

		{
			accessorKey: "amount",
			header: () => <span className="font-bold">Amount</span>,
			cell: ({ row }) => (
				<p className="text-sm">{addCommas(row.original.amount)}</p>
			),
		},
		{
			id: "view",
			header: () => <span className="font-bold">Actions</span>,
			cell: ({row}) => (
				<button className="px-2 py-1 text-sm text-blue-500" onClick={()=> alert(row.original.name)}>
					View
				</button>
			),
		},
	];
	const sortedAnalysts = [...topAnalyst].sort(
		(a, b) => b.fraudCount - a.fraudCount,
	);
	const sortedBankFraud = [...fraudBanks].sort((a, b) => b.amount - a.amount);

	return (
		<section className="flex flex-col overflow-x-auto">
			<div className="flex w-full flex-col gap-6 md:gap-5 xl:flex-row">
				<div className="flex flex-col gap-5 xl:w-2/3">
					<div className="flex flex-col gap-5">
						<div>
							<p className="font-bold md:text-lg">
								Fraud Overview
							</p>
						</div>
						<div className="flex w-full flex-col gap-6 md:gap-3">
							{dashboardData.slice(0, 1).map((dashboard, idx) => (
								<CardCompo
									className="flex h-[70px] flex-grow justify-center px-3"
									key={idx}
								>
									<div className="flex h-full flex-col justify-center">
										<p className="text-sm text-slate-400">
											{dashboard.title}
										</p>

										<p className="text-2xl font-bold md:text-2xl">
											{addCommas(dashboard.amount)}
										</p>
									</div>
								</CardCompo>
							))}
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<div className="">
							<p className="font-bold">Recovery Overview</p>
						</div>
						<div className="flex md:gap-5">
							{dashboardData.slice(1).map((dashboard, idx) => (
								<CardCompo
									className="flex h-[70px] w-full justify-center border px-3"
									key={idx}
								>
									<div className="flex flex-col justify-center">
										<p className="text-sm text-slate-400">
											{dashboard.title}
										</p>
										<p className=" font-bold">
											{addCommas(dashboard.amount)}
										</p>
									</div>
								</CardCompo>
							))}
						</div>
					</div>
					<div className="flex h-full w-full flex-col gap-2">
						<p className="font-bold">Fraud statistics</p>
						<div className="w-full h-[500px] md:h-full">
							<BarChart />
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-5 xl:w-1/3">
					<div className="flex flex-col gap-2">
						<div>
							<p className="font-bold">Top Fraud Analyst</p>
						</div>
						<Table
							data={sortedAnalysts}
							columns={analystColumns}
							tbodytdClass="px-4 py-4 text-sm"
							theadtrClass=""
						/>
					</div>

					<div className="flex flex-col gap-2">
						<div>
							<p className="font-bold">
								Top 5 Banks with Leading Fraud cases
							</p>
						</div>
						<Table data={sortedBankFraud} columns={bankColumns} />
					</div>
				</div>
			</div>
			<div className="mt-5 h-96 w-full">
				<p className="font-bold">Recent Fraudulent Transactions</p>
				<Table data={transactionsData} columns={transctionsColumns} />
			</div>
		</section>
	);
}
