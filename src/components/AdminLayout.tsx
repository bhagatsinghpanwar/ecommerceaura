
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-background border-b sticky top-0 z-30">
        <div className="container flex h-16 items-center">
          <Link to="/" className="font-semibold text-lg mr-8">
            HomeCraft <span className="text-muted-foreground text-sm">Admin</span>
          </Link>
          <Tabs defaultValue="models" className="w-full">
            <TabsList className="bg-background border-b w-full justify-start rounded-none">
              <TabsTrigger value="dashboard" asChild className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-background">
                <Link to="/admin">Dashboard</Link>
              </TabsTrigger>
              <TabsTrigger value="products" asChild className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-background">
                <Link to="/admin/products">Products</Link>
              </TabsTrigger>
              <TabsTrigger value="models" asChild className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-background">
                <Link to="/admin/models">3D Models</Link>
              </TabsTrigger>
              <TabsTrigger value="settings" asChild className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-background">
                <Link to="/admin/settings">Settings</Link>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      <main className="flex-1 container py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
