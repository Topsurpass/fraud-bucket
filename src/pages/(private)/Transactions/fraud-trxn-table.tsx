import { useMemo, useState } from "react";
import { Ellipsis, Pencil, Trash2, Download, CirclePlus } from "lucide-react";
import {
	ColumnDef,
	PaginationState,
	VisibilityState,
} from "@tanstack/react-table";
import DataTableSSR from "@/components/table/datatable-ssr";
import { TransactionProps } from "@/types/fraud-txn-schema";
import useGlobalProvider from "@/hooks/use-global-provider";
import { EntityType } from "@/types/enum";
import useGetTransaction from "@/api/transactions/use-get-trxn";
// import LoadingSpinner from "@/assets/icons/loading-spinner";
import Button from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FilterStatus } from "@/lib/constants";
import { TrxnStatus } from "@/types/enum";

export default function FraudTransTable() {
	const { onModalOpen, onEdit, onDelete } = useGlobalProvider();
	const [status, setStatus] = useState(TrxnStatus.All);
	const [searchText, setSearchText] = useState("");
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>();
	const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 5,
	});

	const mappedParamData = useMemo(() => {
		const params: any = {
			page: pageIndex + 1,
			size: pageSize,
			status,
			searchText,
		};
		return params;
	}, [searchText, pageIndex, pageSize, status]);

	const { data, isLoading } = useGetTransaction(mappedParamData);

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
					<span className="font-extrabold uppercase">
						{row.index + 1}
					</span>
				),
				enableHiding: false,
			},
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
			{
				accessorKey: "analyst",
				header: () => <span className="font-bold">Caught By</span>,
				cell: ({ row }) => (
					<span>{`${row.original.analyst.lastname} ${row.original.analyst.firstname}`}</span>
				),
			},
			{
				accessorKey: "status",
				header: () => <span className="font-bold">Status</span>,
			},
			{
				header: () => <span className="font-bold">Actions</span>,
				id: "action",
				cell: (row) => (
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
								onClick={() => {
									onEdit({
										data: row?.row?.original,
										entity: EntityType.TRANSACTION,
									});
								}}
							>
								<Pencil size={18} />
								<span>Edit</span>
							</DropdownMenuItem>
							<DropdownMenuItem
								className="flex cursor-pointer items-center gap-2 hover:bg-blue-500"
								onClick={() =>
									onDelete({
										data: row?.row?.original,
										entity: EntityType.TRANSACTION,
									})
								}
							>
								<Trash2 size={18} />
								<span>Delete</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				),
			},
		],
		[onEdit],
	);

	return (
		<section>
			<div>
				<div className="flex flex-col gap-3">
					<div>
						<h2 className="text-2xl font-semibold">
							Recent Fraudulent Transactions
						</h2>
						<h4 className="text-base text-gray-600">
							View and add confirmed fraudulent transactions
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
							onClick={() => onModalOpen(EntityType.TRANSACTION)}
							variant="outline"
							size="lg"
							label="Create New"
							icon={CirclePlus}
						/>
					</div>
				</section>
			</div>
			<DataTableSSR
				data={data?.data || []}
				columns={columns}
				pageCount={data?.pageCount}
				totalRecords={data?.totalRecords}
				pagination={pagination}
				setSearchText={setSearchText}
				showColumnVisibility={true}
				columnVisibility={columnVisibility}
				setColumnVisibility={setColumnVisibility}
				filterStatusData={FilterStatus}
				setPagination={setPagination}
				showPagination={true}
				status={status}
				setStatus={setStatus}
				isLoading={isLoading}
				pageSizeOptions={[5, 10, 20, 30, 50]}
				numOfSkeletonColumns={7}
				numOfSkeletonRows={5}
			/>
		</section>
	);
}
