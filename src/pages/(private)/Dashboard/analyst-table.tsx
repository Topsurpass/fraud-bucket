import { useMemo, useState } from "react";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import DataTableSSR from "@/components/table/datatable-ssr";
import { AnalystProps } from "@/types/dashboard-schema";
import { GiLaurelCrown } from "react-icons/gi";

import { topAnalyst } from "@/data/dashboard-data";

export default function AnalystTable() {
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

	const columns = useMemo<ColumnDef<AnalystProps>[]>(
		() => [
			{
				accessorKey: "id",
				header: "Rank",
				cell: ({ row }) => (
					<span className="font-bold uppercase">{row.index + 1}</span>
				),
				enableHiding: false,
			},
			{
				accessorKey: "name",
				header: "Analyst",
				cell: ({ row }) => (
					<div>
						<p className="text-sm">{row.original.name}</p>
						<p className="text-xs">{row.original.title}</p>
					</div>
				),
			},
			{
				accessorKey: "fraudCount",
				header: "Fraud Detected",
				cell: ({ row, table }) => {
					const index = table.getCoreRowModel().rows.indexOf(row);
					return (
						<div className="flex items-center gap-2">
							<p>{row.original.fraudCount}</p>
							{index === 0 && (
								<GiLaurelCrown className="-mr-5 text-yellow-300" />
							)}
						</div>
					);
				},
			},
		],
		[],
	);

	return (
		<section>
			{/* {isPending && <LoadingSpinner />} */}
			<DataTableSSR
				data={topAnalyst || []}
				columns={columns}
				pageCount={4}
				totalRecords={100}
				pagination={pagination}
				setPagination={setPagination}
				isLoading={false}
				pageSizeOptions={[5, 10, 20, 30, 50]}
				showFilter={false}
				showFooter={false}
				isSearchable={false}
				showPagination={false}
			/>
		</section>
	);
}
