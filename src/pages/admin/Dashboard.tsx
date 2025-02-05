
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
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
  DialogDescription,
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

const AdminDashboard = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const { toast } = useToast();
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    category: "",
    division: "",
    name: "",
    description: "",
    effectiveFrom: "",
    effectiveTo: "",
    file: null as File | null,
  });

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    // Create a URL for the uploaded file
    const fileUrl = uploadForm.file ? URL.createObjectURL(uploadForm.file) : "#";
    
    const newDoc: Document = {
      id: Math.random().toString(),
      ...uploadForm,
      fileUrl,
    };
    setDocuments([...documents, newDoc]);
    toast({
      title: "Document Uploaded",
      description: "The document has been successfully uploaded.",
    });
  };

  const handleView = (doc: Document) => {
    setSelectedDoc(doc);
    setIsViewModalOpen(true);
  };

  return (
    <div className="container mx-auto p-6 space-y-8 animate-fade-in">
      <Card className="glass-morphism">
        <CardHeader>
          <CardTitle>Upload New Document</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Category"
                onChange={(e) =>
                  setUploadForm({ ...uploadForm, category: e.target.value })
                }
              />
              <Input
                placeholder="Division"
                onChange={(e) =>
                  setUploadForm({ ...uploadForm, division: e.target.value })
                }
              />
              <Input
                placeholder="Document Name"
                onChange={(e) =>
                  setUploadForm({ ...uploadForm, name: e.target.value })
                }
              />
              <Input
                placeholder="Description"
                onChange={(e) =>
                  setUploadForm({ ...uploadForm, description: e.target.value })
                }
              />
              <Input
                type="date"
                placeholder="Effective From"
                onChange={(e) =>
                  setUploadForm({ ...uploadForm, effectiveFrom: e.target.value })
                }
              />
              <Input
                type="date"
                placeholder="Effective To"
                onChange={(e) =>
                  setUploadForm({ ...uploadForm, effectiveTo: e.target.value })
                }
              />
            </div>
            <Input
              type="file"
              accept=".pdf"
              onChange={(e) =>
                setUploadForm({
                  ...uploadForm,
                  file: e.target.files ? e.target.files[0] : null,
                })
              }
            />
            <Button type="submit" className="w-full">Upload Document</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="glass-morphism">
        <CardHeader>
          <CardTitle>Document List</CardTitle>
        </CardHeader>
        <CardContent>
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
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>{selectedDoc?.name}</DialogTitle>
            <DialogDescription>Document Details</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 overflow-y-auto">
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
              <p>
                {selectedDoc?.effectiveFrom} - {selectedDoc?.effectiveTo}
              </p>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Document Preview</h4>
              {selectedDoc?.fileUrl && selectedDoc.fileUrl !== "#" ? (
                <object
                  data={selectedDoc.fileUrl}
                  type="application/pdf"
                  className="w-full h-[600px] border rounded"
                >
                  <p>
                    It appears your browser doesn't support embedded PDFs.
                    <a href={selectedDoc.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline ml-1">
                      Click here to view the PDF
                    </a>
                  </p>
                </object>
              ) : (
                <p>No PDF preview available</p>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
