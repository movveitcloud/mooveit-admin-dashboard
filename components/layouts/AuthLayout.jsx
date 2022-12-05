import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { authenticatedUser } from "../../redux/features/auth.slice";
import { Meta } from "../index";

const AuthLayout = ({ children, title }) => {
  const user = authenticatedUser();
  const router = useRouter();
  const pathname = router.pathname;

  useEffect(() => {
    if (user) {
      router.replace("/accounts");
    }
  }, []);

  return (
    <>
      <Meta title={title} />
      <div className="flex flex-col h-screen bg-[#F9F9F9]">
        <div className="shadow">
          <nav className="max-w-[85%] w-full mx-auto py-6 flex items-center justify-between">
            <Link href="/">
              <a>
                <img src="/logo.png" alt="logo" className="max-h-8" />
              </a>
            </Link>

            {pathname === "/forgot-password" && (
              <div className="flex items-center text-black gap-3">
                <span className="hidden md:flex">Remembered your password?</span>
                <Link href="/">
                  <a className="underline underline-offset-2 hover:text-primary">Login Here</a>
                </Link>
              </div>
            )}
          </nav>
        </div>

        <div className="flex flex-grow">
          <div className="hidden md:w-[60%] md:flex bg-[url('/auth-image.png')] bg-cover bg-no-repeat bg-red-300" />
          <div className="w-full md:w-[40%] flex flex-col  justify-center px-8 md:px-16">{children}</div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
