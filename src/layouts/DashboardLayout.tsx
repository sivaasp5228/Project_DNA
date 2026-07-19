import React, { useState, useEffect } from 'react';
import { Outlet, Navigate, useLocation, Link } from 'react-router-dom';
import { Menu, Bell, ChevronRight, Dna } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Sidebar } from '../components/Sidebar';
import { Avatar } from '../components/Avatar';
import { cn } from '../lib/utils';

export const DashboardLayout: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
  const location = useLocation();

  // Scroll to top on navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-100">
        <div className="flex flex-col items-center gap-4">
          <div className="p-3 bg-blue-600/10 border border-blue-500/20 text-blue-500 rounded-xl animate-pulse-ring">
            <Dna className="h-8 w-8" />
          </div>
          <span className="text-xs text-zinc-400 font-medium animate-pulse">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Generate simple breadcrumbs from URL
  const getBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(Boolean);
    return (
      <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-medium select-none">
        <span className="text-zinc-400">Workspace</span>
        {paths.map((p, idx) => {
          const pathName = p.charAt(0).toUpperCase() + p.slice(1);
          const isLast = idx === paths.length - 1;
          const to = '/' + paths.slice(0, idx + 1).join('/');
          
          return (
            <React.Fragment key={p}>
              <ChevronRight className="h-3 w-3 text-zinc-650" />
              {isLast ? (
                <span className="text-zinc-200 truncate max-w-[120px]">{pathName}</span>
              ) : (
                <Link to={to} className="hover:text-zinc-300 transition-colors">{pathName}</Link>
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex bg-zinc-950 text-zinc-100 font-sans">
      {/* Sidebar for Desktop */}
      <div className="hidden md:block">
        <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
      </div>

      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-xs"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div 
        className={cn(
          "fixed inset-y-0 left-0 w-64 z-50 transform transition-transform duration-300 md:hidden bg-zinc-950",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Sidebar isCollapsed={false} setIsCollapsed={() => {}} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Navbar */}
        <header className="h-16 border-b border-zinc-900 bg-zinc-950/40 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            {/* Mobile menu toggle */}
            <button 
              onClick={() => setIsMobileOpen(true)}
              className="p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 rounded-lg md:hidden transition-all cursor-pointer"
            >
              <Menu className="h-5 w-5" />
            </button>
            {getBreadcrumbs()}
          </div>

          <div className="flex items-center gap-4">
            {/* Quick stats preview */}
            {user && (
              <div className="hidden lg:flex items-center gap-4 border-r border-zinc-900 pr-4 text-left">
                <div className="flex flex-col">
                  <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Average Score</span>
                  <span className="text-xs font-bold text-blue-400">{user.stats.averageScore || 0}%</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Analyzed</span>
                  <span className="text-xs font-bold text-zinc-300">{user.stats.totalEvaluations || 0} Projects</span>
                </div>
              </div>
            )}

            {/* Notifications */}
            <button className="p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 rounded-lg transition-all relative cursor-pointer">
              <Bell className="h-4.5 w-4.5" />
              <span className="absolute top-1 right-1 h-1.5 w-1.5 bg-blue-500 rounded-full animate-ping" />
            </button>

            {/* Simple Profile Dropdown Placeholder */}
            {user && (
              <Link to="/dashboard/profile" className="flex items-center gap-2 hover:bg-zinc-900/50 p-1 rounded-lg transition-colors">
                <Avatar src={user.avatar} name={user.name} size="sm" />
              </Link>
            )}
          </div>
        </header>

        {/* Content Outlet */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
