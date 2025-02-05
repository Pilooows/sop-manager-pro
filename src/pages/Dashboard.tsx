
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

const UserDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const documents = [
    {
      id: "1",
      category: "HR",
      division: "Human Resources",
      name: "Employee Onboarding",
      effectiveFrom: "2024-01-01",
      effectiveTo: "2024-12-31",
    },
    // Add more sample documents as needed
  ];

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

export default UserDashboard;
