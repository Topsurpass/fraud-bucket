import { useEffect, useState, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { TextField, PasswordField, ReactSelect } from "@/components/ui/forms";
import useGlobalProvider from "@/hooks/use-global-provider";
import QueryKeys from "@/api/query-keys";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { EntityType, RequestMethod } from "@/types/enum";
import useMutateUser from "@/api/users/use-mutate-user";
import LoadingSpinner from "@/assets/icons/loading-spinner";
import { RolesData } from "@/lib/constants";

import {
	SettingUserInputs,
	SettingUserSchema,
} from "@/validations/settins-user-schema";

const initialValues = {
	firstname: "",
	lastname: "",
	email: "",
	phone: "",
	jobTitle: "",
	role: {},
};

export default function UserModal() {
	const { isModalOpen, onModalClose, entity, isEdit, formData } =
		useGlobalProvider();
	const { mutate: mutateUser, isPending } = useMutateUser();
	const [showPassword, setShowPassword] = useState(false);
	const queryClient = useQueryClient();
	const { control, handleSubmit, reset } = useForm<SettingUserInputs>({
		resolver: zodResolver(SettingUserSchema(isEdit)),
		defaultValues: initialValues,
	});

	const processForm: SubmitHandler<SettingUserInputs> = async (payload) => {
		const { password, ...rest } = payload;
		const requestPayload = {
			firstname: rest?.firstname,
			lastname: rest?.lastname,
			jobTitle: rest?.jobTitle,
			email: rest?.email,
			phone: rest?.phone,
			role: rest?.role.value,
		} as any;

		if (!isEdit) {
			requestPayload.password = password;
		}
		mutateUser(
			{
				requestMethod: isEdit
					? RequestMethod.PATCH
					: RequestMethod.POST,
				requestPayload,
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
					reset();
				},
				onError: (err: any) => {
					toast.error(err.response.data.error);
				},
			},
		);
	};

	const optionsRole = useMemo(() => {
		return RolesData?.map((role) => ({
			value: role.value,
			label: role.label,
		}));
	}, [RolesData]);

	useEffect(() => {
		if (isEdit && formData) {
			reset({
				firstname: formData?.firstname,
				lastname: formData?.lastname,
				jobTitle: formData?.jobTitle,
				email: formData?.email,
				phone: formData?.phone,
				role: {
					value: formData?.role,
					label: formData?.role,
				},
			});
		}
	}, [formData, reset, isEdit]);

	useEffect(() => {
		if (!isModalOpen) reset({ ...initialValues });
	}, [isModalOpen, reset]);

	return (
		<Modal
			title={`${isEdit ? "Edit" : "Add"} User`}
			open={isModalOpen && EntityType.SETTING_USER === entity}
			handleClose={onModalClose}
			size="3xl"
		>
			{isPending && <LoadingSpinner className="text-2xl" />}

			<form onSubmit={() => {}}>
				{/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}

				<section className="grid grid-cols-2 gap-3 p-4">
					<div>
						<TextField
							label="First name"
							name="firstname"
							control={control}
							className="h-[45px] w-full rounded-md border p-2"
						/>
					</div>
					<div>
						<TextField
							label="Last name"
							name="lastname"
							control={control}
							className="h-[45px] w-full rounded-md border p-2"
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
					<div>
						<TextField
							label="Job Tile"
							name="jobTitle"
							control={control}
							className="h-[45px] w-full rounded-md border p-2"
						/>
					</div>
					<div>
						<ReactSelect
							label="Role"
							control={control}
							name="role"
							options={optionsRole}
							isDisabled={false}
						/>
					</div>
					{!isEdit && (
						<div className="w-full">
							<PasswordField
								label="Password"
								name="password"
								control={control}
								showPassword={showPassword}
								placeholder="Enter user password"
								onIconClick={() =>
									setShowPassword(!showPassword)
								}
								type={showPassword ? "text" : "password"}
								showLeftIcon={false}
								className="w-full rounded-md border px-2 py-3"
							/>
						</div>
					)}
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
