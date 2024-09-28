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
				accessorKey: "createdAt",
				header: () => <span className="font-bold">Date</span>,
				cell: ({ row }) => {
					const date = new Date(row.original.createdAt);
					const formattedDate = new Intl.DateTimeFormat("en-US", {
						year: "numeric",
						month: "numeric",
						day: "numeric",
						hour: "2-digit",
						minute: "2-digit",
						hour12: false,
					}).format(date);
					return <span>{formattedDate}</span>;
				},
			},
			{
				accessorKey: "merchant",
				header: () => <span className="font-bold">Merchant</span>,
				cell: ({ row }) => <span>{row.original.merchant.name}</span>,
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
				accessorKey: "channel",
				header: () => <span className="font-bold">Channel</span>,
				cell: ({ row }) => <span>{row.original.channel.name}</span>,
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
				isSearchable={false}
				showFilter={false}
				showPagination={false}
				numOfSkeletonColumns={3}
				numOfSkeletonRows={3}
			/>
		</section>
	);
}
