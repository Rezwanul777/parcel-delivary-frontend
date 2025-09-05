import Logo from "@/assets/icons/Logo";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { role } from "@/constants/role";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { Link } from "react-router";

const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/contact", label: "Contact", role: "PUBLIC" },
  { href: "/track-parcel", label: "Track-Parcel", role: "PUBLIC" },
  { href: "/admin", label: "Dashboard", role: role.admin },
  { href: "/sender", label: "Dashboard", role: role.sender },
  { href: "/receiver", label: "Dashboard", role: role.receiver },
];

export default function Navbar() {
  const { data, isLoading } = useUserInfoQuery(undefined);
  // console.log("user id" , data?.data?._id);
  const email = data?.data?.email;
  

  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  // console.log(email);

  // const handleLogout = async () => {
  //   await logout(undefined);
  //   dispatch(authApi.util.resetApiState());
  // };

  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap(); // wait for API call
      dispatch(authApi.util.resetApiState()); // clear RTKQ cache
      // optional: redirect to home/login
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };


  // handle block user 
  
  
  


  return (
    <header className="border-b px-4 md:px-6">
      <div className="flex justify-between items-center gap-4">
        {/* Left side */}
        <div className="flex items-center gap-6 py-2">
          <Link to="/" className="text-primary hover:text-primary/90">
            <Logo />
          </Link>

          <NavigationMenu className="h-full *:h-full max-md:hidden">
            <NavigationMenuList className="gap-2">
              {navigationLinks.map((link, index) => (
                <>
                  {link.role == "PUBLIC" && (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuLink
                        className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                        asChild
                      >
                        <Link to={link.href}> {link.label} </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  )}
                  {link.role == data?.data?.role && (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuLink
                        className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                        asChild
                      >
                        <Link to={link.href}> {link.label} </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  )}
                </>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <small> {email} </small>

          {isLoading ? (
            <> Loading... </>
          ) : (
            <>
              {email ? (
                <Button
                  variant="destructive"
                  size="sm"
                  className="text-sm cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              ) : (
                <Link to="/login">
                  <Button variant="default">Log In</Button>
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}