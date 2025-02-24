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
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Separator } from "../../components/ui/separator";

export default function ComparePage() {
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);

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
                <Input id="player1" placeholder="Search for a player..." />
              </div>
              <div className="space-y-2">
                <Label>Season</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select season" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2023">2023/24</SelectItem>
                    <SelectItem value="2022">2022/23</SelectItem>
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
                <Input id="player2" placeholder="Search for a player..." />
              </div>
              <div className="space-y-2">
                <Label>Season</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select season" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2023">2023/24</SelectItem>
                    <SelectItem value="2022">2022/23</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
        <Button className="w-full sm:w-auto">Compare Players</Button>
        <Separator />
        <div className="w-full">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">
            Similar Players
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle>Similar Player {i}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Player details and statistics will be displayed here.</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
//page after clicking "compare"
//add "plus" button after player2 card
//able to add only if loggedin
