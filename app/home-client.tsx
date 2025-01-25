import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, GitCompare, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div
      className="relative flex-1 bg-black min-h-screen"
      style={{
        backgroundImage: `url('logo.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 ">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center mx-auto px-4">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black text-center drop-shadow-lg">
            AI-Powered Football Analytics Platform
          </h1>
          <p className="max-w-[42rem] leading-normal sm:text-xl sm:leading-8 text-center text-gray-200 drop-shadow-md">
            Compare players, predict market values, and discover similar talents
            using advanced AI and machine learning
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <Button
              size="lg"
              variant="outline"
              className="bg-black text-white border border-white hover:bg-transparent hover:text-black transition duration-300"
            >
              <Link href="/predict">
                <span>Start Comparing</span>
                <TrendingUp className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="bg-black text-white border border-white hover:bg-transparent hover:text-black transition duration-300"
            >
              <Link href="/predict">
                <span>Predict Values</span>
                <TrendingUp className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-10 px-4 container mx-auto">
        <div className="bg-black/30 backdrop-blur-md text-white rounded-lg p-6">
          <h2 className="text-2xl font-bold">Compare Players</h2>
          <p className="mt-2 text-gray-300">
            Compare detailed statistics between any two players.
          </p>
          <a
            href="/compare"
            className="text-blue-400 mt-4 inline-block hover:text-blue-300"
          >
            Learn more →
          </a>
        </div>
        <div className="bg-black/30 backdrop-blur-md text-white rounded-lg p-6">
          <h2 className="text-2xl font-bold">Market Value Predictions</h2>
          <p className="mt-2 text-gray-300">
            Get AI-powered predictions for player market values.
          </p>
          <a
            href="/predict"
            className="text-blue-400 mt-4 inline-block hover:text-blue-300"
          >
            Learn more →
          </a>
        </div>
      </section>
    </div>
  );
}
//bg "Compare players, predict market values, and discover similar talents using advanced AI and machine learning" blue
//click "laern more->" = send to about us and highlifght respective cards.
