import Link from "next/link";
import { Button } from "./ui/button";
import {RulerSquareIcon} from '@radix-ui/react-icons'

export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center text-lime-600">
      <div className="flex gap-8 justify-center items-center">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
        >
          PostgreSQL
        </a>
        <span className="border-l rotate-45 h-6  " />
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
        >
          React
        </a>
      </div>      
      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center text-slate-700 ">        
        <span className="text-3xl block">Welcome to my Portfolio App.</span>
       
        <Button>
          <RulerSquareIcon className="mr-2 h-4 w-4"/> <Link href="/portfolio">Resume v0.1</Link>
        </Button>  
      </p>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
