import Hero from "@/components/hero";
import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Image from "next/image";
import projimage from "../public/volunteer-scheduler-v1.jpg";

export default async function Index() {
  return (
    <>
      <Hero />
      <main className="flex-1 flex flex-col gap-6 px-4">
        <div className="border-spacing-1 mx-auto text-center ">
        <h2 className="font-medium text-xl mb-4">React Scheduler-v1 project</h2>
        {/* {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />} */}
        <div className="flex flex-col gap-6">
          <Image 
            src={projimage}
            alt="Scheduler App"
            priority={true}
            className="rounded-lg shadow-lg mx-auto"
            sizes="100vw"            
            style={{
              width: '60%',
              height: 'auto',
            }}
          />
          </div>

        </div>
          <p className="text-center text-sm text-foreground/80">
            Scheduler App
          </p>
      </main>
    </>
  );
}
