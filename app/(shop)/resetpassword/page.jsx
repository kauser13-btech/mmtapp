
"use client";
import ResetPassForm from "@/app/components/resetpassword/ResetPassForm";
import Link from "next/link";

const ResetPasswordPage = () => {
  return (
    <div className="my-container max-w-xl mx-auto top-bottom-margin flex flex-col justify-center gap-4">
      <div className="flex flex-col items-center gap-1 xl:gap-4">
        <h2 className="font-staatliches text-black text-xl lg:text-5xl">
          Reset Password!
        </h2>
        <p className="font-roboto text-center font-medium capitalize text-sub-work-card text-sm xl:text-xl xl:font-normal">
          Please provide your updated password.
        </p>
      </div>

      <ResetPassForm />

      <p className="font-roboto text-sm lg:text-base font-normal text-title-work-card">
        By continuing you agree to our{" "}
        <Link className="text-[#1599D2] underline" href="/#">
          Terms and Conditions,
        </Link>
        our{" "}
        <Link className="text-[#1599D2] underline" href="/#">
          Privacy Policy,
        </Link>{" "}
        and the MatchMyTees
        <Link className="text-[#1599D2] underline" href="/#">
          {" "}
          Program Terms.
        </Link>
      </p>
      <hr className="border-[#7F7F7F] w-full" />
      <h3 className="font-roboto text-sm md:text-base xl:text-xl font-normal text-title-work-card">
        Don’t have an account?{" "}
        <Link className="text-[#1599D2] underline" href="/sign-up">
          Create an account
        </Link>{" "}
        or Sigin your existing account{" "}
        <Link className="text-[#1599D2] underline" href="/sign-in">
          Sign in
        </Link>
      </h3>
    </div>
  );
};


export default ResetPasswordPage;
