import SignInForm from "./_components/SignInForm";

export const metadata = {
  title: "Sign In",
};

export default function SignInPage() {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-5 py-10 sm:px-10 md:py-20 lg:px-20">
      <SignInForm />
    </div>
  );
}
