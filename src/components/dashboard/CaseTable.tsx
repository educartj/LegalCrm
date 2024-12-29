import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Search, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Case {
  id: string;
  caseNumber: string;
  clientName: string;
  status: "Active" | "Pending" | "Closed";
  lastUpdated: string;
  priority: "High" | "Medium" | "Low";
}

interface CaseTableProps {
  cases?: Case[];
  onViewCase?: (caseId: string) => void;
  onEditCase?: (caseId: string) => void;
  onDeleteCase?: (caseId: string) => void;
}

const defaultCases: Case[] = [
  {
    id: "1",
    caseNumber: "CASE-2024-001",
    clientName: "John Smith",
    status: "Active",
    lastUpdated: "2024-01-15",
    priority: "High",
  },
  {
    id: "2",
    caseNumber: "CASE-2024-002",
    clientName: "Jane Doe",
    status: "Pending",
    lastUpdated: "2024-01-14",
    priority: "Medium",
  },
  {
    id: "3",
    caseNumber: "CASE-2024-003",
    clientName: "Robert Johnson",
    status: "Closed",
    lastUpdated: "2024-01-13",
    priority: "Low",
  },
];

const CaseTable = ({
  cases = defaultCases,
  onViewCase = () => {},
  onEditCase = () => {},
  onDeleteCase = () => {},
}: CaseTableProps) => {
  const getStatusColor = (status: Case["status"]) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Closed":
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: Case["priority"]) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-blue-100 text-blue-800";
      case "Low":
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2 items-center">
          <Input
            placeholder="Search cases..."
            className="w-64"
            icon={<Search className="w-4 h-4" />}
          />
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
        <Button>Add New Case</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Case Number</TableHead>
              <TableHead>Client Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cases.map((caseItem) => (
              <TableRow key={caseItem.id}>
                <TableCell>{caseItem.caseNumber}</TableCell>
                <TableCell>{caseItem.clientName}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(caseItem.status)}>
                    {caseItem.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getPriorityColor(caseItem.priority)}>
                    {caseItem.priority}
                  </Badge>
                </TableCell>
                <TableCell>{caseItem.lastUpdated}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => onViewCase(caseItem.id)}>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEditCase(caseItem.id)}>
                        Edit Case
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => onDeleteCase(caseItem.id)}
                      >
                        Delete Case
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CaseTable;
