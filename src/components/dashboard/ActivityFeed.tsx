import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Clock, FileText, UserCircle } from "lucide-react";

interface Activity {
  id: string;
  type: "case_update" | "document_added" | "client_interaction";
  title: string;
  description: string;
  timestamp: string;
  user: string;
}

interface ActivityFeedProps {
  activities?: Activity[];
}

const defaultActivities: Activity[] = [
  {
    id: "1",
    type: "case_update",
    title: "Case Status Updated",
    description: "Smith vs. Johnson case status changed to 'In Progress'",
    timestamp: "2 hours ago",
    user: "Jane Smith",
  },
  {
    id: "2",
    type: "document_added",
    title: "New Document Added",
    description: "Property deed uploaded to Brown case",
    timestamp: "4 hours ago",
    user: "Mike Johnson",
  },
  {
    id: "3",
    type: "client_interaction",
    title: "Client Meeting Scheduled",
    description: "Consultation with Robert Davis set for tomorrow",
    timestamp: "6 hours ago",
    user: "Sarah Wilson",
  },
];

const ActivityFeed = ({
  activities = defaultActivities,
}: ActivityFeedProps) => {
  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "case_update":
        return <FileText className="w-4 h-4 text-blue-500" />;
      case "document_added":
        return <FileText className="w-4 h-4 text-green-500" />;
      case "client_interaction":
        return <UserCircle className="w-4 h-4 text-purple-500" />;
    }
  };

  const getActivityBadge = (type: Activity["type"]) => {
    switch (type) {
      case "case_update":
        return <Badge className="bg-blue-100 text-blue-800">Update</Badge>;
      case "document_added":
        return <Badge className="bg-green-100 text-green-800">Document</Badge>;
      case "client_interaction":
        return <Badge className="bg-purple-100 text-purple-800">Client</Badge>;
    }
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{activity.title}</h4>
                      {getActivityBadge(activity.type)}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {activity.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{activity.timestamp}</span>
                      <span>•</span>
                      <span>{activity.user}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
