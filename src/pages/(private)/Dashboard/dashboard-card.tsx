import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function DashBoardCard() {
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
					<div className="pl-5 text-2xl font-bold">$45,231.89</div>
					<p className="pb-3 pl-5 text-xs text-muted-foreground">
						+20.1% from last month
					</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">
						Total Money Recovered
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
					<div className="pl-5 text-2xl font-bold">$22,350.00</div>
					<p className="pb-3 pl-5 text-xs text-muted-foreground">
						+180.1% from last month
					</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">
						Pending Recovery
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
					<div className="pl-5 text-2xl font-bold">$22,881.89</div>
					<p className="pb-3 pl-5 text-xs text-muted-foreground">
						+201 since last hour
					</p>
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
					<div className="pl-5 text-2xl font-bold">+12,234</div>
					<p className="pb-3 pl-5 text-xs text-muted-foreground">
						+19% from last month
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
