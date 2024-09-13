import  { useEffect, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { EntityType, RequestMethod } from "@/types/enum";
import { Button } from "@/components/ui/button";
import { TrxnMethod, Status } from "@/lib/constants";
import QueryKeys from "@/api/query-keys";
import Modal from "@/components/ui/modal";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import useMutateTransaction from "@/api/transactions/use-mutate-trxn";
import { TextField, ReactSelect } from "@/components/ui/forms";
import useGlobalProvider from "@/hooks/use-global-provider";
import DisplayIcon from "@/components/display-icon";
import { ReceiptText } from "lucide-react";
import useGetMerchant from "@/api/merchant/use-get-merchant";
import useGetUser from "@/api/users/use-get-users";
import useGetChannel from "@/api/channels/use-get-channel";

import {
	CreateTxnInputs,
	CreateTxnSchema,
} from "@/validations/create-txn-schema";

const initialValues = {
	merchant: {},
	amount: "",
	type: {},
	analyst: {},
	channel: {},
	status: {},
};

interface SelectProps {
	label?: string;
	value?: string;
	id?: string;
	merchant?: string;
	firstname?: string;
	lastname?: string;
	channel?: string;
	status?: string;
}

export default function TransactionModal() {
	const { isModalOpen, onModalClose, entity, isEdit, formData } =
		useGlobalProvider();
	const queryClient = useQueryClient();
	const { mutate: mutateTransaction, isPending } = useMutateTransaction();
	const { data: merchant, isPending: loading } = useGetMerchant();
	const { data: channel, isPending: isLoadingChannel } = useGetChannel();
	const { data: users, isPending: isLoading } = useGetUser();

	const { control, handleSubmit, reset } = useForm<CreateTxnInputs>({
		resolver: zodResolver(CreateTxnSchema),
		defaultValues: initialValues,
	});

	const optionsChannel = useMemo(() => {
		return channel?.map((channel: SelectProps) => ({
			value: channel.id,
			label: channel.channel,
		}));
	}, [channel]);

	const optionsTrxMethod = useMemo(() => {
		return TrxnMethod?.map((method: SelectProps) => ({
			value: method.value,
			label: method.label,
		}));
	}, [TrxnMethod]);

	const optionsStatus = useMemo(() => {
		return Status?.map((method: SelectProps) => ({
			value: method.value,
			label: method.label,
		}));
	}, [Status]);

	const optionsAnalyst = useMemo(() => {
		return users?.map((user: SelectProps) => ({
			value: user.id,
			label: `${user.lastname} ${user.firstname}`,
		}));
	}, [users]);

	const optionsMerchant = useMemo(() => {
		return merchant?.map((merchant: SelectProps) => ({
			value: merchant.id,
			label: merchant.merchant,
		}));
	}, [merchant]);

	useEffect(() => {
		if (isEdit && formData) {
			reset({
				merchant: {
					value: formData.merchantId,
					label: formData?.merchant,
				},
				amount: formData?.amount,
				type: {
					value: formData?.type,
					label: formData?.type,
				},
				analyst: {
					value: formData.analystId,
					label: formData?.analyst,
				},
				channel: {
					value: formData?.channelId,
					label: formData?.channel,
				},
				status: {
					value: formData?.status,
					label: formData?.status,
				},
			});
		}
	}, [formData, reset, isEdit]);

	const processForm: SubmitHandler<CreateTxnInputs> = async (payload) => {
		const requestPayload = {
			merchantId: payload?.merchant?.value,
			analystId: payload?.analyst?.value,
			amount: payload?.amount,
			type: payload?.type?.value,
			channelId: payload?.channel?.value,
			status: payload?.status.value,
		};

		mutateTransaction(
			{
				requestMethod: isEdit
					? RequestMethod.PATCH
					: RequestMethod.POST,
				requestPayload,
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
					reset();
				},
				onError: (err: any) => {
					toast.error(err.response.data.error);
				},
			},
		);
	};

	useEffect(() => {
		if (!isModalOpen) reset({ ...initialValues });
	}, [isModalOpen, reset]);

	return (
		<Modal
			title={`${isEdit ? "Edit" : "Log"} Fraudulent Transaction`}
			open={isModalOpen && EntityType.TRANSACTION === entity}
			handleClose={onModalClose}
			size="lg"
			setIcon={
				<DisplayIcon icon={<ReceiptText size={25} color="black" />} />
			}
		>
			<form onSubmit={handleSubmit(processForm)}>
				<section className="flex flex-col space-y-3 p-4">
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
							label="Amount"
							name="amount"
							control={control}
							className="h-[45px] w-full rounded-md border p-2"
						/>
					</div>
					<div>
						<ReactSelect
							label="Channel"
							control={control}
							name="channel"
							options={optionsChannel}
							isLoading={isLoadingChannel}
							isDisabled={false}
						/>
					</div>
					<div>
						<ReactSelect
							label="Transaction type"
							control={control}
							name="type"
							options={optionsTrxMethod}
							isLoading={false}
							isDisabled={false}
						/>
					</div>
					<div>
						<ReactSelect
							label="Caught By"
							control={control}
							name="analyst"
							options={optionsAnalyst}
							isLoading={isLoading}
							isDisabled={false}
						/>
					</div>
					<div>
						<ReactSelect
							label="Status"
							control={control}
							name="status"
							options={optionsStatus}
							isLoading={isLoading}
							isDisabled={false}
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
