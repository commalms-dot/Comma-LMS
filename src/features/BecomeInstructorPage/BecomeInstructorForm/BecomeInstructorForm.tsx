"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Input from "@/components/ui/Form/Input/Input";
import Button from "@/components/ui/Button/Button";
import Textarea from "@/components/ui/Form/Textarea/TextArea";
import FileUploader from "@/components/ui/Form/FileUploader/FileUploader";
import Select from "@/components/ui/Form/Select/Select";
import { generateValidationSchema } from "@/utils";
import { NATIONALITIES_OPTIONS } from "@/constants/countries";
import { GENDER_OPTIONS } from "@/constants/gender";
import { useCreateInstructorMutation } from "@/services";
import ROUTES from "@/constants/routes";
import styles from "./BecomeInstructorForm.module.css";

export interface BecomeInstructorFormData {
	firstName: string;
	lastName: string;
	gender: string;
	email: string;
	mobile: string;
	linkedinUrl: string;
	facebookUrl: string;
	nationality: string;
	graduationYear: number;
	jobTitle: string;
	organization: string;
	discipline: string;
	bio: string;
	yearsOfTrainingExperience: number;
	topics: string;
	photo: any;
	cv: any;
}

const schema = generateValidationSchema([
	"firstName",
	"lastName",
	"gender",
	"email",
	"mobile",
	"linkedinUrl",
	"facebookUrl",
	"nationality",
	"graduationYear",
	"jobTitle",
	"organization",
	"discipline",
	"bio",
	"yearsOfTrainingExperience",
	"topics",
	"photo",
	"cv",
]);

const BecomeInstructorPage = () => {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm<BecomeInstructorFormData>({
		resolver: yupResolver(schema) as any,
	});

	const [createInstructor, { isLoading }] = useCreateInstructorMutation();

	const onSubmit = async (data: BecomeInstructorFormData) => {
		try {
			await createInstructor(data).unwrap();
			toast.success("Your application is submitted and will be verified!");
			reset();
			router.push(ROUTES.HOME);
		} catch (error: any) {
			if (error?.status === 409) {
				toast.error("Email address is already in use");
			} else {
				toast.error("An error occurred. Please try again later.");
			}
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div>
				<div className={styles["become-instructor-page__form-group"]}>
					<Input
						label="First Name"
						{...register("firstName")}
						error={errors.firstName}
					/>
					<Input
						label="Last Name"
						{...register("lastName")}
						error={errors.lastName}
					/>
				</div>
				<div className={styles["become-instructor-page__form-group"]}>
					<Input
						label="Mobile No."
						{...register("mobile")}
						error={errors.mobile}
					/>
					<Input
						label="Email"
						type="email"
						{...register("email")}
						error={errors.email}
					/>
				</div>
				<div className={styles["become-instructor-page__form-group"]}>
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
				</div>
				<div className={styles["become-instructor-page__form-group"]}>
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
				</div>
				<div className={styles["become-instructor-page__form-group"]}>
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
				</div>
				<div className={styles["become-instructor-page__form-group"]}>
					<Input
						label="Years of training experience?"
						type="number"
						{...register("yearsOfTrainingExperience")}
						error={errors.yearsOfTrainingExperience}
					/>
					<Input
						label="Graduation Year"
						type="number"
						{...register("graduationYear")}
						error={errors.graduationYear}
					/>
				</div>
				<div className={styles["become-instructor-page__form-group"]}>
					<Input
						label="Discipline"
						{...register("discipline")}
						error={errors.discipline}
					/>
					<Input
						label="Topics you want to introduce"
						{...register("topics")}
						error={errors.topics}
					/>
				</div>
				<div className={styles["become-instructor-page__form-group"]}>
					<FileUploader
						control={control}
						name="cv"
						label="CV"
						accept=".pdf"
						error={errors.cv}
					/>
					<FileUploader
						control={control}
						name="photo"
						label="Photo"
						accept=".jpg,.jpeg,.png"
						error={errors.photo}
					/>
				</div>
				<div
					className={`${styles["become-instructor-page__form-group--full-width"]}`}
				>
					<Textarea label="Biography" {...register("bio")} error={errors.bio} />
				</div>
			</div>
			<div className={styles["become-instructor-page-form__button-wrapper"]}>
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
	);
};

export default BecomeInstructorPage;
