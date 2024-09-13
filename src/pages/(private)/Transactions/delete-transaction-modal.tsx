import { EntityType, RequestMethod } from "@/types/enum";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import useGlobalProvider from "@/hooks/use-global-provider";
import useMutateTransaction from "@/api/transactions/use-mutate-trxn";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import QueryKeys from "@/api/query-keys";
import { useQueryClient } from "@tanstack/react-query";
import DisplayIcon from "@/components/display-icon";

export default function DeleteModal() {
	const { onModalClose, entity, isDelete, formData } = useGlobalProvider();
	const { mutate: mutateTransaction, isPending } = useMutateTransaction();
	const queryClient = useQueryClient();

	const processForm = async () => {
		mutateTransaction(
			{
				requestMethod: RequestMethod.DELETE,
				id: formData.id,
			},
			{
				onSuccess: (res) => {
					toast.success("Transaction", {
						description: res?.data?.message,
					});
					queryClient.invalidateQueries({
						queryKey: [QueryKeys.GET_TRANSACTIONS],
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
			title={`Delete Transaction ?`}
			open={isDelete && EntityType.TRANSACTION === entity}
			handleClose={onModalClose}
			showCloseButton={false}
			size="lg"
			setIcon={<DisplayIcon icon={<Trash2 size={25} color="black" />} />}
		>
			<div>
				<div className="flex items-center justify-center p-4">
					<p>
						You are about to delete the selected transaction
						permanently.
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
