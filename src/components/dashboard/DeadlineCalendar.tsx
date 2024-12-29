import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, Calendar as CalendarIcon } from "lucide-react";

interface Deadline {
  id: string;
  title: string;
  date: Date;
  priority: "high" | "medium" | "low";
  caseNumber: string;
}

interface DeadlineCalendarProps {
  deadlines?: Deadline[];
  onDeadlineClick?: (deadline: Deadline) => void;
}

const defaultDeadlines: Deadline[] = [
  {
    id: "1",
    title: "File Motion Response",
    date: new Date(2024, 0, 20),
    priority: "high",
    caseNumber: "CASE-2024-001",
  },
  {
    id: "2",
    title: "Client Meeting",
    date: new Date(2024, 0, 22),
    priority: "medium",
    caseNumber: "CASE-2024-002",
  },
  {
    id: "3",
    title: "Document Review",
    date: new Date(2024, 0, 25),
    priority: "low",
    caseNumber: "CASE-2024-003",
  },
];

const DeadlineCalendar = ({
  deadlines = defaultDeadlines,
  onDeadlineClick = () => {},
}: DeadlineCalendarProps) => {
  const [date, setDate] = React.useState<Date>(new Date());

  const getPriorityColor = (priority: Deadline["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
    }
  };

  const getDayDeadlines = (day: Date) => {
    return deadlines.filter(
      (deadline) => deadline.date.toDateString() === day.toDateString(),
    );
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5" />
          Upcoming Deadlines
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => newDate && setDate(newDate)}
            className="rounded-md border"
            modifiers={{
              hasDeadline: (day) => getDayDeadlines(day).length > 0,
            }}
            modifiersStyles={{
              hasDeadline: {
                fontWeight: "bold",
                color: "var(--primary)",
              },
            }}
          />

          <ScrollArea className="h-[200px] w-full rounded-md border p-4">
            <div className="space-y-4">
              {deadlines
                .sort((a, b) => a.date.getTime() - b.date.getTime())
                .map((deadline) => (
                  <div
                    key={deadline.id}
                    className="flex items-center justify-between p-2 rounded-lg border hover:bg-gray-50 cursor-pointer"
                    onClick={() => onDeadlineClick(deadline)}
                  >
                    <div className="space-y-1">
                      <div className="font-medium">{deadline.title}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {deadline.date.toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-400">
                        {deadline.caseNumber}
                      </div>
                    </div>
                    <Badge className={getPriorityColor(deadline.priority)}>
                      {deadline.priority}
                    </Badge>
                  </div>
                ))}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeadlineCalendar;
