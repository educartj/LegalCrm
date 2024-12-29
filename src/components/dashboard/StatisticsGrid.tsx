import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Clock, FileText, AlertCircle } from "lucide-react";

interface StatisticCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  trend?: string;
  trendDirection?: "up" | "down";
  bgColor?: string;
}

interface StatisticsGridProps {
  statistics?: StatisticCardProps[];
}

const defaultStatistics: StatisticCardProps[] = [
  {
    icon: <Briefcase className="w-6 h-6" />,
    title: "Total Cases",
    value: "156",
    trend: "+12%",
    trendDirection: "up",
    bgColor: "bg-blue-50",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Active Cases",
    value: "64",
    trend: "+5%",
    trendDirection: "up",
    bgColor: "bg-green-50",
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Pending Documents",
    value: "28",
    trend: "-3%",
    trendDirection: "down",
    bgColor: "bg-yellow-50",
  },
  {
    icon: <AlertCircle className="w-6 h-6" />,
    title: "Upcoming Deadlines",
    value: "12",
    trend: "+2%",
    trendDirection: "up",
    bgColor: "bg-red-50",
  },
];

const StatisticCard = ({
  icon,
  title,
  value,
  trend,
  trendDirection,
  bgColor = "bg-white",
}: StatisticCardProps) => {
  return (
    <Card className={`${bgColor} border-none shadow-sm`}>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {trend && (
              <p
                className={`text-sm ${
                  trendDirection === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {trend} from last month
              </p>
            )}
          </div>
          <div className="p-3 rounded-full bg-white shadow-sm">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
};

const StatisticsGrid = ({
  statistics = defaultStatistics,
}: StatisticsGridProps) => {
  return (
    <div className="w-full bg-white p-6 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statistics.map((stat, index) => (
          <StatisticCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
};

export default StatisticsGrid;
