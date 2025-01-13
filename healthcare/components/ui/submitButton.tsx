import React from "react";
import { Button, ButtonProps } from "./button";
import Image from "next/image";

interface buttonProps {
  isLoading: boolean;
  className?: string;
  children?: React.ReactNode;
}
const submitButton = ({ isLoading, className, children }: ButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={className ?? "shad-primary-btn w-full"}
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          <Image
            src={"/assets/icons/loader.svg"}
            alt={"loader"}
            width={24}
            height={24}
          ></Image>
          <span>Loading...</span>
        </div>
      ) : 
        children
      }
    </Button>
  );
};

export default submitButton;