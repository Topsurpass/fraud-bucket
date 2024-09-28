import { useMemo, useState } from "react";
import { Download, CirclePlus, Ellipsis, Pencil, Trash2 } from "lucide-react";
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
import useGetUser from "@/api/users/use-get-users";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UserTable() {
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

	const { data, isLoading } = useGetUser(mappedParamData);

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
				accessorKey: "firstname",
				header: () => <span className="font-bold">Firstname</span>,
			},
			{
				accessorKey: "lastname",
				header: () => <span className="font-bold">Lastname</span>,
			},
			{
				accessorKey: "email",
				header: () => <span className="font-bold">Email</span>,
			},
			{
				accessorKey: "jobTitle",
				header: () => <span className="font-bold">Job Title</span>,
			},
			{
				accessorKey: "role",
				header: () => <span className="font-bold">Role</span>,
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
										entity: EntityType.SETTING_USER,
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
										entity: EntityType.SETTING_USER,
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
		[],
	);

	return (
		<section>
			{/* {isLoading && <LoadingSpinner className="text-2xl" />} */}
			<div>
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
							onClick={() => onModalOpen(EntityType.SETTING_USER)}
							variant="outline"
							size="lg"
							label="Add User"
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
