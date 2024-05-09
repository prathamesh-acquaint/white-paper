"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Textarea from "@/components/Textarea";
import Tooltip from "@/components/Tooltip";
import { contentTypeOptions } from "@/constants";
import { FormStepOneTypes } from "@/types";
import { FromStep1Schema } from "@/types/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface PropTypes {
  onChange: () => void;
  hidden: boolean;
}

const FormStepOne = ({ onChange, hidden }: PropTypes) => {
  const [radioValue, setRadioValue] = useState("");
  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors },
  } = useForm<FormStepOneTypes>({ resolver: zodResolver(FromStep1Schema) });

  const onSubmit: SubmitHandler<FormStepOneTypes> = (data) => {
    const oldData = JSON.parse(localStorage.getItem("formData") as string);
    localStorage.setItem("formData", JSON.stringify({ ...oldData, ...data }));
    localStorage.setItem("radioValue1", JSON.stringify(radioValue));
    onChange();
  };

  return (
    <form
      className={`w-full flex-col gap-5 ${hidden ? "hidden" : "flex"}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full  flex  items-center">
        <div className="w-1/3">
          <div className="flex gap-2">
            <h2 className="block text-gray-700 text-sm font-bold mb-2">Name</h2>
            <Tooltip id={1} message="Please Enter Name" />
          </div>
        </div>
        <div className="w-2/3">
          <Input
            id="name"
            type="text"
            {...register("name")}
            isError={Boolean(errors?.name)}
            message={errors?.name?.message}
            ref={register("name")?.ref}
          />
        </div>
      </div>
      <div className=" flex items-center">
        <div className="w-1/3">
          <div className="flex gap-2">
            <h2 className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </h2>
            <Tooltip id={2} message="Please Enter Email" />
          </div>
        </div>
        <div className="w-2/3">
          <Input
            id="email"
            type="text"
            {...register("email")}
            isError={Boolean(errors?.email)}
            message={errors?.email?.message}
            ref={register("email")?.ref}
          />
        </div>
      </div>
      <div className=" flex items-center">
        <div className="w-1/3">
          <div className="flex gap-2">
            <h2 className="block text-gray-700 text-sm font-bold mb-2">
              Select Content Type:
            </h2>
            <Tooltip id={3} message="Please select content type" />
          </div>
        </div>
        <div className="w-2/3">
          <Select
            options={contentTypeOptions}
            id="contentType"
            {...register("contentType")}
            isError={Boolean(errors?.contentType)}
            message={errors?.contentType?.message}
            ref={register("contentType")?.ref}
          />
        </div>
      </div>
      <div className=" flex items-center">
        <div className="w-1/3">
          <div className="flex gap-2">
            <h2 className="block text-gray-700 text-sm font-bold mb-2">
              Topic
            </h2>
            <Tooltip id={4} message="Please enter topic" />
          </div>
        </div>
        <div className="w-2/3">
          <Input
            id="topic"
            type="text"
            {...register("topic")}
            isError={Boolean(errors?.topic)}
            message={errors?.topic?.message}
            ref={register("topic")?.ref}
          />
        </div>
      </div>
      <div className=" flex items-center">
        <div className="w-1/3">
          <div className="flex gap-2">
            <h2 className="block text-gray-700 text-sm font-bold mb-2">
              Website or Company
            </h2>
            <Tooltip
              id={5}
              message="Please select Website or Company Description"
            />
          </div>
        </div>
        <div className="w-2/3">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="websiteOrcomp"
              value={"website"}
              onClick={() => {
                setRadioValue("website");
                unregister("companyDesc");
              }}
            />
            <span>Website URL</span>
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="websiteOrcomp"
              value={"companyDesc"}
              onClick={() => {
                setRadioValue("companyDesc");
                unregister("website");
              }}
            />
            <span>Company Description</span>
          </label>
          {radioValue === "website" && (
            <Input
              id="website"
              type="text"
              {...register("website")}
              isError={Boolean(errors?.website)}
              message={errors?.website?.message}
              ref={register("website")?.ref}
            />
          )}
          {radioValue === "companyDesc" && (
            <Textarea
              {...register("companyDesc")}
              id="companyDesc"
              rows={5}
              isError={Boolean(errors?.companyDesc)}
              message={errors?.companyDesc?.message}
              ref={register("companyDesc")?.ref}
            />
          )}
        </div>
      </div>
      <div className="flex items-center justify-between mt-6">
        <div className="w-1/3"></div>
        <div className="w-2/3">
          <Button btnType="primary" text="Next" type="submit" />
        </div>
      </div>
    </form>
  );
};

export default FormStepOne;
