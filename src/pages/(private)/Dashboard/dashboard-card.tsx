import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useGetStatistic from "@/api/dashboard/use-get-analysis";
import { addCommas } from "@/utils/helpers";

export default function DashBoardCard() {
	const { data, isLoading } = useGetStatistic();
	const amount = !isLoading && addCommas(data.totalFraudulentAmount);
	const amountEscalated = !isLoading && addCommas(data.totalEscalatedAmount);
	const fraudulentCases = !isLoading && addCommas(data.totalFraudulentCount);
	const tranxEscalated = !isLoading && addCommas(data.totalEscalateCount);

	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">
						Total Fraud
					</CardTitle>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						className="h-4 w-4 text-muted-foreground"
					>
						<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
					</svg>
				</CardHeader>
				<CardContent>
					<div className="pl-5 text-2xl font-bold">{`₦${amount}`}</div>
					<p className="pb-3 pl-5 text-xs text-muted-foreground">
						Confirmed by banks/merchants
					</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">
						Fraudulent cases
					</CardTitle>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						className="h-4 w-4 text-muted-foreground"
					>
						<path d="M22 12h-4l-3 9L9 3l-3 9H2" />
					</svg>
				</CardHeader>
				<CardContent>
					<div className="pl-5 text-2xl font-bold">{`${fraudulentCases}`}</div>
					<p className="pb-3 pl-5 text-xs text-muted-foreground">
						Confirmed fraud cases
					</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">
						Escalated Amount
					</CardTitle>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						className="h-4 w-4 text-muted-foreground"
					>
						<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
					</svg>
				</CardHeader>
				<CardContent>
					<div className="pl-5 text-2xl font-bold">{`₦${amountEscalated}`}</div>
					<p className="pb-3 pl-5 text-xs text-muted-foreground">Awaiting confirmation</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">
						Total Fraud Cases
					</CardTitle>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						className="h-4 w-4 text-muted-foreground"
					>
						<path d="M22 12h-4l-3 9L9 3l-3 9H2" />
					</svg>
				</CardHeader>
				<CardContent>
					<div className="pl-5 text-2xl font-bold">{`${tranxEscalated}`}</div>
					<p className="pb-3 pl-5 text-xs text-muted-foreground">
						Escalated fraud cases
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
