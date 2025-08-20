import dynamic from "next/dynamic";
const SignInForm = dynamic(() => import("@/app/components/sign-in/Form"), {

});

const page = () => {
  return (
    <div className="my-container max-w-xl mx-auto top-bottom-margin flex flex-col justify-center gap-4">
      <div className="flex flex-col items-center gap-1 xl:gap-4">
        <h2 className="font-staatliches text-black text-xl lg:text-5xl">
          Login
        </h2>
        <p className="font-roboto font-medium capitalize text-sub-work-card text-sm xl:text-xl xl:font-normal">
          please enter your email & password
        </p>
      </div>

      <SignInForm />
    </div>
  );
};

export default page;
