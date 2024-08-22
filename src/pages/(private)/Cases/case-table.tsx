import { useMemo, useState } from "react";
import { Download, CirclePlus, Ellipsis, Pencil, Trash2 } from "lucide-react";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import DataTableSSR from "@/components/table/datatable-ssr";
import { caseData } from "@/data/case-data";
import Button from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CaseProps } from "@/types/case-schema";

export default function CaseTable() {
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

	const columns = useMemo<ColumnDef<CaseProps>[]>(
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
				header: () => <span className="font-bold">Sender Bank</span>,
			},
			{
				accessorKey: "amount",
				header: () => <span className="font-bold">Amount</span>,
			},
			{
				accessorKey: "channel",
				header: () => <span className="font-bold">Channel</span>,
			},
			{
				accessorKey: "type",
				header: () => (
					<span className="font-bold">Transaction type</span>
				),
			},
			{
				accessorKey: "analyst",
				header: () => <span className="font-bold">Escalated by</span>,
			},
			{
				accessorKey: "status",
				header: () => <span className="font-bold">Status</span>,
			},
			{
				header: () => <span className="font-bold">Actions</span>,
				id: "action",
				cell: () => (
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Button variant="outline" size="icon">
								<Ellipsis size={18} />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align="end"
							className="-mt-5 mr-8 w-36"
						>
							<DropdownMenuItem
								className="flex cursor-pointer items-center gap-2 hover:bg-blue-500"
								onClick={() => {}}
							>
								<Pencil size={18} />
								<span>Edit</span>
							</DropdownMenuItem>
							<DropdownMenuItem
								className="flex cursor-pointer items-center gap-2 hover:bg-blue-500"
								onClick={() => {}}
							>
								<Trash2 size={18} />
								<span>Delete</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				),
			},
		],
		[],
	);

	return (
		<section>
			{/* {isPending && <LoadingSpinner />} */}
			<div>
				<div className="flex flex-col gap-3">
					<div>
						<h2 className="text-2xl font-semibold">
							Escalated Transactions
						</h2>
						<h4 className="text-base text-gray-600">
							Track and escalate transactions
						</h4>
					</div>
				</div>
				<section className="mb-3 flex">
					<div className="ml-auto flex gap-3">
						<Button
							type="button"
							className="group flex items-center gap-2 active:bg-blue-200"
							onClick={() => {}}
							variant="outline"
							size="lg"
							label="Export"
							icon={Download}
						/>
						<Button
							type="button"
							className="group flex items-center gap-2 active:bg-blue-200"
							onClick={() => {}}
							variant="outline"
							size="lg"
							label="Create New"
							icon={CirclePlus}
						/>
					</div>
				</section>
			</div>
			<DataTableSSR
				data={caseData || []}
				columns={columns}
				pageCount={4}
				totalRecords={100}
				pagination={pagination}
				setPagination={setPagination}
				isLoading={false}
				pageSizeOptions={[5, 10, 20, 30, 50]}
				showFilter={true}
			/>
		</section>
	);
}
