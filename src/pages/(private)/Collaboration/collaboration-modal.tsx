import { useEffect, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { TextField, ReactSelect } from "@/components/ui/forms";
import useGlobalProvider from "@/hooks/use-global-provider";
import QueryKeys from "@/api/query-keys";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { EntityType, RequestMethod } from "@/types/enum";
import useMutateContact from "@/api/fraud-contact.ts/use-mutate-contact";
import useGetMerchant from "@/api/merchant/use-get-merchant";
import LoadingSpinner from "@/assets/icons/loading-spinner";

import {
	CreateContactInputs,
	CreateContactSchema,
} from "@/validations/create-contact-schema";

const initialValues = {
	name: "",
	merchant: {},
	email: "",
	phone: "",
};

interface SelectProps {
	label: string;
	value: string;
	id?: string;
	merchant?: string;
	name?: string;
}

export default function CollaborationModal() {
	const { isModalOpen, onModalClose, entity, isEdit, formData } =
		useGlobalProvider();
	const { data: merchant, isPending: loading } = useGetMerchant();
	const { mutate: mutateContact, isPending } = useMutateContact();
	const queryClient = useQueryClient();
	const { control, handleSubmit, reset } =
		useForm<CreateContactInputs>({
			resolver: zodResolver(CreateContactSchema),
			defaultValues: initialValues,
		});

	const processForm: SubmitHandler<CreateContactInputs> = async (payload) => {
		const requestPayload = {
			merchantId: payload?.merchant?.value,
			name: payload?.name,
			email: payload?.email,
			phone: payload?.phone,
		} as any;

		mutateContact(
			{
				requestMethod: isEdit
					? RequestMethod.PATCH
					: RequestMethod.POST,
				requestPayload,
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
					reset();
				},
				onError: (err: any) => {
					toast.error(err.response.data.error);
				},
			},
		);
	};

	const optionsMerchant = useMemo(() => {
		return merchant?.map((merchant: SelectProps) => ({
			value: merchant.id,
			label: merchant.name,
		}));
	}, [merchant]);

	useEffect(() => {
		if (isEdit && formData) {
			reset({
				name: formData?.name,
				merchant: {
					value: formData.merchant.id,
					label: formData?.merchant.name,
				},
				email: formData?.email,
				phone: formData?.phone,
			});
		}
	}, [formData, reset, isEdit]);

	useEffect(() => {
		if (!isModalOpen) reset({ ...initialValues });
	}, [isModalOpen, reset]);

	return (
		<Modal
			title={`${isEdit ? "Edit" : "Add"} Frauddesk Contact`}
			open={isModalOpen && EntityType.COLLABORATION === entity}
			handleClose={onModalClose}
			size="lg"
		>
			{isPending && <LoadingSpinner className="text-2xl" />}

			<form onSubmit={() => {}}>
				{/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
				<section className="flex flex-col space-y-3 p-4">
					<div>
						<TextField
							label="Name"
							name="name"
							control={control}
							className="h-[45px] w-full rounded-md border p-2"
						/>
					</div>
					<div>
						<ReactSelect
							label="Merchant"
							control={control}
							name="merchant"
							options={optionsMerchant}
							isLoading={loading}
							isDisabled={false}
						/>
					</div>
					<div>
						<TextField
							label="Email"
							name="email"
							type="email"
							control={control}
							className="h-[45px] w-full rounded-md border p-2"
						/>
					</div>
					<div>
						<TextField
							label="Phone number"
							name="phone"
							type="phone"
							control={control}
							className="h-[45px] w-full rounded-md border p-2"
						/>
					</div>
				</section>
				<div className="flex items-center justify-between gap-10 p-4">
					<Button
						label="Close"
						variant="outline"
						size="lg"
						disabled={false}
						className="px-8"
						onClick={() => {
							reset();
							onModalClose();
						}}
						type="button"
					/>
					<Button
						label="Submit"
						className="px-8"
						type="submit"
						onClick={handleSubmit(processForm)}
						isLoading={isPending}
					/>
				</div>
			</form>
		</Modal>
	);
}
