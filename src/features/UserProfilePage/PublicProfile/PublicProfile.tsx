"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/ui/Form/Input/Input";
import Select from "@/components/ui/Form/Select/Select";
import Textarea from "@/components/ui/Form/Textarea/TextArea";
import Button from "@/components/ui/Button/Button";

import { publicProfileSchema } from "@/utils/validationSchemaGenerator";
import { NATIONALITIES_OPTIONS } from "@/constants/countries";
import { GENDER_OPTIONS } from "@/constants/gender";
import { useUpdateUserMutation } from "@/services";
import { User } from "@/store";
import styles from "./PublicProfile.module.css";
import { useAuthUser } from "@/hooks/useAuthUser";

export interface PublicProfileFormData {
	firstName?: string;
	lastName?: string;
	fullName: string;
	mobile?: string;
	gender?: string;
	nationality?: string;
	jobTitle?: string;
	organization?: string;
	discipline: string;
	graduationYear?: number;
	yearsOfTrainingExperience?: number;
	linkedinUrl?: string;
	facebookUrl?: string;
	bio?: string;
}

interface PublicProfileProps {
	user: User | null;
}

const PublicProfile: React.FC<PublicProfileProps> = ({ user }) => {
	const [updateUser, { isLoading }] = useUpdateUserMutation();
	const { authUser } = useAuthUser();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<PublicProfileFormData>({
		resolver: yupResolver(publicProfileSchema) as any,
		defaultValues: {
			fullName: user?.fullName,
			firstName: user?.firstName,
			lastName: user?.lastName,
			mobile: user?.mobile,
			gender: user?.gender,
			nationality: user?.nationality,
			jobTitle: user?.jobTitle,
			organization: user?.organization,
			discipline: user?.discipline,
			graduationYear: user?.graduationYear,
			yearsOfTrainingExperience: user?.yearsOfTrainingExperience,
			linkedinUrl: user?.linkedinUrl,
			facebookUrl: user?.facebookUrl,
			bio: user?.bio,
		},
	});

	const onSubmit = async (data: PublicProfileFormData) => {
		try {
			await updateUser({ id: authUser?.id, body: data }).unwrap();
			toast.success("User profile updated successfully");
		} catch (error: any) {
			toast.error("An error occurred. Please try again later.");
		}
	};

	return (
		<div className={styles["public-profile"]}>
			<div className={styles["public-profile__header"]}>
				<h2>Public Profile</h2>
				<p>Add information about yourself!</p>
			</div>
			<div className={styles["public-profile__content"]}>
				<div className={styles["public-profile__form-container"]}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className={styles["public-profile__form-inputs"]}>
							<Input
								label="First name"
								{...register("firstName")}
								error={errors.firstName}
							/>
							<Input
								label="Last name"
								{...register("lastName")}
								error={errors.lastName}
							/>
							<Input
								label="Full name"
								{...register("fullName")}
								error={errors.fullName}
							/>
							<Input
								label="Mobile No."
								{...register("mobile")}
								error={errors.mobile}
							/>
							<Select
								label="Gender"
								options={GENDER_OPTIONS}
								{...register("gender")}
								error={errors.gender}
							/>
							<Select
								label="Nationality"
								options={NATIONALITIES_OPTIONS}
								{...register("nationality")}
								error={errors.nationality}
							/>
							<Input
								label="Job Title"
								{...register("jobTitle")}
								error={errors.jobTitle}
							/>
							<Input
								label="Organization"
								{...register("organization")}
								error={errors.organization}
							/>
							<Input
								label="Discipline"
								{...register("discipline")}
								error={errors.discipline}
							/>
							<Input
								label="Graduation Year"
								type="number"
								{...register("graduationYear")}
								error={errors.graduationYear}
							/>
							<Input
								label="Years of training experience?"
								type="number"
								{...register("yearsOfTrainingExperience")}
								error={errors.yearsOfTrainingExperience}
							/>
							<Input
								label="Linkedin URL"
								{...register("linkedinUrl")}
								error={errors.linkedinUrl}
							/>
							<Input
								label="Facebook URL"
								{...register("facebookUrl")}
								error={errors.facebookUrl}
							/>
							<Textarea label="Bio" {...register("bio")} error={errors.bio} />
						</div>
						<div className={styles["public-profile__form__button-wrapper"]}>
							<Button
								type="submit"
								variant="primary"
								size="large"
								isLoading={isLoading}
							>
								Submit
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default PublicProfile;
