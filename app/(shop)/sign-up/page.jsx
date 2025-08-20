import dynamic from "next/dynamic";
import Link from "next/link";
const SignUpForm = dynamic(() => import("@/app/components/sign-up/Form"), {
});
const page = () => {
  return (
    <div className="my-container md:max-w-xl top-bottom-margin w-full flex flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-1 xl:gap-4">
        <h2 className="font-staatliches text-black text-xl lg:text-5xl">Create an Account</h2>
        <p className="font-roboto font-medium capitalize text-sub-work-card text-sm xl:text-xl xl:font-normal">Please fill in the fields below:</p>
      </div>
      <div className="flex flex-col gap-6 w-full">
        <SignUpForm type='sign-up' />
        {/* <div className="flex items-center gap-3 w-full *:w-full">
          <hr className="border-[#7F7F7F]" />
          or
          <hr className="border-[#7F7F7F]" />
        </div>
        <button className="btn w-full relative bg-transparent text-base font-normal border-black text-[#828282] hover:bg-transparent active:bg-transparent">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="absolute left-5"
          >
            <g clipPath="url(#clip0_50_6372)">
              <path
                d="M8.36055 0.789433C5.96258 1.62131 3.89457 3.20024 2.46029 5.29431C1.026 7.38838 0.301037 9.8872 0.391883 12.4237C0.482728 14.9603 1.38459 17.4008 2.96501 19.3869C4.54543 21.373 6.72109 22.8 9.17243 23.4582C11.1598 23.971 13.2419 23.9935 15.2399 23.5238C17.0499 23.1173 18.7233 22.2476 20.0962 21.0001C21.5251 19.662 22.5622 17.9597 23.0962 16.0763C23.6763 14.0282 23.7796 11.8743 23.3981 9.78006H12.2381V14.4094H18.7012C18.572 15.1478 18.2952 15.8525 17.8873 16.4814C17.4795 17.1102 16.9489 17.6504 16.3274 18.0694C15.5383 18.5917 14.6486 18.943 13.7156 19.1007C12.7798 19.2747 11.82 19.2747 10.8843 19.1007C9.93584 18.9048 9.03863 18.5134 8.24993 17.9513C6.98271 17.0543 6.0312 15.7799 5.53118 14.3101C5.02285 12.8126 5.02285 11.1893 5.53118 9.69193C5.8871 8.64234 6.47549 7.68669 7.25243 6.89631C8.14154 5.97521 9.26718 5.3168 10.5058 4.99333C11.7445 4.66985 13.0484 4.6938 14.2743 5.06256C15.2321 5.35641 16.1079 5.87008 16.8318 6.56256C17.5606 5.83756 18.2881 5.11068 19.0143 4.38193C19.3893 3.99006 19.7981 3.61693 20.1674 3.21568C19.0622 2.18728 17.7649 1.387 16.3499 0.860683C13.7731 -0.0749616 10.9536 -0.100106 8.36055 0.789433Z"
                fill="white"
              />
              <path
                d="M8.3607 0.789367C10.9536 -0.100776 13.7731 -0.0762934 16.3501 0.858742C17.7653 1.38864 19.062 2.19277 20.1657 3.22499C19.7907 3.62624 19.3951 4.00124 19.0126 4.39124C18.2851 5.11749 17.5582 5.84124 16.832 6.56249C16.108 5.87001 15.2322 5.35635 14.2745 5.06249C13.0489 4.69244 11.7451 4.66711 10.5061 4.98926C9.26712 5.31141 8.14079 5.96861 7.2507 6.88874C6.47377 7.67912 5.88538 8.63477 5.52945 9.68437L1.64258 6.67499C3.03384 3.91604 5.44273 1.80566 8.3607 0.789367Z"
                fill="#E33629"
              />
              <path
                d="M0.611401 9.6563C0.820163 8.62087 1.16701 7.61816 1.64265 6.67505L5.52953 9.69192C5.02119 11.1893 5.02119 12.8126 5.52953 14.31C4.23453 15.31 2.9389 16.315 1.64265 17.325C0.452308 14.9556 0.0892746 12.256 0.611401 9.6563Z"
                fill="#F8BD00"
              />
              <path
                d="M12.2381 9.77808H23.3981C23.7797 11.8723 23.6764 14.0262 23.0963 16.0743C22.5623 17.9577 21.5252 19.66 20.0963 20.9981C18.8419 20.0193 17.5819 19.0481 16.3275 18.0693C16.9494 17.6498 17.4802 17.1091 17.8881 16.4796C18.296 15.85 18.5726 15.1446 18.7013 14.4056H12.2381C12.2363 12.8643 12.2381 11.3212 12.2381 9.77808Z"
                fill="#587DBD"
              />
              <path
                d="M1.64062 17.3251C2.93687 16.3251 4.2325 15.3201 5.5275 14.3101C6.02851 15.7804 6.98138 17.0549 8.25 17.9513C9.04116 18.5107 9.9403 18.899 10.89 19.0913C11.8257 19.2653 12.7855 19.2653 13.7213 19.0913C14.6543 18.9336 15.544 18.5823 16.3331 18.0601C17.5875 19.0388 18.8475 20.0101 20.1019 20.9888C18.7292 22.237 17.0558 23.1073 15.2456 23.5144C13.2476 23.9841 11.1655 23.9616 9.17813 23.4488C7.60632 23.0291 6.13814 22.2893 4.86563 21.2757C3.51886 20.2062 2.41882 18.8587 1.64062 17.3251Z"
                fill="#319F43"
              />
            </g>
            <defs>
              <clipPath id="clip0_50_6372">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
          Sign in with Google
        </button> */}
        <p className="font-roboto text-sm lg:text-base font-normal text-title-work-card">
          {'By continuing you agree to our '}
          <Link className="text-[#1599D2] underline" href="/terms-of-use/">
            Terms of Use,
          </Link>
          {' our '}
          <Link className="text-[#1599D2] underline" href="/privacy/">
            Privacy Policy
          </Link>
          {/* {' and the Matchmytees '}
          <Link className="text-[#1599D2] underline" href="/#">
            Program Terms.
          </Link> */}
        </p>
        <hr className="border-[#7F7F7F] w-full" />
        <h3 className="font-roboto text-sm md:text-base xl:text-xl font-normal text-title-work-card">
          Already have an account? {" "}
          <Link className="text-[#1599D2]" href="/sign-in">
            Login
          </Link>
        </h3>
      </div>
    </div>
  );
};

export default page;
