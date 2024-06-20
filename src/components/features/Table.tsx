import React from "react";
import "@/index.css";
import {
	useReactTable,
	getSortedRowModel,
	getPaginationRowModel,
	getFilteredRowModel,
	getCoreRowModel,
	flexRender,
	ColumnDef,
} from "@tanstack/react-table";
import { makeData, Person } from "@/utils/helpers";

export function TableCompo() {
	const columns = React.useMemo<ColumnDef<Person>[]>(
		() => [
			{
				accessorKey: "firstName",
				cell: (info) => info.getValue(),
				header: () => <span>First Name</span>,
			},
			{
				accessorFn: (row) => row.lastName,
				id: "lastName",
				cell: (info) => info.getValue(),
				header: () => <span>Last Name</span>,
				// footer: (props) => props.column.id,
			},
			{
				accessorKey: "age",
				header: () => "Age",
				// footer: (props) => props.column.id,
			},
			{
				accessorKey: "visits",
				header: () => <span>Visits</span>,
				// footer: (props) => props.column.id,
			},
			// {
			// 	accessorKey: "status",
			// 	header: "Status",
			// 	// footer: (props) => props.column.id,
			// },
			// {
			// 	accessorKey: "progress",
			// 	header: "Profile Progress",
			// 	// footer: (props) => props.column.id,
			// },
		],
		[],
	);

	const [data, _setData] = React.useState(() => makeData(1000));
	// const [density, setDensity] = React.useState<DensityState>("md");

	const table = useReactTable({
		//pass our custom feature to the table to be instantiated upon creation
		columns,
		data,
		debugTable: true,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});

	return (
		<section className="mb-[55px] w-full md:mb-[65px] md:p-5">
			<table className="w-full overflow-x-scroll text-sm">
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id} className="w-full text-left">
							{headerGroup.headers.map((header) => {
								return (
									<th
										key={header.id}
										colSpan={header.colSpan}
										className="md:p-[12px]"
										style={{
											transition: "padding 0.2s",
										}}
									>
										<div
											{...{
												className:
													header.column.getCanSort()
														? "cursor-pointer select-none"
														: "",
												onClick:
													header.column.getToggleSortingHandler(),
											}}
										>
											{flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
											{{
												asc: " 🔼",
												desc: " 🔽",
											}[
												header.column.getIsSorted() as string
											] ?? null}
										</div>
									</th>
								);
							})}
						</tr>
					))}
				</thead>
				<tbody className="w-full">
					{table.getRowModel().rows.map((row, idx) => {
						return (
							<tr
								key={row.id}
								className={`border-y ${idx % 2 === 0 ? "bg-etzBlue-800 text-white" : ""}`}
							>
								{row.getVisibleCells().map((cell) => {
									return (
										<td
											key={cell.id}
											className="text-wrap px-1 py-3 md:p-[12px]"
											style={{
												transition: "padding 0.2s",
											}}
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
			<div className="flex  w-full justify-between border">
				<div className="flex items-center justify-center text-wrap text-xs">
					Showing {table.getRowModel().rows.length.toLocaleString()}{" "}
					of {table.getRowCount().toLocaleString()} Rows
				</div>
				<div className="flex items-center gap-2">
					<button
						className="rounded border p-1"
						onClick={() => table.firstPage()}
						disabled={!table.getCanPreviousPage()}
					>
						{"<<"}
					</button>
					<button
						className="rounded border p-1"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						{"<"}
					</button>
					<button
						className="rounded border p-1"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						{">"}
					</button>
					<button
						className="rounded border p-1"
						onClick={() => table.lastPage()}
						disabled={!table.getCanNextPage()}
					>
						{">>"}
					</button>
					<span className="flex items-center gap-1 text-sm">
						<span>Page</span>
						<p>
							{table.getState().pagination.pageIndex + 1} of{" "}
							{table.getPageCount().toLocaleString()}
						</p>
					</span>
				</div>
			</div>
			{/* <div className="h-5" />
			<div className="m-auto flex flex-row-reverse items-center justify-between text-sm">
				<div className="flex items-center gap-5">
					<button
						className="rounded border p-1"
						onClick={() => table.firstPage()}
						disabled={!table.getCanPreviousPage()}
					>
						{"<<"}
					</button>
					<button
						className="rounded border p-1"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						{"<"}
					</button>
					<button
						className="rounded border p-1"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						{">"}
					</button>
					<button
						className="rounded border p-1"
						onClick={() => table.lastPage()}
						disabled={!table.getCanNextPage()}
					>
						{">>"}
					</button>
					<span className="flex items-center gap-1">
						<div>Page</div>
						<strong>
							{table.getState().pagination.pageIndex + 1} of{" "}
							{table.getPageCount().toLocaleString()}
						</strong>
					</span>
					<span className="flex items-center gap-1">
						| Go to page:
						<input
							type="number"
							defaultValue={
								table.getState().pagination.pageIndex + 1
							}
							onChange={(e) => {
								const page = e.target.value
									? Number(e.target.value) - 1
									: 0;
								table.setPageIndex(page);
							}}
							className="w-16 rounded border p-1"
						/>
					</span>
					<select
						value={table.getState().pagination.pageSize}
						onChange={(e) => {
							table.setPageSize(Number(e.target.value));
						}}
					>
						{[10, 20, 30, 40, 50].map((pageSize) => (
							<option key={pageSize} value={pageSize}>
								Show {pageSize}
							</option>
						))}
					</select>
				</div>
				<div>
					Showing {table.getRowModel().rows.length.toLocaleString()}{" "}
					of {table.getRowCount().toLocaleString()} Rows
				</div>
			</div> */}
		</section>
	);
}
