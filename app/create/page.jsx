"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useBioFormContext } from "@app/context/BioProvider";
import Form from "@components/Form";

const CreatePrompt = () => {
  const router = useRouter();
  const { bioFormDataHandler } = useBioFormContext();

  const [submitting, setIsSubmitting] = useState(false);

  const createBioData = async (data) => {
    setIsSubmitting(true);

    try {
      router.push("/biodata");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form type="Create" submitting={submitting} handleSubmit={createBioData} />
  );
};

export default CreatePrompt;
