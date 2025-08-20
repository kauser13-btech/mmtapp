import Form from "../Form";

const SignInModal = ({ handleSignInModal }) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-staatliches text-center text-black text-xl lg:text-2xl">
        Login to MatchMyTees
      </h2>
      <Form handleSignInModal={handleSignInModal} type={"signInModal"} />
    </div>
  );
};

export default SignInModal;
