"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { motion, useAnimation } from "framer-motion";
import { Button } from "../../components/ui/button";
import { AlertCircle } from "lucide-react";

const MotionCard = motion(Card);

interface ComparisonViewProps {
  player1Id: string;
  player2Id: string;
  season1: string;
  season2: string;
}

interface Player {
  info: {
    _id: string;
    name: string;
    position: string;
    age: number;
    [key: string]: any;
  };
  stats: {
    [key: string]: any;
  };
}

export default function ComparisonView({
  player1Id,
  player2Id,
  season1,
  season2,
}: ComparisonViewProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [player1, setPlayer1] = useState<Player | null>(null);
  const [player2, setPlayer2] = useState<Player | null>(null);
  const [similarPlayers, setSimilarPlayers] = useState<any[]>([]);
  const [radarData, setRadarData] = useState<any[]>([]);
  const [chartKey, setChartKey] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const fetchComparisonData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/players/compare?player1=${player1Id}&player2=${player2Id}&season=${season1}`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch comparison data");
        }

        const data = await response.json();
        setPlayer1(data.player1);
        setPlayer2(data.player2);
        setSimilarPlayers(data.similarPlayers || []);

        // Create radar chart data from the player stats
        const radarChartData = prepareRadarData(data.player1, data.player2);
        setRadarData(radarChartData);
      } catch (error) {
        console.error("Error fetching comparison data:", error);
        setError(
          error instanceof Error
            ? error.message
            : "An error occurred while fetching data"
        );
      } finally {
        setLoading(false);
      }
    };

    if (player1Id && player2Id) {
      fetchComparisonData();
    }
  }, [player1Id, player2Id, season1]);

  useEffect(() => {
    controls.start("visible");
    setChartKey((prev) => prev + 1); // Force radar chart re-render
  }, [controls]);

  // Function to prepare radar chart data
  const prepareRadarData = (player1: Player | null, player2: Player | null) => {
    if (!player1?.stats || !player2?.stats) return [];

    // Extract common stat categories that exist in both player stats
    const commonStats = Object.keys(player1.stats).filter(
      (key) =>
        typeof player1.stats[key] === "number" &&
        typeof player2.stats[key] === "number" &&
        !["player_id", "_id", "season"].includes(key)
    );

    // Normalize values between 0-100 for better visualization
    return commonStats.map((stat) => {
      const p1Value = Number(player1.stats[stat]) || 0;
      const p2Value = Number(player2.stats[stat]) || 0;

      // Get the max value for normalization
      const maxVal = Math.max(p1Value, p2Value);

      // Normalize values (if maxVal is 0, both values will be 0)
      const player1Normalized = maxVal
        ? Math.round((p1Value / maxVal) * 100)
        : 0;
      const player2Normalized = maxVal
        ? Math.round((p2Value / maxVal) * 100)
        : 0;

      return {
        stat: formatStatName(stat),
        [player1.info.name]: player1Normalized,
        [player2.info.name]: player2Normalized,
        rawPlayer1: p1Value,
        rawPlayer2: p2Value,
      };
    });
  };

  // Format stat name for display (e.g., "goals_scored" -> "Goals Scored")
  const formatStatName = (stat: string) => {
    return stat
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  if (loading) {
    return (
      <div className="container py-6 px-4 flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="container py-6 px-4">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <AlertCircle className="h-10 w-10 text-red-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">Error Loading Comparison</h3>
          <p className="text-muted-foreground text-center">{error}</p>
          <Button className="mt-4" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      className="container py-6 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="space-y-8">
        {/* Header */}
        <motion.div variants={itemVariants}>
          <h1 className="text-2xl sm:text-3xl font-bold">Player Comparison</h1>
          <p className="text-muted-foreground">
            {player1?.info.name || "Player 1"} vs{" "}
            {player2?.info.name || "Player 2"}
          </p>
        </motion.div>

        {/* Main comparison section */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Stats Table */}
          <MotionCard variants={itemVariants}>
            <CardHeader>
              <CardTitle>Player Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name (Position)</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>Stats</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {player1 && (
                      <TableRow>
                        <TableCell>
                          {player1.info.name} ({player1.info.position})
                        </TableCell>
                        <TableCell>{player1.info.age}</TableCell>
                        <TableCell>
                          {player1.stats &&
                            Object.entries(player1.stats)
                              .filter(
                                ([key]) =>
                                  !["player_id", "_id", "season"].includes(key)
                              )
                              .map(([key, value]) => (
                                <div key={key} className="text-sm">
                                  <span className="font-medium">
                                    {formatStatName(key)}:
                                  </span>{" "}
                                  {value}
                                </div>
                              ))}
                        </TableCell>
                      </TableRow>
                    )}
                    {player2 && (
                      <TableRow>
                        <TableCell>
                          {player2.info.name} ({player2.info.position})
                        </TableCell>
                        <TableCell>{player2.info.age}</TableCell>
                        <TableCell>
                          {player2.stats &&
                            Object.entries(player2.stats)
                              .filter(
                                ([key]) =>
                                  !["player_id", "_id", "season"].includes(key)
                              )
                              .map(([key, value]) => (
                                <div key={key} className="text-sm">
                                  <span className="font-medium">
                                    {formatStatName(key)}:
                                  </span>{" "}
                                  {value}
                                </div>
                              ))}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </MotionCard>

          {/* Radar Chart */}
          <MotionCard variants={itemVariants}>
            <CardHeader>
              <CardTitle>Attribute Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] sm:h-[400px]">
                {radarData.length > 0 ? (
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                    key={chartKey}
                  >
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="stat" />
                      <PolarRadiusAxis />
                      <Radar
                        name={player1?.info.name || "Player 1"}
                        dataKey={player1?.info.name || "Player 1"}
                        stroke="#2563eb"
                        fill="#2563eb"
                        fillOpacity={0.2}
                        animationBegin={300}
                        animationDuration={1000}
                      />
                      <Radar
                        name={player2?.info.name || "Player 2"}
                        dataKey={player2?.info.name || "Player 2"}
                        stroke="#7c3aed"
                        fill="#7c3aed"
                        fillOpacity={0.2}
                        animationBegin={600}
                        animationDuration={1000}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    No comparable stats available
                  </div>
                )}
              </div>
            </CardContent>
          </MotionCard>
        </div>

        {/* Similar Players Section */}
        <MotionCard variants={itemVariants}>
          <CardHeader>
            <CardTitle>
              Similar players to {player1?.info.name || "Player 1"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
              variants={containerVariants}
              initial="hidden"
              animate={controls}
            >
              {similarPlayers.length > 0 ? (
                similarPlayers.map((player) => (
                  <MotionCard key={player._id} variants={itemVariants}>
                    <CardHeader>
                      <CardTitle className="text-lg">{player.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {player.position}
                      </p>
                      {player.age && (
                        <p className="text-sm text-muted-foreground">
                          Age: {player.age}
                        </p>
                      )}
                    </CardContent>
                  </MotionCard>
                ))
              ) : (
                <div className="col-span-full text-center text-muted-foreground py-8">
                  No similar players found
                </div>
              )}
            </motion.div>
          </CardContent>
        </MotionCard>
      </div>
    </motion.div>
  );
}
