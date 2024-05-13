"use client";

import { useState } from "react";
import FormStepOne from "./FormStepOne";
import FormStepTwo from "./FormStepTwo";
import Form1 from "./Form1";

const Form = () => {
  const [showNextStep, setShowNextStep] = useState(false);

  const changeFormVisibilty = () => {
    setShowNextStep((prev) => !prev);
  };
  return (
    <>
      <Form1 />
      {/* <FormStepOne hidden={showNextStep} onChange={changeFormVisibilty} /> */}
      <FormStepTwo hidden={!showNextStep} onChange={changeFormVisibilty} />
    </>
  );
};

export default Form;
