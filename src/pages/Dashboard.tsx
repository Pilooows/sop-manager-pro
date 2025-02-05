
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Document {
  id: string;
  category: string;
  division: string;
  name: string;
  description: string;
  effectiveFrom: string;
  effectiveTo: string;
  fileUrl: string;
}

const UserDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const documents = [
    {
      id: "1",
      category: "HR",
      division: "Human Resources",
      name: "Employee Onboarding",
      description: "Standard operating procedure for new employee onboarding",
      effectiveFrom: "2024-01-01",
      effectiveTo: "2024-12-31",
      fileUrl: "#",
    },
    // Add more sample documents as needed
  ];

  const handleView = (doc: Document) => {
    setSelectedDoc(doc);
    setIsViewModalOpen(true);
  };

  return (
    <div className="container mx-auto p-6 space-y-8 animate-fade-in">
      <Card className="glass-morphism">
        <CardHeader>
          <CardTitle>Document Library</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Input
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Division</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Effective Period</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>{doc.category}</TableCell>
                  <TableCell>{doc.division}</TableCell>
                  <TableCell>{doc.name}</TableCell>
                  <TableCell>
                    {doc.effectiveFrom} - {doc.effectiveTo}
                  </TableCell>
                  <TableCell>
                    <Button variant="link" onClick={() => handleView(doc)}>View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedDoc?.name}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div>
              <h4 className="font-semibold">Category</h4>
              <p>{selectedDoc?.category}</p>
            </div>
            <div>
              <h4 className="font-semibold">Division</h4>
              <p>{selectedDoc?.division}</p>
            </div>
            <div>
              <h4 className="font-semibold">Description</h4>
              <p>{selectedDoc?.description}</p>
            </div>
            <div>
              <h4 className="font-semibold">Effective Period</h4>
              <p>{selectedDoc?.effectiveFrom} - {selectedDoc?.effectiveTo}</p>
            </div>
            <div>
              <h4 className="font-semibold">Document Preview</h4>
              <iframe 
                src={selectedDoc?.fileUrl} 
                className="w-full h-[500px] border rounded"
                title="PDF Preview"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserDashboard;
