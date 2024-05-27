import Output from "@/components/home/Output";
import UserInput from "@/components/home/UserInput";
import AnimatedGradientText from "@/components/magicui/AnimatedGradientText";
import { BioProvider } from "@/context/BioContext";
import { cn } from "@/lib/utils";
import { ChevronRight, Star } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'AI Twitter Bio Generator Built using Next.js',
  description: 'Generate your perfect Twitter bio with the help of AI. Just answer a few questions and let our AI craft a bio that truly represents you.',
}


function Home() {
  return (
    <main className="relative grid flex-1 gap-6 sm:gap-8 md:gap-12 overflow-auto px-4  py-12  sm:py-16 sm:px-8  md:px-10 slg:p-16 lg:p-24 grid-cols-1 slg:grid-cols-2 dark:bg-black">
      <div className="col-span-full flex flex-col items-center justify-center space-y-2 sm:space-y-4 mb-4 text-center">
        <Link href={"https://github.com"} target="_blank" className="mb-4">
          <AnimatedGradientText className="px-6 py-2 rounded-full">
            <Star className="w-6 h-6 fill-yellow-300 text-yellow-400" />{" "}
            <hr className="mx-2 h-4 w-[1px] shrink-0 bg-gray-300" />{" "}
            <span className={cn(`text-primary`)}>Star on github</span>
            <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedGradientText>
        </Link>

        <h1 className="font-extrabold text-4xl md:text-5xl slg:text-6xl lg:text-7xl text-center w-full lg:w-[90%] uppercase">
          Craft the Perfect Twitter Bio in Seconds!
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-accent">
          Just answer a few questions, and we'll generate a bio that captures
          who you are.{" "}
        </p>
      </div>
      <BioProvider>
        <UserInput />
        <Output />
      </BioProvider>
    </main>
  );
}

export default Home;
