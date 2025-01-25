"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, TrendingUp, Users, GitCompare } from "lucide-react";
import { motion, useAnimation } from "framer-motion";

const MotionCard = motion(Card);

export default function AboutPage() {
  const searchParams = useSearchParams();
  const compareRef = useRef<HTMLDivElement>(null);
  const predictRef = useRef<HTMLDivElement>(null);
  const compareControls = useAnimation();
  const predictControls = useAnimation();

  useEffect(() => {
    const section = searchParams.get("section");

    if (section === "compare" && compareRef.current) {
      compareRef.current.scrollIntoView({ behavior: "smooth" });
      compareControls.start("highlight");
    } else if (section === "predict" && predictRef.current) {
      predictRef.current.scrollIntoView({ behavior: "smooth" });
      predictControls.start("highlight");
    }
  }, [searchParams, compareControls, predictControls]);

  const cardVariants = {
    default: { scale: 1 },
    highlight: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 0.6,
        times: [0, 0.5, 1],
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="container py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="flex flex-col items-center gap-8 text-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">About StatValue AI</h1>
          <p className="text-muted-foreground mt-2">
            Learn about our mission and technology
          </p>
        </div>
        <div className="grid gap-6 w-full sm:grid-cols-2 lg:grid-cols-3">
          <MotionCard>
            <CardHeader>
              <Brain className="h-12 w-12 mx-auto" />
              <CardTitle>AI-Powered Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our AI models process vast amounts of player data to provide
                accurate comparisons and predictions.
              </p>
            </CardContent>
          </MotionCard>
          <MotionCard>
            <CardHeader>
              <TrendingUp className="h-12 w-12 mx-auto" />
              <CardTitle>Market Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Stay ahead with our predictive analytics that forecast player
                market values based on performance metrics.
              </p>
            </CardContent>
          </MotionCard>
          <MotionCard>
            <CardHeader>
              <Users className="h-12 w-12 mx-auto" />
              <CardTitle>Player Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Compare players across multiple metrics and discover similar
                talents using our advanced algorithms.
              </p>
            </CardContent>
          </MotionCard>
        </div>
        <MotionCard>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              StatValue AI aims to revolutionize football analytics by providing
              accurate, data-driven insights for player valuation and
              comparison. Our platform combines advanced AI technology with
              comprehensive football statistics to help clubs, scouts, and fans
              make informed decisions.
            </p>
          </CardContent>
        </MotionCard>
        <MotionCard
          variants={cardVariants}
          initial="default"
          animate={compareControls}
          ref={compareRef}
          className="w-full"
        >
          <CardHeader>
            <GitCompare className="h-12 w-12 mx-auto" />
            <CardTitle>Compare Players</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Our player comparison tool allows you to analyze and compare any
              two players based on a wide range of performance metrics. This
              feature is invaluable for scouts, managers, and fans looking to
              understand player capabilities and potential.
            </p>
          </CardContent>
        </MotionCard>
        <MotionCard
          variants={cardVariants}
          initial="default"
          animate={predictControls}
          ref={predictRef}
          className="w-full"
        >
          <CardHeader>
            <TrendingUp className="h-12 w-12 mx-auto" />
            <CardTitle>Market Value Predictions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Our market value prediction feature utilizes cutting-edge machine
              learning algorithms to forecast player market values. By analyzing
              historical data, current performance, and market trends, we
              provide accurate estimations of a player's worth. This tool is
              essential for clubs and agents in transfer negotiations, contract
              renewals, and overall squad valuation.
            </p>
          </CardContent>
        </MotionCard>
      </div>
    </div>
  );
}
