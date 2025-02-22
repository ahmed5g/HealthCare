"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from "../ui/customFormField";
import SubmitButton from "../ui/submitButton";
import { useState } from "react";
import { userFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";
import { FormFieldType } from "./patientForm";
import { Doctors, GenderOptions } from "@/constants";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SelectItem } from "@/components/ui/select";

import Image from "next/image";

const RegisterForm = ({ user }: { user: User }) => {
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
        className="space-y-12 flex-1"
      >
        <section className="space-y-4">
          <h1 className="header">Hi there 👋 </h1>
          <p className="text-dark-700">Let us know more about yourself</p>
        </section>

        <section className="space-y-6">
          <h2 className="sub-header">Personal Information</h2>
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

        <div className="flex flex-col gap-6 xl:flex-row">
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
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.DATE_PICKER}
            name="birthDate"
            label="Date of Birth"
            placeholder="John.Doe@gmail.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.SKELETON}
            name="gender"
            label="Gender"
            renderSkeleton={({ value, onChange }) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 gap-6 xl:justify-between"
                  value={value} // Ensure value is controlled
                  onValueChange={onChange} // Update form state
                >
                  {GenderOptions.map((option) => (
                    <div key={option} className="radio-group">
                      <RadioGroupItem value={option} id={option} />
                      <label htmlFor={option} className="cursor-pointer">
                        {option}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>

        <section className="space-y-6">
          <h2 className="sub-header">Medical Information</h2>
        </section>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="adress"
            label="Address"
            placeholder="14th Straeet, New York"
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="occupation"
            label="Occupation"
            placeholder="Software Engineer"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="emergencyContactName"
            label="Emergency contact name"
            placeholder="Guardian's name"
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.PHONE}
            name="emergencyContactNumber"
            label="Emergency contact number"
            placeholder="ex:+1(868)579_9831"
          />
        </div>

        <section className="space-y-6">
          <h2 className="sub-header">Medical Inforamtion</h2>
        </section>

        <div className="flex flex-col gap-6 xl:flex-row">
  <CustomFormField
    control={form.control}
    fieldType={FormFieldType.SELECT}
    name="primaryPhysician"
    label="Primary physician"
    placeholder="Select a physician"
  >
    {Doctors.map((Doctor) => (
      <SelectItem key={Doctor.name} value={Doctor.name}>
        <div className="flex cursor-pointer items-center gap-2">
          <Image
            src={Doctor.image}
            alt={Doctor.name}
            width={32}
            height={32}
            className="rounded-full border border-dark-500"
          />
          <p>{Doctor.name}</p>
        </div>
      </SelectItem>
    ))}
  </CustomFormField>
</div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="insurance provider"
            label="Insurance provider"
            placeholder="ex: BlueCross"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.PHONE}
            name="InsurancePolicyNumber"
            label="Insurance policy number"
            placeholder="ex:ABC1234567"
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="Alergies"
            label="Alergies(if any)"
            placeholder="ex: Peanuts, Penicillin, Pollen"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="CurrentMedications"
            label="Current medications"
            placeholder="ex: Ibuprofen200mg,Levothyroxine50mg"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="FamilyMedicalHistory"
            label="Family medical history(if relavant)"
            placeholder="ex: Mother had breast cancer"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="PastMedicalHistory"
            label="Past medical history"
            placeholder="ex: Asthma diagnosis in childhood"
          />
        </div>

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
