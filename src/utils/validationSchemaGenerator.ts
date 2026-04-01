import * as yup from "yup";

const currentYear = new Date().getFullYear();
const maxGraduationYear = currentYear - 70;

const validationRules = {
  currentPassword: yup.string().required("Current password is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
  newPassword: yup
    .string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.newPassword === value;
    }),
  country: yup.string().required("Country is required"),
  fullName: yup
    .string()
    .required("Full name is required")
    .min(2, "Full name must be at least 2 characters long"),
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  gender: yup.string().required("Gender is required"),
  mobile: yup.string().required("Mobile is required"),
  nationality: yup.string().required("Nationality is required"),
  jobTitle: yup.string().required("Job Title is required"),
  organization: yup.string().required("organization is required"),
  discipline: yup.string().required("Discipline is required"),
  bio: yup.string().required("Biography is required"),
  topics: yup.string().required("Topics are required"),
  linkedinUrl: yup
    .string()
    .url("Invalid URL")
    .required("Linkedin URL is required"),
  facebookUrl: yup
    .string()
    .url("Invalid URL")
    .required("Facebook URL is required"),
  graduationYear: yup
    .number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    )
    .nullable()
    .required("Graduation Year is required")
    .min(maxGraduationYear, `Year must be ${maxGraduationYear} or later`)
    .max(currentYear, `Year must be ${currentYear} or earlier`)
    .integer("Year must be an integer"),
  yearsOfTrainingExperience: yup
    .number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    )
    .nullable()
    .required("Years of training experience is required")
    .min(0, "Years of experience must be at least 0")
    .max(45, "Years of experience must not exceed 45")
    .integer("Years must be an integer"),
  photo: yup.mixed().required("Photo is required"),
  cv: yup.mixed().required("CV is required"),
};

const generateValidationSchema = (names: (keyof typeof validationRules)[]) => {
  const schemaShape: Record<string, any> = {};

  names.forEach((name) => {
    const rule = validationRules[name];
    if (rule) {
      schemaShape[name] = rule;
    }
  });

  return yup.object().shape(schemaShape);
};

export default generateValidationSchema;

const publicProfileFields = {
  firstName: yup.string(),
  lastName: yup.string(),
  fullName: yup
    .string()
    .required("Full name is required")
    .min(2, "Full name must be at least 2 characters long"),
  mobile: yup.string(),
  gender: yup.string(),
  nationality: yup.string(),
  jobTitle: yup.string(),
  organization: yup.string(),
  discipline: yup.string(),
  graduationYear: yup
    .number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    )
    .nullable()
    .min(maxGraduationYear, `Year must be ${maxGraduationYear} or later`)
    .max(currentYear, `Year must be ${currentYear} or earlier`)
    .integer("Year must be an integer"),
  yearsOfTrainingExperience: yup
    .number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    )
    .nullable()
    .min(0, "Years of experience must be at least 0")
    .max(45, "Years of experience must not exceed 45")
    .integer("Years must be an integer"),
  linkedinUrl: yup.string().url("Invalid URL"),
  facebookUrl: yup.string().url("Invalid URL"),
  bio: yup.string(),
};

export const publicProfileSchema = yup.object().shape(publicProfileFields);
