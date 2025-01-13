import PatientForm from "@/components/forms/patientForm";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex h-screen max-h-screen bg-black-900 text-white">
            <section className="remove-scrollbar container my-auto">
                <div className="sub-container max-w-[496px] mx-auto ">
                    <Image
                        src={"/assets/icons/logo-full.svg"}
                        alt={"CarePulse Logo"}
                        width={1000}
                        height={1000}
                        className="mb-12 h-10 w-fit "
                    />

                    <PatientForm/>
                    <div className="text-14-regular mt-20 flex justify-between">

                    <p className="justify-items-end text-gray-600 xl:text-left">
                        &copy; 2023 CarePulse. All rights reserved.
                    </p>

                        <Link rel="stylesheet" href="/?admin=true" className='text-green-500'>
                            Admin
                        </Link>
                    </div>
                </div>


            </section>
                    <Image
                        src="/assets/images/onboarding-img.png"
                        height={1000}
                        width={1000}
                        alt={"patient"}
                    className="side-img max-w-[50%]"/>
        </div>
    );
}