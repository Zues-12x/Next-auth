
import LoginButton from "@/components/auth/LoginButton";
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <>
      <main className="flex h-full flex-col  items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-500 to-gray-800">
        <div className="space-y-6 text-center">
          <h1 className="text-6xl text-white font-semibold drop-shadow-md">
            Auth
          </h1>
          <p className="text-white text-lg ">A simple auth tool</p>
          <div>
            <LoginButton>
              <Button variant="secondary" size="lg">
                Sign In
              </Button>
            </LoginButton>
          </div>
        </div>
      </main>
    </>
  );
}
