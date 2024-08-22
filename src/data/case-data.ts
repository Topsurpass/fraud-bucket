import { CaseProps } from "@/types/case-schema";

export const caseData: CaseProps[] = [
	{
		date: "2024-08-22",
		amount: 50000000,
		type: "Fund transfer",
		merchant: "Nomba",
		analyst: "Olowosuyi Temitope",
		channel: "SwitchIt",
		status: "In progress",
	},
	{
		date: "2024-08-22",
		amount: 516000,
		type: "Fund transfer",
		merchant: "FCMB",
		analyst: "Okafor Bobby",
		channel: "SwitchIt",
		status: "Fraudulent",
	},
	{
		date: "2024-08-22",
		amount: 3000000,
		type: "Airtime",
		merchant: "Polaris",
		analyst: "Ogunjobi Tokunbo",
		channel: "SwitchIt",
		status: "Not Fraudulent",
	},
];
