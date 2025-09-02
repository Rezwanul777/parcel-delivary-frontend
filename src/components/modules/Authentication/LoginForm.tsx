import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router"

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import {  z } from "zod"
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "@/redux/features/auth/auth.api"
import { useForm } from "react-hook-form"
import loginFormImg from "@/assets/images/login-form.jpeg"
import Password from "@/components/ui/Password"

const loginSchema = z
  .object({
    email: z.email(),
    password: z
      .string({ message: "Password is required" })
  })
 


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

    const [login] = useLoginMutation()
    const navigate = useNavigate()
  
    const form = useForm<z.infer<typeof loginSchema>>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
        email: "",
        password: "",
      },
      mode: "onSubmit"
    });
  
    const onSubmit = async (data: z.infer<typeof loginSchema>) => {
      const userInfo = {
        email: data.email,
        password: data.password
      }
  
      try{
        await login(userInfo).unwrap();
        toast.success("Logged Successfully!")
        navigate("/")
      } catch(error){
        console.log(error);
        toast.error("Login Failed! Email or Password is Incorrect!")
      }
    };
  
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-muted-foreground text-balance">
                    Login to your UrBoxMate account
                  </p>
                </div>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your Email....." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Password {...field}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                <Button type="submit" className="w-full">
                  Login
                </Button>
                
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link to="/register" className="underline underline-offset-4">
                    Sign up
                  </Link>
                </div>
              </div>
            </form>       
          </Form>
          <div className="bg-muted relative hidden md:block">
            <img
              src={loginFormImg}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}