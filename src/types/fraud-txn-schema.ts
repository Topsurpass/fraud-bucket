export type TransactionProps = {
	merchant: { name: string };
	date: string;
	amount: number;
	analyst: { firstname: string; lastname: string };
	type: string;
	channel: { name: string };
	createdAt: string;
};
