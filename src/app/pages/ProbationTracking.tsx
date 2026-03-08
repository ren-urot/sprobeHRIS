import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { probationEmployees, type ProbationEmployee } from "../data/mockData";
import { Avatar, AvatarFallback } from "../components/ui/avatar";

export function ProbationTracking() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const probationStages = [
    "Just Started",
    "2nd Month",
    "3rd Month Evaluation",
    "4th Month",
    "5th Month",
    "End of Probation Evaluation",
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Just Started":
        return "bg-blue-500";
      case "2nd Month":
        return "bg-green-500";
      case "3rd Month Evaluation":
        return "bg-yellow-500";
      case "4th Month":
        return "bg-orange-500";
      case "5th Month":
        return "bg-purple-500";
      case "End of Probation Evaluation":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const filteredEmployees = probationEmployees.filter((emp) => {
    const matchesSearch =
      emp.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || emp.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const employeesByStage = probationStages.map((stage) => ({
    stage,
    employees: filteredEmployees.filter((emp) => emp.status === stage),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Probation Tracking</h1>
        <p className="text-gray-600 mt-2">
          Monitor and track employees during their probation period
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="w-[250px]">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                {probationStages.map((stage) => (
                  <SelectItem key={stage} value={stage}>
                    {stage}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Probation Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employeesByStage.map(({ stage, employees }) => (
          <Card key={stage} className="flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span className="text-base">{stage}</span>
                <Badge variant="secondary" className="text-xs">
                  {employees.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {employees.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No employees in this stage
                  </p>
                ) : (
                  employees.map((emp, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className={`${getStatusColor(stage)} text-white text-xs`}>
                            {getInitials(emp.fullName)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm text-gray-900 truncate">
                            {emp.fullName}
                          </div>
                          <div className="text-xs text-gray-500 truncate">
                            {emp.email}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {employeesByStage.map(({ stage, employees }) => (
          <Card key={stage}>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className={`w-12 h-12 rounded-full ${getStatusColor(stage)} mx-auto mb-2`}></div>
                <div className="text-2xl font-bold">{employees.length}</div>
                <div className="text-xs text-gray-600 mt-1 truncate">{stage}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
