import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { X, Plus, LogOut } from "lucide-react";

interface Interest {
  name: string;
}

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [interests, setInterests] = useState<string[]>([]);
  const [newInterest, setNewInterest] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setLocation("/admin/login");
      return;
    }
    loadInterests();
  }, []);

  const loadInterests = async () => {
    try {
      const response = await apiRequest("GET", "/api/admin/interests");
      const data = await response.json();
      setInterests(data.interests || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load interests",
        variant: "destructive",
      });
    }
  };

  const handleAddInterest = async () => {
    if (!newInterest.trim()) {
      toast({
        title: "Error",
        description: "Interest cannot be empty",
        variant: "destructive",
      });
      return;
    }

    if (interests.includes(newInterest.trim())) {
      toast({
        title: "Error",
        description: "This interest already exists",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const updated = [...interests, newInterest.trim()];
      await apiRequest("POST", "/api/admin/interests", { interests: updated });
      setInterests(updated);
      setNewInterest("");
      toast({
        title: "Success",
        description: "Interest added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add interest",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveInterest = async (interest: string) => {
    setIsLoading(true);
    try {
      const updated = interests.filter((i) => i !== interest);
      await apiRequest("POST", "/api/admin/interests", { interests: updated });
      setInterests(updated);
      toast({
        title: "Success",
        description: "Interest removed successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove interest",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">Manage site settings and content</p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            data-testid="button-admin-logout"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Interests Management */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">Manage Interests</h2>

          {/* Add New Interest */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-3">Add New Interest</label>
            <div className="flex gap-2">
              <Input
                type="text"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                placeholder="Enter interest name (e.g., Anime, Gardening)"
                onKeyPress={(e) => e.key === "Enter" && handleAddInterest()}
                data-testid="input-new-interest"
                disabled={isLoading}
              />
              <Button
                onClick={handleAddInterest}
                disabled={isLoading}
                data-testid="button-add-interest"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </div>
          </div>

          {/* Current Interests */}
          <div>
            <label className="block text-sm font-medium mb-3">
              Current Interests ({interests.length})
            </label>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <Badge
                  key={interest}
                  variant="secondary"
                  className="flex items-center gap-2 px-3 py-2"
                  data-testid={`badge-interest-${interest}`}
                >
                  {interest}
                  <button
                    onClick={() => handleRemoveInterest(interest)}
                    disabled={isLoading}
                    className="ml-1 hover:opacity-70"
                    data-testid={`button-remove-interest-${interest}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
            {interests.length === 0 && (
              <p className="text-muted-foreground text-sm">No interests added yet</p>
            )}
          </div>
        </Card>

        {/* Moderation Section */}
        <Card className="p-6 mt-6">
          <h2 className="text-2xl font-bold mb-4">Moderation Tools</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Advanced moderation features including user bans, chat filtering, and content review are coming soon.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-secondary rounded-lg">
                <h3 className="font-semibold mb-2">Ban Management</h3>
                <p className="text-sm text-muted-foreground">Coming soon</p>
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <h3 className="font-semibold mb-2">Chat Monitoring</h3>
                <p className="text-sm text-muted-foreground">Coming soon</p>
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <h3 className="font-semibold mb-2">Site Analytics</h3>
                <p className="text-sm text-muted-foreground">Coming soon</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
