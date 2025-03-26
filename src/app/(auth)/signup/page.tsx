import SignUpForm from "./_components/SignupForm";

export const metadata = {
  title: "Sign Up",
};

export default function SignUpPage() {
  return (
    <div className="px-5 sm:px-10 py-10 lg:px-20 w-full max-w-[1440px] mx-auto">
      <SignUpForm />
    </div>
  );
}
