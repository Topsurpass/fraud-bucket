import { useMemo, useState } from "react";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import DataTableSSR from "@/components/table/datatable-ssr";
import { BankProps } from "@/types/dashboard-schema";
import { addCommas } from "@/utils/helpers";
import { fraudBanks } from "@/data/dashboard-data";

export default function MerchantFraudTable() {
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

	const columns = useMemo<ColumnDef<BankProps>[]>(
		() => [
			{
				accessorKey: "id",
				header: "#",
				cell: ({ row }) => (
					<span className="font-bold uppercase">{row.index + 1}</span>
				),
				enableHiding: false,
			},
			{ accessorKey: "name", header: "Bank Names" },
			{ accessorKey: "fraudCount", header: "Fraud Cases" },
			{
				accessorKey: "amount",
				header: "Amount",
				cell: ({ row }) => (
					<div>
						<p className="text-sm">
							{addCommas(row.original.amount)}
						</p>
					</div>
				),
			},
		],
		[],
	);

	return (
		<section>
			{/* {isPending && <LoadingSpinner />} */}

			<DataTableSSR
				data={fraudBanks || []}
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
