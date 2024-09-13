import { useEffect, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { EntityType } from "@/types/enum";
import { Button } from "@/components/ui/button";
import { TrxnMethod, Channels, Status } from "@/lib/constants";
import Modal from "@/components/ui/modal";
import { TextField, ReactSelect } from "@/components/ui/forms";
import useGlobalProvider from "@/hooks/use-global-provider";
import { analysts } from "@/data/analyst-data";
import { MerchantData } from "@/data/merchant-data";
import {
	CreateCaseInputs,
	CreateCaseSchema,
} from "@/validations/create-case-schema";

const initialValues = {
	merchant: {},
	amount: "",
	method: {},
	analyst: {},
	channel: {},
	status: {},
};

interface SelectProps {
	label: string;
	value: string;
}

export default function CaseModal() {
	const { isModalOpen, onModalClose, entity, isEdit } = useGlobalProvider();

	const { control, handleSubmit, reset, watch } = useForm<CreateCaseInputs>({
		resolver: zodResolver(CreateCaseSchema),
		defaultValues: initialValues,
	});

	const processForm: SubmitHandler<CreateCaseInputs> = async (payload) => {
		console.log(JSON.stringify(payload));
	};

	const getSelectData = (
		dataArr: SelectProps[],
	): { value: string; label: string }[] => {
		return useMemo(() => {
			return dataArr.map((item) => ({
				value: item.value,
				label: item.label,
			}));
		}, [dataArr]);
	};

	useEffect(() => {
		if (!isModalOpen) reset({ ...initialValues });
	}, [isModalOpen, reset]);

	return (
		<Modal
			title={`${isEdit ? "Edit Escalated" : "Escalate New"} Transaction`}
			open={isModalOpen && EntityType.CASES === entity}
			handleClose={onModalClose}
			size="lg"
		>
			<form onSubmit={() => {}}>
				{/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
				<section className="flex flex-col space-y-3 p-4">
					<div>
						<ReactSelect
							label="Merchant"
							control={control}
							name="merchant"
							options={getSelectData(MerchantData)}
							isLoading={false}
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
							options={getSelectData(Channels)}
							isLoading={false}
							isDisabled={false}
						/>
					</div>
					<div>
						<ReactSelect
							label="Transaction type"
							control={control}
							name="method"
							options={getSelectData(TrxnMethod)}
							isLoading={false}
							isDisabled={false}
						/>
					</div>
					<div>
						<ReactSelect
							label="Status"
							control={control}
							name="status"
							options={getSelectData(Status)}
							isLoading={false}
							isDisabled={false}
						/>
					</div>
					<div>
						<ReactSelect
							label="Caught By"
							control={control}
							name="analyst"
							options={getSelectData(analysts)}
							isLoading={false}
							isDisabled={false}
						/>
					</div>
					{/* <div>
						<TextField
							label="Fraud file"
							name="file"
							control={control}
							className="h-[45px] w-full rounded-md border p-2"
							type="file"
						/>
					</div> */}
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
						isLoading={false}
					/>
				</div>
			</form>
		</Modal>
	);
}
