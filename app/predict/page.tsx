"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { year: 2021, value: 50 },
  { year: 2022, value: 65 },
  { year: 2023, value: 80 },
  { year: 2024, value: 95 },
  { year: 2025, value: 110 },
];

export default function PredictPage() {
  return (
    <div className="container py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="flex flex-col items-center gap-8 text-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Predict Market Value
          </h1>
          <p className="text-muted-foreground mt-2">
            Get AI-powered predictions for player market values based on
            performance data
          </p>
        </div>
        <div className="grid gap-6 w-full md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Player Details</CardTitle>
              <CardDescription>
                Enter player information for prediction
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="player-name">Player Name</Label>
                <Input id="player-name" placeholder="Search for a player..." />
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="forward">2026</SelectItem>
                    <SelectItem value="midfielder">2027</SelectItem>
                    <SelectItem value="defender">2028</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">Generate Prediction</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Value Prediction</CardTitle>
              <CardDescription>
                Predicted market value over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis
                      label={{
                        value: "Value (M€)",
                        angle: -90,
                        position: "insideLeft",
                      }}
                    />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#8884d8"
                      name="Market Value"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
// able to choose year 2027 or after if logggedin
