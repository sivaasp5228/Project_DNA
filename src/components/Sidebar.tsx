import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusCircle, 
  History, 
  User, 
  LogOut, 
  Dna,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Avatar } from './Avatar';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '../lib/utils';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/dashboard/new', label: 'New Evaluation', icon: PlusCircle },
    { to: '/dashboard/history', label: 'History', icon: History },
    { to: '/dashboard/profile', label: 'Profile Settings', icon: User },
  ];

  return (
    <aside 
      className={cn(
        "h-screen bg-zinc-950 border-r border-zinc-900 flex flex-col justify-between transition-all duration-300 sticky top-0 z-30 select-none",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div>
        {/* Top Header */}
        <div className={cn("h-16 flex items-center border-b border-zinc-900 px-4", isCollapsed ? "justify-center" : "justify-between")}>
          <NavLink to="/dashboard" className="flex items-center gap-2.5 text-zinc-100 hover:text-white transition-colors overflow-hidden">
            <div className="p-1.5 bg-blue-600/10 border border-blue-500/20 text-blue-500 rounded-lg shrink-0">
              <Dna className="h-5 w-5 animate-pulse-ring" />
            </div>
            {!isCollapsed && (
              <span className="font-bold text-sm tracking-tight truncate">
                ProjectDNA <span className="text-blue-500 font-medium text-[10px] bg-blue-500/10 border border-blue-500/20 px-1 rounded-full ml-0.5">AI</span>
              </span>
            )}
          </NavLink>
          
          {!isCollapsed && (
            <button 
              onClick={() => setIsCollapsed(true)}
              className="p-1 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 rounded-md transition-all cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* User Card */}
        {user && (
          <div className={cn("p-4 border-b border-zinc-900 flex items-center gap-3 overflow-hidden", isCollapsed ? "justify-center" : "justify-start")}>
            <Avatar src={user.avatar} name={user.name} size="md" />
            {!isCollapsed && (
              <div className="flex flex-col text-left overflow-hidden">
                <span className="text-xs font-semibold text-zinc-200 truncate">{user.name}</span>
                <span className="text-[10px] text-zinc-500 truncate">{user.email}</span>
              </div>
            )}
          </div>
        )}

        {/* Navigation Items */}
        <nav className="p-2.5 flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all group cursor-pointer relative",
                isActive 
                  ? "bg-zinc-900 text-zinc-100 border border-zinc-800" 
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-950 border border-transparent",
                isCollapsed && "justify-center px-0"
              )}
            >
              {({ isActive }) => (
                <>
                  <item.icon className={cn("h-4.5 w-4.5 shrink-0 transition-colors", isActive ? "text-blue-500" : "text-zinc-500 group-hover:text-zinc-400")} />
                  {!isCollapsed && <span>{item.label}</span>}
                  
                  {isCollapsed && (
                    <div className="absolute left-full ml-3 px-2 py-1 bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-200 rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                      {item.label}
                    </div>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="p-3 border-t border-zinc-900 flex flex-col gap-2">
        {isCollapsed && (
          <button 
            onClick={() => setIsCollapsed(false)}
            className="p-2 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 rounded-lg flex items-center justify-center transition-all cursor-pointer"
          >
            <ChevronRight className="h-4.5 w-4.5" />
          </button>
        )}
        
        <div className={cn("flex items-center gap-2", isCollapsed ? "flex-col" : "justify-between")}>
          <ThemeToggle />
          <button
            onClick={handleLogout}
            className={cn(
              "p-2 hover:bg-zinc-900 border border-zinc-850 hover:border-zinc-800 rounded-lg text-zinc-500 hover:text-red-400 transition-all flex items-center gap-2 cursor-pointer focus:outline-none",
              !isCollapsed && "flex-1 justify-center py-1.5 text-xs font-semibold"
            )}
            title="Log Out"
          >
            <LogOut className="h-4.5 w-4.5" />
            {!isCollapsed && <span>Log Out</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};
