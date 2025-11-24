import SignupForm from "@/components/SignupForm";
import AuthLayout from "@/components/AuthLayout";

export default function SignupPage() {
  return (
    <AuthLayout
      title="Create an account"
      subtitle="Enter your information to get started"
    >
      <SignupForm />
    </AuthLayout>
  );
}
