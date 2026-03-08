import { Users, Calendar as CalendarIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { employees, probationEmployees, calendarEvents } from "../data/mockData";
import { Badge } from "../components/ui/badge";

export function Dashboard() {
  const totalEmployees = employees.length;
  const timeOffCount = 30; // Mock data
  const currentMonth = "June 2026";

  // Generate calendar grid for June 2026
  const daysInMonth = 30;
  const firstDayOfWeek = 0; // Sunday
  const weeks: (number | null)[][] = [];
  let currentWeek: (number | null)[] = new Array(firstDayOfWeek).fill(null);

  for (let day = 1; day <= daysInMonth; day++) {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    weeks.push(currentWeek);
  }

  const hasEvent = (day: number) => {
    return calendarEvents.some((event) =>
      event.date.endsWith(`-${String(day).padStart(2, "0")}`)
    );
  };

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

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-gray-900">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-700">
              <Users className="w-5 h-5 text-[#FF5722]" />
              Number of Employees
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold text-[#FF5722]">{totalEmployees}</div>
            <div className="text-sm text-gray-600 mt-2">Total employees</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-700">
              <CalendarIcon className="w-5 h-5 text-[#FF5722]" />
              Time-off
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold text-[#FF5722]">{timeOffCount}</div>
            <div className="text-sm text-gray-600 mt-2">Days off</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900">{currentMonth}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Calendar Grid */}
              <div>
                <div className="grid grid-cols-7 gap-2 mb-2">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div
                      key={day}
                      className="text-center text-xs font-medium text-gray-600"
                    >
                      {day}
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  {weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="grid grid-cols-7 gap-2">
                      {week.map((day, dayIndex) => (
                        <div
                          key={dayIndex}
                          className={`aspect-square flex items-center justify-center text-sm rounded ${
                            day === null
                              ? ""
                              : day === 8
                              ? "bg-blue-500 text-white font-semibold"
                              : hasEvent(day)
                              ? "bg-red-500 text-white font-semibold"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {day}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="flex gap-4 text-xs pt-4 border-t">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-blue-500"></div>
                  <span className="text-gray-600">Today</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-red-500"></div>
                  <span className="text-gray-600">Meeting</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Probationary Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900">Probationary progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {probationEmployees.slice(0, 8).map((emp, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-gray-900 truncate">
                      {emp.fullName}
                    </div>
                    <div className="text-xs text-gray-500 truncate">{emp.email}</div>
                  </div>
                  <Badge className={`${getStatusColor(emp.status)} text-white text-xs`}>
                    {emp.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
