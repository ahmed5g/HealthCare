"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import CustomFormField from "../ui/customFormField";
import SubmitButton from "../ui/submitButton";
import { useState } from "react";
import { userFormValidation } from "@/lib/validation";
import { useRouter } from "next/router";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}



export function patientForm() {

    const router = useRouter;

  const [isLoading, setIsLoading] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof userFormValidation>>({
    resolver: zodResolver(userFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone :""
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof userFormValidation>) {
    setIsLoading(true);

    try {
        // const userData = {name, email, phone};
        // const user = await createUser(userData)
        // if (user) router.push(`/patients/${user.$id}/register`)
    } catch (error) {
        console.log(error)
        
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there 👋 </h1>
          <p className="text-dark-700">Schedule your first appointment</p>
        </section>
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="name"
          label="Full Name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        ></CustomFormField>
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="email"
          label="Email"
          placeholder="John.Doe@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        ></CustomFormField>
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.PHONE}
          name="phone"
          label="phone number"
          placeholder="(+216) 56 708 853 "
        ></CustomFormField>
        <SubmitButton isLoading={isLoading}>get Started</SubmitButton>{" "}
      </form>
    </Form>
  );
}
export default patientForm;
