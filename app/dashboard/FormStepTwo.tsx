"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Tooltip from "@/components/Tooltip";
import { writingStyleOptions } from "@/constants";
import { FormStepTwoTypes } from "@/types";
import { FromStep2Schema } from "@/types/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { longFormSubmit } from "../action";
import { toast } from "react-hot-toast";
import Textarea from "@/components/Textarea";

interface PropTypes {
  onChange: (arg1?: boolean, arg2?: FormStepTwoTypes) => void;
  hidden: boolean;
}

const FormStepTwo = ({ onChange, hidden }: PropTypes) => {
  const router = useRouter();
  const [radioValue, setRadioValue] = useState("");
  const [outlineRadio, setOutlineRadio] = useState("");
  const {
    register,
    unregister,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormStepTwoTypes>({
    resolver: zodResolver(FromStep2Schema),
  });

  const onSubmit: SubmitHandler<FormStepTwoTypes> = async (data) => {
    const stepOneData = JSON.parse(localStorage.getItem("formData") as string);
    const formData = new FormData();
    const pdfFields = ["guidelinePdf", "outlinePdf", "additionalResource"];
    const newData = { ...data, ...stepOneData };

    for (const key in newData) {
      if (pdfFields.includes(key)) {
        const file = newData[key][0];
        formData.append(key, file);
        newData[key] = file.name;
      } else {
        formData.append(key, newData[key]);
      }
    }
    try {
      const res = await longFormSubmit(formData);
      console.log(res, "RESponse");
      toast.success("Form Submitted Successfully.");
      localStorage.setItem("formData", JSON.stringify(newData));
    } catch (error) {
      console.log(error, "Something bad happened.");
      toast.error("Something bad happened.");
    }
  };
  return (
    <form
      className={`w-full flex-col gap-5 ${hidden ? "hidden" : "flex"}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className=" flex items-center">
        <div className="w-1/3">
          <div className="flex gap-2">
            <h2 className="block text-gray-700 text-sm font-bold mb-2">
              Select Writing Style:
            </h2>
            <Tooltip id={6} message="Please select writing style" />
          </div>
        </div>
        <div className="w-2/3">
          <Select
            options={writingStyleOptions}
            id="writingStyle"
            {...register("writingStyle")}
            isError={Boolean(errors?.writingStyle)}
            message={errors?.writingStyle?.message}
            ref={register("writingStyle")?.ref}
          />
        </div>
      </div>
      {watch("writingStyle") === "other" && (
        <div className=" flex items-center">
          <div className="w-1/3"></div>
          <div className="w-2/3">
            <Input
              id="otherWritingStyle"
              type="text"
              {...register("otherWritingStyle")}
              isError={Boolean(errors?.otherWritingStyle)}
              message={errors?.otherWritingStyle?.message}
              ref={register("otherWritingStyle")?.ref}
            />
          </div>
        </div>
      )}
      <div className=" flex items-center">
        <div className="w-1/3">
          <div className="flex gap-2">
            <h2 className="block text-gray-700 text-sm font-bold mb-2">
              The Tone of Voice Guidelines
            </h2>
            <Tooltip id={7} message="Please select Tone of Voice Guidelines" />
          </div>
        </div>
        <div className="w-2/3">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="selectedToneOfVoice"
              value={"uploadPdf"}
              onClick={() => {
                setRadioValue("uploadPdf");
                unregister("guidelineDesc");
              }}
            />
            <span>Upload PDF</span>
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="selectedToneOfVoice"
              id="selectedToneOfVoice"
              value={"enterManually"}
              onClick={() => {
                setRadioValue("enterManually");
                unregister("guidelinePdf");
              }}
            />
            <span>Enter Manually</span>
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="selectedToneOfVoice"
              id="selectedToneOfVoice"
              value={"none"}
              onClick={() => {
                setRadioValue("na");
                unregister("guidelinePdf");
                unregister("guidelineDesc");
              }}
            />
            <span>Not Available</span>
          </label>
          {radioValue === "uploadPdf" && (
            <Input
              id="guidelinePdf"
              type="file"
              {...register("guidelinePdf")}
              isError={Boolean(errors?.guidelinePdf)}
              message={errors?.guidelinePdf?.message}
              ref={register("guidelinePdf")?.ref}
            />
          )}
          {radioValue === "enterManually" && (
            <Textarea
              id="enterManually"
              rows={5}
              {...register("guidelineDesc")}
              isError={Boolean(errors?.guidelineDesc)}
              message={errors?.guidelineDesc?.message}
              ref={register("guidelineDesc")?.ref}
            />
          )}
        </div>
      </div>
      <div className=" flex items-center">
        <div className="w-1/3">
          <div className="flex gap-2">
            <h2 className="block text-gray-700 text-sm font-bold mb-2">
              Content Outline
            </h2>
            <Tooltip id={8} message="Please select Tone of Voice Guidelines" />
          </div>
        </div>
        <div className="w-2/3">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              id="selectedToneOfVoice"
              name="contentOutline"
              value={"uploadPdf"}
              onClick={() => {
                setOutlineRadio("uploadPdf");
                unregister("outlineDesc");
              }}
            />
            <span>Upload PDF</span>
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="contentOutline"
              id="enterManuallyContent"
              value={"enterManuallyContent"}
              onClick={() => {
                setOutlineRadio("enterManuallyContent");
                unregister("outlinePdf");
              }}
            />
            <span>Enter Manually</span>
          </label>
          {outlineRadio === "uploadPdf" && (
            <Input
              id="outlinePdf"
              type="file"
              {...register("outlinePdf")}
              isError={Boolean(errors?.outlinePdf)}
              message={errors?.outlinePdf?.message}
              ref={register("outlinePdf")?.ref}
            />
          )}
          {outlineRadio === "enterManuallyContent" && (
            <Textarea
              id="enterManually"
              rows={5}
              {...register("outlineDesc")}
              isError={Boolean(errors?.outlineDesc)}
              message={errors?.outlineDesc?.message}
              ref={register("outlineDesc")?.ref}
            />
          )}
        </div>
      </div>
      <div className=" flex items-center">
        <div className="w-1/3">
          <div className="flex gap-2">
            <h2 className="block text-gray-700 text-sm font-bold mb-2">
              Upload Additional Resources
            </h2>
            <Tooltip id={9} message="Please upload additional resources" />
          </div>
        </div>
        <div className="w-2/3">
          <Input
            id="additionalResource"
            type="file"
            {...register("additionalResource")}
            isError={Boolean(errors?.additionalResource)}
            message={errors?.additionalResource?.message}
            ref={register("additionalResource")?.ref}
          />
        </div>
      </div>
      <div className="flex items-center justify-between mt-6">
        <div className="w-1/3"></div>
        <div className="w-2/3 flex gap-3 items-center">
          <Button
            text="Previous"
            btnType="secondary"
            type="button"
            onClick={() => onChange()}
          />
          <Button text="Generate" type="submit" />
        </div>
      </div>
    </form>
  );
};

export default FormStepTwo;
