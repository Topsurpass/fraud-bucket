import { EntityType, RequestMethod } from "@/types/enum";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import useGlobalProvider from "@/hooks/use-global-provider";
import useMutateContact from "@/api/fraud-contact.ts/use-mutate-contact";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import QueryKeys from "@/api/query-keys";
import { useQueryClient } from "@tanstack/react-query";
import DisplayIcon from "@/components/display-icon";

export default function DeleteCollaborationModal() {
	const { onModalClose, entity, isDelete, formData } = useGlobalProvider();
	const { mutate: mutateContact, isPending } = useMutateContact();
	const queryClient = useQueryClient();

	const processForm = async () => {
		mutateContact(
			{
				requestMethod: RequestMethod.DELETE,
				id: formData.id,
			},
			{
				onSuccess: (res) => {
					toast.success("Fraud Contact", {
						description: res?.data?.message,
					});
					queryClient.invalidateQueries({
						queryKey: [QueryKeys.GET_CONTACTS],
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
			title={`Delete Contact ?`}
			open={isDelete && EntityType.COLLABORATION === entity}
			handleClose={onModalClose}
			showCloseButton={false}
			size="lg"
			setIcon={<DisplayIcon icon={<Trash2 size={25} color="black" />} />}
		>
			<div>
				<div className="flex items-center justify-center p-4">
					<p>
						You are about to delete the selected contact
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
