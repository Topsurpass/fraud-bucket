import FraudTransTable from "./fraud-trxn-table"; 

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";

export default function Transactions() {
	return (
		<div className="flex flex-col gap-3 rounded">
			<Card className="lg:col-span-3">
				<CardHeader>
					<CardTitle>Fraudulent Transactions</CardTitle>
					<CardDescription>
						View, add and track recently added fraudulent transactions
					</CardDescription>
				</CardHeader>
				<CardContent className="p-5">
					<FraudTransTable />
				</CardContent>
			</Card>
		</div>
	);
}
