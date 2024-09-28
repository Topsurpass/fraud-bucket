import { useMemo, useState } from "react";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import DataTableSSR from "@/components/table/datatable-ssr";
import { AnalystProps } from "@/types/dashboard-schema";
import { GiLaurelCrown } from "react-icons/gi";
import useGetAnalystRank from "@/api/dashboard/use-get-analystRank";

export default function AnalystTable() {
	const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	const { data, isLoading } = useGetAnalystRank();

	const pagination = useMemo(() => {
		return {
			pageIndex,
			pageSize,
		};
	}, [pageIndex, pageSize]);

	const columns = useMemo<ColumnDef<AnalystProps>[]>(
		() => [
			{
				accessorKey: "analyst",
				header: "Analyst",

			},
			{
				accessorKey: "count",
				header: "Fraud Detected",
				cell: ({ row, table }) => {
					const index = table.getCoreRowModel().rows.indexOf(row);
					return (
						<div className="flex items-center gap-2">
							<p>{row.original.count}</p>
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
				data={data || []}
				columns={columns}
				pageCount={4}
				totalRecords={100}
				pagination={pagination}
				setPagination={setPagination}
				isLoading={isLoading}
				pageSizeOptions={[5, 10, 20, 30, 50]}
				showFilter={false}
				showFooter={false}
				isSearchable={false}
				showPagination={false}
				numOfSkeletonColumns={4}
				numOfSkeletonRows={5}
			/>
		</section>
	);
}
