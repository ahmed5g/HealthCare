/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import {FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Control} from "react-hook-form";
import {FormFieldType} from "../forms/patientForm";
import Image from "next/image";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { Input } from './input';


interface CustomProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any>,
    fieldType: FormFieldType,
    label?: string,
    name?: string,
    placeholder?: string,
    iconSrc?: string,
    iconAlt?: string,
    disabled?: boolean,
    dateFormat?: string
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    renderSkeleton?: (field: any) => React.ReactNode,

}

const RenderField = ({field,props} : {field : any; props: CustomProps}) => {
    const { fieldType, iconSrc , iconAlt, placeholder} = props;
   switch (props.fieldType) {
       case FormFieldType.INPUT:
           return (
               <div className="flex rounded-md border border-drak-500 bg-dark-400">
                   {iconSrc && (
                       <Image
                           src={iconSrc}
                           alt={iconAlt || "icon"}
                           width={24}
                           height={24}
                           className='ml-2'
                       />

                   )}
                   <FormControl>
                       <Input
                       placeholder={placeholder}
                       {...field}
                           className="shad-input border-0"
                       />
                   </FormControl>
               </div>
           )
       case FormFieldType.PHONE:
           return (
               <FormControl>
                   <PhoneInput
                       placeholder={props.placeholder}
                       international
                       withCountryCallingCode
                       value={field.value as E164Number | undefined}
                       onChange={field.onChange}
                       className="input-number"
                       defaultCountry="TN"
                      />
               </FormControl>
           )
       default:
           break;
   }
}

const CustomFormField = (props: CustomProps) => {
    const {control, fieldType, name, label } = props;
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={'flex-1'}>
                    {fieldType !== FormFieldType.CHECKBOX && label && (
                        <FormLabel> {label}</FormLabel>
                    )}

                    <RenderField
                    field={field}
                    props={props}
                    />
                    <FormMessage className={"shad-error"}></FormMessage>
                </FormItem>
            )}
        />
    );
};

export default CustomFormField;
