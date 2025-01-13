"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import CustomFormField from "../ui/customFormField";
import SubmitButton from "../ui/submitButton";
import { useState } from "react";
import { userFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
  EMAIL = "email",
}

const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof userFormValidation>>({
    resolver: zodResolver(userFormValidation),
    defaultValues: {
      name: "", 
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof userFormValidation>) => {
    setIsLoading(true);
    console.log("Form submitted with values:", values); // Debugging

    try {
      const user = await createUser(values);
      if (user) router.push(`/patients/${user.$id}/register`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log("Form errors:", form.formState.errors); // Debugging

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => {
          console.log("Form submission triggered with values:", values); // Debugging
          onSubmit(values);
        })}
        className="space-y-6 flex-1"
      >
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there 👋 </h1>
          <p className="text-dark-700">Schedule your first appointment</p>
        </section>
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="name" // Updated to match schema
          label="Full Name"
          placeholder="JohnDoe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="email"
          label="Email"
          placeholder="John.Doe@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.PHONE}
          name="phone"
          label="Phone Number"
          placeholder="(+216) 56 708 853"
        />
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;