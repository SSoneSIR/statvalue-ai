"use client";

import { useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import ComparisonView from "../compare/comparison";
import PlayerSearch from "../../components/player-search";
import Link from "next/link";

type Player = {
  _id: string;
  name: string;
  position: string;
};

export default function ComparePage() {
  const [selectedPlayer1, setSelectedPlayer1] = useState<Player | null>(null);
  const [selectedPlayer2, setSelectedPlayer2] = useState<Player | null>(null);
  const [season1, setSeason1] = useState("2023/24");
  const [season2, setSeason2] = useState("2023/24");
  const [isComparing, setIsComparing] = useState(false);
  const [error, setError] = useState("");

  const handleCompare = () => {
    if (!selectedPlayer1 || !selectedPlayer2) {
      setError("Please select two players to compare");
      return;
    }

    setError("");
    setIsComparing(true);
  };

  return (
    <div className="container py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="flex flex-col items-center gap-8 text-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Compare Players</h1>
          <p className="text-muted-foreground mt-2">
            Compare statistics and find similar players based on performance
            data
          </p>
        </div>

        {!isComparing ? (
          <>
            <div className="grid gap-4 w-full sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Player 1</CardTitle>
                  <CardDescription>
                    Select the first player to compare
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="player1">Player Name</Label>
                    <PlayerSearch
                      onSelect={(player) => setSelectedPlayer1(player)}
                      selectedPlayer={selectedPlayer1}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Season</Label>
                    <Select value={season1} onValueChange={setSeason1}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select season" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2023/24">2023/24</SelectItem>
                        <SelectItem value="2022/23">2022/23</SelectItem>
                        <SelectItem value="2021/22">2021/22</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Player 2</CardTitle>
                  <CardDescription>
                    Select the second player to compare
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="player2">Player Name</Label>
                    <PlayerSearch
                      onSelect={(player) => setSelectedPlayer2(player)}
                      selectedPlayer={selectedPlayer2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Season</Label>
                    <Select value={season2} onValueChange={setSeason2}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select season" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2023/24">2023/24</SelectItem>
                        <SelectItem value="2022/23">2022/23</SelectItem>
                        <SelectItem value="2021/22">2021/22</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="w-full">
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <Button
                className="w-full sm:w-auto"
                onClick={handleCompare}
                disabled={!selectedPlayer1 || !selectedPlayer2}
              >
                Compare Players
              </Button>
            </div>

            <div className="w-full pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Import Player Data</CardTitle>
                  <CardDescription>
                    Need to import your player data from CSV files?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/import">
                    <Button variant="outline">Go to Import Page</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </>
        ) : (
          <>
            <ComparisonView
              player1Id={selectedPlayer1?._id ?? ""}
              player2Id={selectedPlayer2?._id ?? ""}
              season1={season1}
              season2={season2}
            />
            <Button
              variant="outline"
              onClick={() => setIsComparing(false)}
              className="mt-6"
            >
              Back to Player Selection
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
//page after clicking "compare"
//add "plus" button after player2 card
//able to add only if loggedin
