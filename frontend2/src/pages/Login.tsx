import LoginForm, { LoginFormValues } from "@/components/form/LoginForm";
import { toast } from "@/components/ui/use-toast";

const Login = () => {
  const handleLogin = (data: LoginFormValues) => {
    toast({
      title: "NOTIFICATION",
      description: "Login success",
      variant: "success",
      duration: 2500
    });
    console.log(data);
  };
  return ( 
    <div className="flex justify-center items-center h-screen">
      <LoginForm onSubmit={handleLogin} />
    </div>
   );
}
 
export default Login;