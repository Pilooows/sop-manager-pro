
import { LoginForm } from "@/components/auth/LoginForm";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary to-background p-4">
      <div className="w-full max-w-md animate-fade-in">
        <LoginForm />
      </div>
    </div>
  );
};

export default Index;
