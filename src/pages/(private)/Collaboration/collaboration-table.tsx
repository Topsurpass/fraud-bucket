import { useMemo, useState } from "react";
import {
	Download,
	CirclePlus,
	Ellipsis,
	Pencil,
	Trash2,
	Mail,
} from "lucide-react";
import {
	ColumnDef,
	PaginationState,
	VisibilityState,
} from "@tanstack/react-table";
import DataTableSSR from "@/components/table/datatable-ssr";
import Button from "@/components/ui/button";
import { CollaborationProps } from "@/types/collaboration-schema";
import { EntityType } from "@/types/enum";
import useGlobalProvider from "@/hooks/use-global-provider";
import useGetContact from "@/api/fraud-contact.ts/use-get-contact";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function CollaborationTable() {
	const [searchText, setSearchText] = useState("");
	const { onModalOpen, onEdit, onDelete } = useGlobalProvider();
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>();

	const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 5,
	});

	const mappedParamData = useMemo(() => {
		const params: any = {
			page: pageIndex + 1,
			size: pageSize,
		};
		if (searchText) {
			params.searchText = searchText;
		}
		return params;
	}, [searchText, pageIndex, pageSize]);

	const { data, isLoading } = useGetContact(mappedParamData);

	const pagination = useMemo(() => {
		return {
			pageIndex,
			pageSize,
		};
	}, [pageIndex, pageSize]);

	const columns = useMemo<ColumnDef<CollaborationProps>[]>(
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
				accessorKey: "name",
				header: () => <span className="font-bold">Name</span>,
			},
			{
				accessorKey: "merchant",
				header: () => <span className="font-bold">Merchant</span>,
			},
			{
				accessorKey: "email",
				header: () => <span className="font-bold">Email</span>,
			},
			{
				accessorKey: "phone",
				header: () => <span className="font-bold">Phone</span>,
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
										entity: EntityType.COLLABORATION,
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
										entity: EntityType.COLLABORATION,
									})
								}
							>
								<Trash2 size={18} />
								<span>Delete</span>
							</DropdownMenuItem>
							<DropdownMenuItem
								className="flex cursor-pointer items-center gap-2 hover:bg-blue-500"
								onClick={() => {
									const emailAddress = row.row.original.email;
									window.location.href = `mailto:${emailAddress}`;
								}}
							>
								<Mail size={18} />
								<span>Mail</span>
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
			<div>
				<div className="flex flex-col gap-3">
					<div>
						<h2 className="text-2xl font-semibold">
							Frauddesk Contacts
						</h2>
						<h4 className="text-base text-gray-600">
							Find fraud analysts contacts in other institution.
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
							onClick={() =>
								onModalOpen(EntityType.COLLABORATION)
							}
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
				setPagination={setPagination}
				setSearchText={setSearchText}
				showColumnVisibility={true}
				columnVisibility={columnVisibility}
				setColumnVisibility={setColumnVisibility}
				isLoading={isLoading}
				pageSizeOptions={[5, 10, 20, 30, 50]}
				showFilter={false}
				showPagination={true}
			/>
		</section>
	);
}
