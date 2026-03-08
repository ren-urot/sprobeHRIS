import { useState } from "react";
import { Calendar, Search, Plus, CheckCircle, XCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";

interface TimeOffRequest {
  id: string;
  employeeName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  days: number;
  status: "Pending" | "Approved" | "Rejected";
  reason: string;
}

export function TimeOff() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [timeOffRequests, setTimeOffRequests] = useState<TimeOffRequest[]>([
    {
      id: "TO-001",
      employeeName: "Christopher Clark",
      leaveType: "Vacation",
      startDate: "2026-03-15",
      endDate: "2026-03-20",
      days: 6,
      status: "Approved",
      reason: "Family vacation",
    },
    {
      id: "TO-002",
      employeeName: "Patricia Anderson",
      leaveType: "Sick Leave",
      startDate: "2026-03-10",
      endDate: "2026-03-12",
      days: 3,
      status: "Approved",
      reason: "Medical appointment",
    },
    {
      id: "TO-003",
      employeeName: "Robert Jackson",
      leaveType: "Personal",
      startDate: "2026-03-25",
      endDate: "2026-03-26",
      days: 2,
      status: "Pending",
      reason: "Personal matters",
    },
    {
      id: "TO-004",
      employeeName: "Jennifer Martin",
      leaveType: "Vacation",
      startDate: "2026-04-01",
      endDate: "2026-04-07",
      days: 7,
      status: "Pending",
      reason: "Spring break",
    },
    {
      id: "TO-005",
      employeeName: "John Eve",
      leaveType: "Sick Leave",
      startDate: "2026-03-08",
      endDate: "2026-03-08",
      days: 1,
      status: "Rejected",
      reason: "Flu symptoms",
    },
  ]);

  const filteredRequests = timeOffRequests.filter((request) =>
    request.employeeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalDaysOff = timeOffRequests
    .filter((r) => r.status === "Approved")
    .reduce((sum, r) => sum + r.days, 0);

  const pendingRequests = timeOffRequests.filter((r) => r.status === "Pending").length;
  const approvedRequests = timeOffRequests.filter((r) => r.status === "Approved").length;

  const getStatusBadge = (status: TimeOffRequest["status"]) => {
    switch (status) {
      case "Approved":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        );
      case "Rejected":
        return (
          <Badge className="bg-red-500 hover:bg-red-600">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        );
      case "Pending":
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
    }
  };

  const handleApprove = (id: string) => {
    setTimeOffRequests(
      timeOffRequests.map((req) =>
        req.id === id ? { ...req, status: "Approved" as const } : req
      )
    );
  };

  const handleReject = (id: string) => {
    setTimeOffRequests(
      timeOffRequests.map((req) =>
        req.id === id ? { ...req, status: "Rejected" as const } : req
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Time Off Management</h1>
          <p className="text-gray-600 mt-2">
            Track and manage employee leave requests
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm text-gray-700">
              <Calendar className="w-4 h-4 text-[#FF5722]" />
              Total Days Off
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#FF5722]">{totalDaysOff}</div>
            <div className="text-xs text-gray-600 mt-1">Approved this month</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm text-gray-700">
              <Clock className="w-4 h-4 text-yellow-500" />
              Pending Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-500">{pendingRequests}</div>
            <div className="text-xs text-gray-600 mt-1">Awaiting approval</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm text-gray-700">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Approved Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">{approvedRequests}</div>
            <div className="text-xs text-gray-600 mt-1">This month</div>
          </CardContent>
        </Card>
      </div>

      {/* Action Bar */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by employee name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#FF5722] hover:bg-[#E64A19]">
                <Plus className="w-4 h-4 mr-2" />
                New Request
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>New Time Off Request</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Employee Name</Label>
                  <Input placeholder="Enter employee name" />
                </div>
                <div className="space-y-2">
                  <Label>Leave Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select leave type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vacation">Vacation</SelectItem>
                      <SelectItem value="sick">Sick Leave</SelectItem>
                      <SelectItem value="personal">Personal</SelectItem>
                      <SelectItem value="emergency">Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Reason</Label>
                  <Textarea placeholder="Enter reason for leave request" rows={3} />
                </div>
                <Button className="w-full bg-[#FF5722] hover:bg-[#E64A19]">
                  Submit Request
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Time Off Requests Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>ID</TableHead>
              <TableHead>Employee Name</TableHead>
              <TableHead>Leave Type</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Days</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">{request.id}</TableCell>
                <TableCell>{request.employeeName}</TableCell>
                <TableCell>{request.leaveType}</TableCell>
                <TableCell>{request.startDate}</TableCell>
                <TableCell>{request.endDate}</TableCell>
                <TableCell>{request.days}</TableCell>
                <TableCell>{getStatusBadge(request.status)}</TableCell>
                <TableCell className="text-right">
                  {request.status === "Pending" && (
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-green-600 hover:text-green-700 hover:bg-green-50"
                        onClick={() => handleApprove(request.id)}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleReject(request.id)}
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
