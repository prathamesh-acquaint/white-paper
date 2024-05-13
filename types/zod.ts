import { ZodType, z } from "zod";
import type {
  AddUser,
  EditUser,
  FormStepOneTypes,
  FormStepTwoTypes,
  FrogotPass,
  LoginUser,
  ResetPassword,
} from "@/types";

const MAX_FILE_SIZE = 12280000;
const ACCEPTED_IMAGE_TYPES = ["application/pdf"];

const FileSchema = z
  .any()
  // To not allow empty files
  .refine((files) => files?.length >= 1, { message: "Required." })
  // To not allow files other than pdf
  .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
    message: "Only pdf files are allowed.",
  })
  // To not allow files larger than 5MB
  .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
    message: `Max file size is 12.28MB.`,
  });

export const LoginSchema: ZodType<LoginUser> = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(20),
});

export const ForgotPassSchema: ZodType<FrogotPass> = z.object({
  email: z.string().email(),
});

export const AddUserSchema: ZodType<AddUser> = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(3).max(20),
  isadmin: z.boolean(),
});

export const EditUserSchema: ZodType<EditUser> = z.object({
  name: z.string().min(3),
  email: z.string().email(),
});

export const FromStep1Schema: ZodType<FormStepOneTypes> = z
  .object({
    name: z.string().min(3),
    email: z.string().email(),
    contentType: z.string().min(1, {
      message: "Required",
    }),
    topic: z.string().min(3),
    website: z.string().url().optional(),
    companyDesc: z.string().min(3).optional(),
  })
  .refine(
    (data) => {
      const websiteProvided = !!data.website;
      const companyDescProvided = !!data.companyDesc;
      return websiteProvided || companyDescProvided;
    },
    {
      message: "At least one of website or companyDesc should be provided",
    }
  );

export const FromStep2Schema: ZodType<FormStepTwoTypes> = z
  .object({
    writingStyle: z.string().min(1, {
      message: "Required",
    }),
    otherWritingStyle: z.string().optional(),
    guidelinePdf: FileSchema.optional(),
    guidelineDesc: z.string().min(3).optional(),
    outlinePdf: FileSchema.optional(),
    outlineDesc: z.string().min(3).optional(),
    additionalResource: FileSchema,
  })
  .refine(
    (data) => {
      const guidelineProvided =
        !!data.guidelinePdf ||
        !!data.guidelineDesc ||
        (!data.guidelinePdf && !data.guidelineDesc);
      const outlineProvided = !!data.outlinePdf || !!data.outlineDesc;
      // Conditionally validate otherWritingStyle only if writingStyle is "other"
      const writingStyleOther = data.writingStyle === "other";
      const otherWritingStyleProvided =
        !writingStyleOther || !!data.otherWritingStyle;
      return guidelineProvided && outlineProvided && otherWritingStyleProvided;
    },
    {
      message:
        "At least one of guideline (PDF or description) and one of outline (PDF or description) should be provided",
    }
  );

export const ResetPassSchema: ZodType<ResetPassword> = z.object({
  password: z.string().min(3),
  confirmPassword: z.string().min(3),
});
