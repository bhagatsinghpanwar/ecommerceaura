import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Trash2, Upload, Box, Eye, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";
import { products } from "@/lib/data";
import ModelPreview from "@/components/admin/ModelPreview";

interface Model3D {
  id: string;
  name: string;
  fileUrl: string;
  productId?: string;
  fileSize: string;
  dateAdded: string;
}

const mockModels: Model3D[] = [
  {
    id: "model-1",
    name: "lamp.glb",
    fileUrl: "/models/lamp.glb",
    productId: "1",
    fileSize: "2.4 MB",
    dateAdded: "2023-06-12"
  },
  {
    id: "model-2",
    name: "chair.glb",
    fileUrl: "/models/chair.glb",
    productId: "2",
    fileSize: "3.8 MB",
    dateAdded: "2023-05-22"
  },
  {
    id: "model-3",
    name: "coffee.glb",
    fileUrl: "/models/coffee.glb",
    productId: "3",
    fileSize: "1.6 MB",
    dateAdded: "2023-07-05"
  }
];

const ModelManagement = () => {
  const [selectedModel, setSelectedModel] = useState<Model3D | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [newModelFile, setNewModelFile] = useState<File | null>(null);
  const [modelName, setModelName] = useState("");
  const [linkedProduct, setLinkedProduct] = useState("");
  
  const fetchModels = async (): Promise<Model3D[]> => {
    return mockModels;
  };
  
  const { data: models = [], isLoading } = useQuery({
    queryKey: ["3d-models"],
    queryFn: fetchModels
  });
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.name.endsWith('.glb') || file.name.endsWith('.gltf')) {
        setNewModelFile(file);
        if (!modelName) {
          setModelName(file.name);
        }
      } else {
        toast.error("Only GLB or GLTF files are supported");
        e.target.value = "";
      }
    }
  };
  
  const handleUpload = () => {
    if (!newModelFile) {
      toast.error("Please select a file to upload");
      return;
    }
    
    if (!modelName) {
      toast.error("Please enter a model name");
      return;
    }
    
    toast.success(`Model ${modelName} uploaded successfully!`);
    setIsUploadOpen(false);
    setNewModelFile(null);
    setModelName("");
    setLinkedProduct("");
  };
  
  const handlePreview = (model: Model3D) => {
    setSelectedModel(model);
    setIsPreviewOpen(true);
  };
  
  const handleDelete = (modelId: string) => {
    toast.success("Model deleted successfully");
  };
  
  const handleLinkToProduct = (modelId: string, productId: string) => {
    toast.success("Model linked to product successfully");
  };
  
  const resetUploadForm = () => {
    setNewModelFile(null);
    setModelName("");
    setLinkedProduct("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">3D Models</h1>
          <p className="text-muted-foreground">
            Manage your 3D models for product visualization
          </p>
        </div>
        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload Model
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Upload 3D Model</DialogTitle>
              <DialogDescription>
                Upload GLB or GLTF files for your products
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <FormItem>
                  <FormLabel>Model File (GLB/GLTF)</FormLabel>
                  <Input type="file" accept=".glb,.gltf" onChange={handleFileChange} />
                  <FormMessage>Max file size: 20MB</FormMessage>
                </FormItem>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="modelName">Model Name</Label>
                <Input 
                  id="modelName" 
                  value={modelName} 
                  onChange={(e) => setModelName(e.target.value)} 
                  placeholder="Enter model name"
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="product">Link to Product (Optional)</Label>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  id="product"
                  value={linkedProduct}
                  onChange={(e) => setLinkedProduct(e.target.value)}
                >
                  <option value="">Select a product</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <DialogFooter className="sm:justify-between">
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsUploadOpen(false);
                  resetUploadForm();
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={handleUpload}
                disabled={!newModelFile}
              >
                Upload
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Model Library</CardTitle>
          <CardDescription>All your uploaded 3D models</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-6">Loading...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>File Size</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Date Added</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {models.map((model) => {
                  const linkedProduct = products.find((p) => p.id === model.productId);
                  
                  return (
                    <TableRow key={model.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <Box className="mr-2 h-4 w-4 text-muted-foreground" />
                          {model.name}
                        </div>
                      </TableCell>
                      <TableCell>{model.fileSize}</TableCell>
                      <TableCell>
                        {linkedProduct ? (
                          <span>{linkedProduct.name}</span>
                        ) : (
                          <span className="text-muted-foreground italic">Not linked</span>
                        )}
                      </TableCell>
                      <TableCell>{model.dateAdded}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handlePreview(model)}
                            title="Preview Model"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                title="Link to Product"
                              >
                                <LinkIcon className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                              <DialogHeader>
                                <DialogTitle>Link to Product</DialogTitle>
                                <DialogDescription>
                                  Link this 3D model to a product
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                  <Label htmlFor="linkProduct">Select Product</Label>
                                  <select 
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    id="linkProduct"
                                    defaultValue={model.productId || ""}
                                  >
                                    <option value="">Select a product</option>
                                    {products.map((product) => (
                                      <option key={product.id} value={product.id}>
                                        {product.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button
                                  onClick={() => handleLinkToProduct(model.id, "selectedProductId")}
                                >
                                  Save
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleDelete(model.id)}
                            title="Delete Model"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
          
          {models.length === 0 && !isLoading && (
            <div className="text-center py-6">
              <p className="text-muted-foreground">No 3D models found</p>
              <Button
                variant="link"
                onClick={() => setIsUploadOpen(true)}
                className="mt-2"
              >
                Upload your first model
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>3D Model Preview</DialogTitle>
          </DialogHeader>
          <div className="h-[400px] rounded-md bg-black/5">
            {selectedModel && (
              <ModelPreview modelUrl={selectedModel.fileUrl} />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModelManagement;
