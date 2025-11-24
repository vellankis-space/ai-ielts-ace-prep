import ForgotPasswordForm from "@/components/ForgotPasswordForm";
import AuthLayout from "@/components/AuthLayout";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter your email to receive a reset link"
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}