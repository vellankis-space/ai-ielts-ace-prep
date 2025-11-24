import LoginForm from "@/components/LoginForm";
import AuthLayout from "@/components/AuthLayout";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Enter your email to sign in to your account"
    >
      <LoginForm />
    </AuthLayout>
  );
}
