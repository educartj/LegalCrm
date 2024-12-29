import React, { useState } from "react";
import CaseTable from "./CaseTable";
import CaseDetail from "./CaseDetail";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Case {
  id: string;
  caseNumber: string;
  clientName: string;
  status: "Active" | "Pending" | "Closed";
  lastUpdated: string;
  priority: "High" | "Medium" | "Low";
}

interface CaseManagementProps {
  cases?: Case[];
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

const CaseManagement = ({ cases = defaultCases }: CaseManagementProps) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [caseToDelete, setCaseToDelete] = useState<string | null>(null);

  const handleViewCase = (caseId: string) => {
    setSelectedCaseId(caseId);
    setIsDetailOpen(true);
  };

  const handleEditCase = (caseId: string) => {
    setSelectedCaseId(caseId);
    setIsDetailOpen(true);
  };

  const handleDeleteCase = (caseId: string) => {
    setCaseToDelete(caseId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    // Handle delete logic here
    setIsDeleteDialogOpen(false);
    setCaseToDelete(null);
  };

  return (
    <div className="w-full h-full bg-gray-50 p-6 rounded-lg">
      <CaseTable
        cases={cases}
        onViewCase={handleViewCase}
        onEditCase={handleEditCase}
        onDeleteCase={handleDeleteCase}
      />

      {selectedCaseId && (
        <CaseDetail
          isOpen={isDetailOpen}
          onClose={() => {
            setIsDetailOpen(false);
            setSelectedCaseId(null);
          }}
          caseData={{
            id: selectedCaseId,
            title: `Case ${selectedCaseId}`,
            status: "Active",
            description: "Case description",
            client: "John Doe",
            dueDate: "2024-12-31",
            documents: [],
          }}
        />
      )}

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this case? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CaseManagement;
