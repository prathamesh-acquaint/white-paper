"use client";

import { useState } from "react";
import FormStepOne from "./FormStepOne";
import FormStepTwo from "./FormStepTwo";

const Form = () => {
  const [showNextStep, setShowNextStep] = useState(false);

  const changeFormVisibilty = () => {
    setShowNextStep((prev) => !prev);
  };
  return (
    <>
      <FormStepOne hidden={showNextStep} onChange={changeFormVisibilty} />
      <FormStepTwo hidden={!showNextStep} onChange={changeFormVisibilty} />
    </>
  );
};

export default Form;
