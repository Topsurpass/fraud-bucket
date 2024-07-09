import {
	useReactTable,
	ColumnDef,
	getCoreRowModel,
	flexRender,
} from "@tanstack/react-table";
import { cn } from "@/utils";

interface TableProps<T> {
	data: T[];
	columns: ColumnDef<T>[];
	fullTableClass?: string;
	theadtrClass?: string;
	tbodytdClass?: string;
}

const Table = <T,>({
	data,
	columns,
	fullTableClass,
	theadtrClass,
	tbodytdClass,
}: TableProps<T>) => {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<table
			className={cn(
				`${fullTableClass || "w-full rounded-lg border-etzBlue-800 bg-etzBlue-800 text-left text-white"}`,
			)}
		>
			<thead>
				{table.getHeaderGroups().map((headerGroup) => (
					<tr key={headerGroup.id}>
						{headerGroup.headers.map((header) => (
							<th
								key={header.id}
								className={cn(
									`${theadtrClass || "border-b px-4 py-3"}`,
								)}
							>
								{flexRender(
									header.column.columnDef.header,
									header.getContext(),
								)}
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody>
				{table.getRowModel().rows.map((row) => (
					<tr key={row.id}>
						{row.getVisibleCells().map((cell) => (
							<td
								key={cell.id}
								className={cn(
									`${tbodytdClass || "border-b px-4 py-4 text-sm"}`,
								)}
							>
								{flexRender(
									cell.column.columnDef.cell,
									cell.getContext(),
								)}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default Table;
