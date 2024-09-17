import { EntityType, RequestMethod } from "@/types/enum";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import useGlobalProvider from "@/hooks/use-global-provider";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import QueryKeys from "@/api/query-keys";
import { useQueryClient } from "@tanstack/react-query";
import DisplayIcon from "@/components/display-icon";
import useMutateUser from "@/api/users/use-mutate-user";

export default function DeleteUserModal() {
	const { onModalClose, entity, isDelete, formData } = useGlobalProvider();
	const { mutate: mutateUser, isPending } = useMutateUser();
	const queryClient = useQueryClient();

	const processForm = async () => {
		mutateUser(
			{
				requestMethod: RequestMethod.DELETE,
				id: formData.id,
			},
			{
				onSuccess: (res) => {
					toast.success("User", {
						description: res?.data?.message,
					});
					queryClient.invalidateQueries({
						queryKey: [QueryKeys.GET_USERS],
					});
					onModalClose();
				},
				onError: (err: any) => {
					toast.error(err.response.data.error);
				},
			},
		);
	};
	return (
		<Modal
			title={`Delete User ?`}
			open={isDelete && EntityType.SETTING_USER === entity}
			handleClose={onModalClose}
			showCloseButton={false}
			size="lg"
			setIcon={<DisplayIcon icon={<Trash2 size={25} color="black" />} />}
		>
			<div>
				<div className="flex items-center justify-center p-4">
					<p>
						You are about to delete the selected user
						permanently alongside all transactions reported.
					</p>
				</div>
				<div className="flex items-center justify-between gap-10 p-4">
					<Button
						label="Cancel"
						variant="outline"
						size="lg"
						disabled={false}
						className="px-8"
						onClick={() => {
							onModalClose();
						}}
						type="button"
					/>
					<Button
						label="Delete"
						className="px-8"
						type="submit"
						variant="danger"
						onClick={() => processForm()}
						isLoading={isPending}
					/>
				</div>
			</div>
		</Modal>
	);
}
