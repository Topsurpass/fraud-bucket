import { useMemo, useState } from "react";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import DataTableSSR from "@/components/table/datatable-ssr";
import { TransactionProps } from "@/types/fraud-txn-schema";
import { transactionsData } from "@/data/fraud-trxn-data";

export default function RecentTransTable() {
	const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	const pagination = useMemo(() => {
		return {
			pageIndex,
			pageSize,
		};
	}, [pageIndex, pageSize]);

	const columns = useMemo<ColumnDef<TransactionProps>[]>(
		() => [
			{
				accessorKey: "id",
				header: "#",
				cell: ({ row }) => (
					<span className="font-bold uppercase">{row.index + 1}</span>
				),
				enableHiding: false,
			},
			{
				accessorKey: "date",
				header: () => <span className="font-bold">Date</span>,
			},
			{
				accessorKey: "merchant",
				header: () => <span className="font-bold">Merchant</span>,
			},
			{
				accessorKey: "amount",
				header: () => <span className="font-bold">Amount</span>,
			},
			{
				accessorKey: "count",
				header: () => <span className="font-bold">Count</span>,
			},
			{
				accessorKey: "analyst",
				header: () => <span className="font-bold">Analyst</span>,
			},
		],
		[],
	);

	return (
		<section>
			{/* {isPending && <LoadingSpinner />} */}
			<DataTableSSR
				data={transactionsData || []}
				columns={columns}
				pageCount={4}
				totalRecords={100}
				pagination={pagination}
				setPagination={setPagination}
				isLoading={false}
				pageSizeOptions={[5, 10, 20, 30, 50]}
				showFilter={false}
			/>
		</section>
	);
}
