export interface FormStepOneTypes {
  name: string;
  email: string;
  contentType: string;
  topic: string;
  website?: string;
  companyDesc?: string;
}

export interface FormStepTwoTypes {
  writingStyle: string;
  otherWritingStyle?: string;
  guidelinePdf?: File;
  guidelineDesc?: string;
  outlinePdf?: File;
  outlineDesc?: string;
  additionalResource?: File;
}

export interface AddUser {
  name: string;
  email: string;
  password: string;
  isadmin: boolean;
}

export interface EditUser {
  name: string;
  email: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface ResetPassword {
  password: string;
  confirmPassword: string;
}

export interface FrogotPass {
  email: string;
}

export interface User {
  name: string;
  email: string;
  id: string;
  isadmin: boolean;
  status: string;
}
