"use client";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Page() {

const {user} = useAuth();
const router = useRouter();

useEffect(() => {
if(user) {
router.push("/dashboard")
}
}, [user])

  return (
    <main className="w-full flex justify-center items-center bg-gray-300 md:p-24 p-10 min-h-screen">
      <section className="flex flex-col gap-3">
        <div className="flex justify-center">
          <img className="h-12" src="/logo.png" alt="Logo" />
        </div>
        <div className="flex flex-col gap-3 bg-white md:p-10 p-5 rounded-xl md:min-w-[440px] w-full">
          <h1 className="font-bold text-xl">Login With Email</h1>
          <form className="flex flex-col gap-3">
            <input
              placeholder="Email"
              type="email"
              name="user-email"
              id="user-email"
              className="px-3 py-2 rounded-xl border focus:outline-none w-full"
            />
            <input
              placeholder="Enter Your Password"
              type="password"
              name="user-password"
              id="user-password"
              className="px-3 py-2 rounded-xl border focus:outline-none w-full"
            />
            <Button color="primary">Login</Button>
          </form>
          <div className="flex justify-between">
            <Link href={"/sign-up"}>
              <button className="font-semibold text-blue-500 text-sm">
                Sign Up!
              </button>
            </Link>
            <Link href={"/forget-password"}>
              <button className="font-semibold text-blue-500 text-sm">
                Forget Password!
              </button>
            </Link>
          </div>
          <hr />
          <SignInWithGoogleComponent />
        </div>
      </section>
    </main>
  );
}

function SignInWithGoogleComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const user = await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (error) {
      toast.error(error?.message);
    }
    setIsLoading(false);
  };
  return (
    <Button isLoading={isLoading} isDisabled={isLoading} onClick={handleLogin}>
      Sign With Google
    </Button>
  );
}
