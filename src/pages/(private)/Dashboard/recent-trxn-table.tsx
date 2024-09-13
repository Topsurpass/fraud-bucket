import { useMemo, useState } from "react";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import DataTableSSR from "@/components/table/datatable-ssr";
import { TransactionProps } from "@/types/fraud-txn-schema";
import useGetRecentTrnx from "@/api/dashboard/use-get-recentTrxn";

export default function RecentTransTable() {
	const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	const { data, isLoading } = useGetRecentTrnx();

	const pagination = useMemo(() => {
		return {
			pageIndex,
			pageSize,
		};
	}, [pageIndex, pageSize]);

	const columns = useMemo<ColumnDef<TransactionProps>[]>(
		() => [
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
				cell: ({ row }) => {
					const amount = parseFloat(row?.getValue("amount"));
					return (
						<span>{new Intl.NumberFormat().format(amount)}</span>
					);
				},
			},
			{
				accessorKey: "type",
				header: () => <span className="font-bold">Type</span>,
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
				data={data || []}
				columns={columns}
				pageCount={4}
				totalRecords={100}
				pagination={pagination}
				setPagination={setPagination}
				isLoading={isLoading}
				pageSizeOptions={[5, 10, 20, 30, 50]}
				showFilter={false}
				showPagination={false}
			/>
		</section>
	);
}
