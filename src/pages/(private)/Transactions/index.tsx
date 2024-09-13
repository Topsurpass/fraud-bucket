import FraudTransTable from "./fraud-trxn-table";
import TransactionModal from "./transaction-modal";
import DeleteModal from "./delete-transaction-modal";

export default function Transactions() {
	return (
		<div>
			<FraudTransTable />
			<TransactionModal />
			<DeleteModal/>
		</div>
	);
}
