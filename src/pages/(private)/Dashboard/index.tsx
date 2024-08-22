import { BarChartDash } from "@/components/features/Barchart";
import RecentTransTable from "./recent-trxn-table";
import MerchantFraudTable from "./merchant-fraud-table";
import AnalystTable from "./analyst-table";
import DashBoardCard from "./dashboard-card";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Dashboard() {
	return (
		<div className="mb-10">
			<div className="mb-10">
				<h2 className="text-2xl font-semibold">
					Dashboard
				</h2>
				<h4 className="text-base text-gray-600">
					Monitor, track and view fraudulent transactions charts
				</h4>
			</div>
			<DashBoardCard />
			<div className="mt-5 grid gap-4 sm:grid-cols-1 lg:grid-cols-6">
				<Card className="lg:col-span-3">
					<CardHeader>
						<CardTitle>Fraud statistics</CardTitle>
						<CardDescription>
							Fraud trend over space of time
						</CardDescription>
					</CardHeader>
					<CardContent className="p-5">
						<BarChartDash />
					</CardContent>
				</Card>
				<Card className="lg:col-span-3">
					<CardHeader>
						<CardTitle>Analyst Ranks</CardTitle>
						<CardDescription>
							Analyst ranks based on number of fraudulent
							transactions caught.
						</CardDescription>
					</CardHeader>
					<CardContent className="p-5">
						<AnalystTable />
					</CardContent>
				</Card>
			</div>
			<div className="mt-5 grid gap-4 sm:grid-cols-1 lg:grid-cols-6">
				<Card className="lg:col-span-3">
					<CardHeader>
						<CardTitle>Recent Fraudulent Transactions</CardTitle>
						<CardDescription>
							View and track recently added fraudulent
							transactions
						</CardDescription>
					</CardHeader>
					<CardContent className="p-5">
						<RecentTransTable />
					</CardContent>
				</Card>
				<Card className="lg:col-span-3">
					<CardHeader>
						<CardTitle>Merchants Fraud Cases</CardTitle>
						<CardDescription>
							Merchants with the leading fraud cases
						</CardDescription>
					</CardHeader>
					<CardContent className="p-5">
						<MerchantFraudTable />
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
