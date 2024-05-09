"use client";

import { resetPassword } from "@/app/action";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { ResetPassword } from "@/types";
import { ResetPassSchema } from "@/types/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const ResetPassForm = () => {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token");
  console.log({ token });
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<ResetPassword>({ resolver: zodResolver(ResetPassSchema) });
  const onSubmit: SubmitHandler<ResetPassword> = async (data) => {
    if (data?.password !== data?.confirmPassword) {
      setError("root", { message: "Password does not match" });
      return;
    }
    try {
      const res = await resetPassword({
        password: data?.password,
        token: token as string,
      });
      toast.success("Password reset successful.");
      router.push("/login");
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };
  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label
          className="block font-medium text-sm text-gray-700"
          htmlFor="email"
        >
          Password
        </label>
        <Input
          id="password"
          type="password"
          autoFocus={true}
          {...register("password")}
          isError={Boolean(errors?.password)}
          message={errors?.password?.message}
          ref={register("password")?.ref}
        />
      </div>
      <div>
        <label
          className="block font-medium text-sm text-gray-700"
          htmlFor="email"
        >
          Confirm Password
        </label>
        <Input
          id="confirmPassword"
          type="password"
          autoFocus={true}
          {...register("confirmPassword")}
          isError={Boolean(errors?.confirmPassword)}
          message={errors?.confirmPassword?.message}
          ref={register("confirmPassword")?.ref}
        />
      </div>
      <p className="text-center mt-2 text-red-500 italic text-xs">
        {errors?.root?.message}
      </p>
      <div className="flex items-center gap-2 justify-end mt-4">
        <Button text="Update Password" />
      </div>
    </form>
  );
};

export default ResetPassForm;
