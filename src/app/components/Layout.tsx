import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { LogOut, LayoutDashboard, Users, UserCheck, CalendarDays, PlaneTakeoff } from "lucide-react";
import { Button } from "./ui/button";

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/employees", label: "Employees", icon: Users },
    { path: "/probation", label: "Probation", icon: UserCheck },
    { path: "/time-off", label: "Time Off", icon: PlaneTakeoff },
    { path: "/calendar", label: "Calendar", icon: CalendarDays },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#FF5722] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-xl font-semibold">
              sprobe <span className="font-light">| HRIS</span>
            </div>
          </div>

          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded transition-colors flex items-center gap-2 ${
                    location.pathname === item.path
                      ? "bg-white/20"
                      : "hover:bg-white/10"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-white hover:bg-white/10 ml-2"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-sm text-gray-600">
          © 2026 Sprobe Inc. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}