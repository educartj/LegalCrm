import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Users, Calendar, Paperclip } from "lucide-react";

interface CaseDetailProps {
  isOpen?: boolean;
  onClose?: () => void;
  caseData?: {
    id: string;
    title: string;
    status: string;
    description: string;
    client: string;
    dueDate: string;
    documents: Array<{ name: string; url: string }>;
  };
}

const defaultCaseData = {
  id: "CASE-001",
  title: "Smith vs. Johnson Property Dispute",
  status: "Active",
  description: "Property boundary dispute case in downtown area",
  client: "John Smith",
  dueDate: "2024-12-31",
  documents: [
    { name: "Property Deed.pdf", url: "#" },
    { name: "Survey Report.pdf", url: "#" },
  ],
};

const CaseDetail = ({
  isOpen = true,
  onClose = () => {},
  caseData = defaultCaseData,
}: CaseDetailProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Case Details</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="details" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Details
            </TabsTrigger>
            <TabsTrigger value="client" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Client
            </TabsTrigger>
            <TabsTrigger value="timeline" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Timeline
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <Paperclip className="w-4 h-4" />
              Documents
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[60vh] pr-4">
            <TabsContent value="details">
              <Card>
                <CardContent className="space-y-4 pt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Case Title</Label>
                      <Input id="title" defaultValue={caseData.title} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Input id="status" defaultValue={caseData.status} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      defaultValue={caseData.description}
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="client">
              <Card>
                <CardHeader>
                  <CardTitle>Client Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="clientName">Client Name</Label>
                      <Input id="clientName" defaultValue={caseData.client} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dueDate">Due Date</Label>
                      <Input
                        id="dueDate"
                        type="date"
                        defaultValue={caseData.dueDate}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="timeline">
              <Card>
                <CardHeader>
                  <CardTitle>Case Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Placeholder timeline items */}
                    {[
                      { date: "2024-01-15", event: "Case Opened" },
                      { date: "2024-01-20", event: "Initial Consultation" },
                      { date: "2024-02-01", event: "Document Review" },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-3 border rounded-lg"
                      >
                        <div className="text-sm text-gray-500">{item.date}</div>
                        <div>{item.event}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle>Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-end">
                      <Button variant="outline">Upload Document</Button>
                    </div>
                    <div className="space-y-2">
                      {caseData.documents.map((doc, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            <span>{doc.name}</span>
                          </div>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CaseDetail;
