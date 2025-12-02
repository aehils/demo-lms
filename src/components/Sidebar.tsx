import { GraduationCap, User, BarChart3, BookOpen, FileText, Mail, CalendarDays, ExternalLink } from 'lucide-react';
import type { ViewType } from '../App';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

type MenuItem =
  | { id: ViewType; label: string; icon: typeof BarChart3; isExternal?: boolean }
  | { type: 'separator' };

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const menuItems: MenuItem[] = [
    { id: 'activity', label: 'Activity', icon: BarChart3 },
    { id: 'courses', label: 'My Modules', icon: BookOpen },
    { id: 'assignments', label: 'Assignments', icon: FileText },
    { type: 'separator' },
    { id: 'email', label: 'Email', icon: Mail, isExternal: true },
    { id: 'timetable', label: 'Timetable', icon: CalendarDays },
  ];

  return (
    <div className="w-64 bg-gray-50 flex flex-col">
      {/* Logo area */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1>UniLearn</h1>
            <p className="text-sm text-gray-500">Learning Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation card */}
      <nav className="flex-1 px-4">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-2">
          <ul className="space-y-1">
            {menuItems.map((item, index) => {
              if ('type' in item && item.type === 'separator') {
                return (
                  <li key={`separator-${index}`} className="py-2">
                    <div className="border-t border-gray-200" />
                  </li>
                );
              }

              if ('id' in item) {
                const isActive = currentView === item.id;
                const Icon = item.icon;

                return (
                  <li key={item.id}>
                    <button
                      onClick={() => onViewChange(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors text-sm ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span>{item.label}</span>
                      <div className="flex items-center gap-2">
                        {item.isExternal && <ExternalLink className="w-3 h-3" />}
                        <Icon className="w-4 h-4" />
                      </div>
                    </button>
                  </li>
                );
              }

              return null;
            })}
          </ul>
        </div>
      </nav>

      {/* Role indicator and Profile */}
      <div className="p-4">
        <div className="px-3 pb-2">
          <p className="text-sm text-gray-500">Lecturer</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-2">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm">
            <User className="w-4 h-4" />
            <span>Dr. Okafor</span>
          </button>
        </div>
      </div>
    </div>
  );
}

