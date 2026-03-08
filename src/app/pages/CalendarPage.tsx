import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: "meeting" | "evaluation" | "holiday" | "internal";
  description?: string;
}

export function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(5); // June (0-indexed)
  const [currentYear, setCurrentYear] = useState(2026);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: "1",
      title: "Team Meeting",
      date: "2026-06-02",
      type: "meeting",
      description: "Monthly team sync",
    },
    {
      id: "2",
      title: "HR Review",
      date: "2026-06-09",
      type: "evaluation",
      description: "Quarterly HR performance review",
    },
    {
      id: "3",
      title: "Board Meeting",
      date: "2026-06-16",
      type: "meeting",
      description: "Board of directors meeting",
    },
    {
      id: "4",
      title: "Q2 Review",
      date: "2026-06-23",
      type: "evaluation",
      description: "Q2 performance evaluation",
    },
    {
      id: "5",
      title: "Independence Day",
      date: "2026-07-04",
      type: "holiday",
      description: "Public holiday",
    },
  ]);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

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

  const getEventsForDay = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return events.filter((event) => event.date === dateStr);
  };

  const getEventTypeColor = (type: CalendarEvent["type"]) => {
    switch (type) {
      case "meeting":
        return "bg-red-500";
      case "evaluation":
        return "bg-orange-500";
      case "holiday":
        return "bg-green-500";
      case "internal":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const today = new Date();
  const isToday = (day: number) =>
    day === today.getDate() &&
    currentMonth === today.getMonth() &&
    currentYear === today.getFullYear();

  const upcomingEvents = events
    .filter((event) => new Date(event.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Calendar</h1>
          <p className="text-gray-600 mt-2">Manage HR events and schedules</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#FF5722] hover:bg-[#E64A19]">
              <Plus className="w-4 h-4 mr-2" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Event Title</Label>
                <Input placeholder="Enter event title" />
              </div>
              <div className="space-y-2">
                <Label>Event Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="evaluation">Evaluation</SelectItem>
                    <SelectItem value="holiday">Holiday</SelectItem>
                    <SelectItem value="internal">Internal Event</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea placeholder="Enter event description" rows={3} />
              </div>
              <Button className="w-full bg-[#FF5722] hover:bg-[#E64A19]">
                Create Event
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                {monthNames[currentMonth]} {currentYear}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePreviousMonth}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={handleNextMonth}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="text-center text-sm font-medium text-gray-600"
                    >
                      {day}
                    </div>
                  )
                )}
              </div>

              {/* Calendar Grid */}
              <div className="space-y-2">
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="grid grid-cols-7 gap-2">
                    {week.map((day, dayIndex) => {
                      const dayEvents = day ? getEventsForDay(day) : [];
                      return (
                        <div
                          key={dayIndex}
                          className={`min-h-[80px] p-2 rounded border transition-colors ${
                            day === null
                              ? "bg-gray-50"
                              : isToday(day)
                              ? "bg-blue-50 border-blue-500"
                              : dayEvents.length > 0
                              ? "bg-white border-gray-300 hover:border-[#FF5722] cursor-pointer"
                              : "bg-white border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          {day && (
                            <div>
                              <div
                                className={`text-sm mb-1 ${
                                  isToday(day)
                                    ? "font-bold text-blue-600"
                                    : "text-gray-700"
                                }`}
                              >
                                {day}
                              </div>
                              <div className="space-y-1">
                                {dayEvents.slice(0, 2).map((event) => (
                                  <div
                                    key={event.id}
                                    className={`text-xs px-1 py-0.5 rounded text-white truncate ${getEventTypeColor(
                                      event.type
                                    )}`}
                                  >
                                    {event.title}
                                  </div>
                                ))}
                                {dayEvents.length > 2 && (
                                  <div className="text-xs text-gray-500">
                                    +{dayEvents.length - 2} more
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events & Legend */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingEvents.length === 0 ? (
                  <p className="text-sm text-gray-500">No upcoming events</p>
                ) : (
                  upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="border-l-4 pl-3 py-2"
                      style={{
                        borderColor:
                          event.type === "meeting"
                            ? "#ef4444"
                            : event.type === "evaluation"
                            ? "#f97316"
                            : event.type === "holiday"
                            ? "#22c55e"
                            : "#a855f7",
                      }}
                    >
                      <div className="font-medium text-sm">{event.title}</div>
                      <div className="text-xs text-gray-600 mt-1">
                        {new Date(event.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                      {event.description && (
                        <div className="text-xs text-gray-500 mt-1">
                          {event.description}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Legend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-blue-500"></div>
                  <span className="text-sm text-gray-700">Today</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-red-500"></div>
                  <span className="text-sm text-gray-700">Meeting</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-orange-500"></div>
                  <span className="text-sm text-gray-700">Evaluation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-green-500"></div>
                  <span className="text-sm text-gray-700">Holiday</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-purple-500"></div>
                  <span className="text-sm text-gray-700">Internal Event</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
