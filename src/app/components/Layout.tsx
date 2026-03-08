import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { LogOut, LayoutDashboard, Users, UserCheck, CalendarDays, PlaneTakeoff, Menu, X } from "lucide-react";
import { Button } from "./ui/button";

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 bg-[#FF5722] text-white flex items-center justify-between">
          <div className="text-lg font-semibold">
            sprobe <span className="font-light">| HRIS</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={handleNavClick}
                className={`w-full px-4 py-3 rounded transition-colors flex items-center gap-3 text-left ${
                  location.pathname === item.path
                    ? "bg-[#FF5722] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-[18px] h-[18px]" />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              handleLogout();
            }}
            className="w-full px-4 py-3 rounded transition-colors flex items-center gap-3 hover:bg-gray-100 border-t border-gray-200 mt-4 pt-4 text-gray-700 text-left"
          >
            <LogOut className="w-[18px] h-[18px]" />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Header */}
      <header className="bg-[#FF5722] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-xl font-semibold">
              sprobe <span className="font-light">| HRIS</span>
            </div>

            {/* Desktop Navigation - Hidden on Mobile */}
            <nav className="hidden lg:flex items-center gap-1">
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
            </nav>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Desktop Logout - Hidden on Mobile */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="hidden lg:flex text-white hover:bg-white/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>

            {/* Mobile Hamburger Menu - Hidden on Desktop */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded hover:bg-white/10 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
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