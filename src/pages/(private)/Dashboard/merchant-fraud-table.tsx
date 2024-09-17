import { useMemo, useState } from "react";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import DataTableSSR from "@/components/table/datatable-ssr";
import { BankProps } from "@/types/dashboard-schema";
import useGetMerchantRank from "@/api/dashboard/use-get-merchantRank";

export default function MerchantFraudTable() {
	const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});
	const { data, isLoading } = useGetMerchantRank();
	const pagination = useMemo(() => {
		return {
			pageIndex,
			pageSize,
		};
	}, [pageIndex, pageSize]);

	const columns = useMemo<ColumnDef<BankProps>[]>(
		() => [
			{ accessorKey: "merchant", header: "Bank Names" },
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
				accessorKey: "cases",
				header: "Fraud Cases",
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
			/>
		</section>
	);
}
