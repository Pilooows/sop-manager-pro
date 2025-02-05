
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
    // TODO: Implement actual file upload
    const newDoc: Document = {
      id: Math.random().toString(),
      ...uploadForm,
      fileUrl: "#",
    };
    setDocuments([...documents, newDoc]);
    toast({
      title: "Document Uploaded",
      description: "The document has been successfully uploaded.",
    });
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
                    <Button variant="link">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
