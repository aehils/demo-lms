import { GraduationCap, Settings } from 'lucide-react';
import type { UserRole, ViewType } from '../App';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

type MenuItem =
  | { id: ViewType; label: string; emoji: string }
  | { type: 'separator' };

export function Sidebar({ currentView, onViewChange, userRole, onRoleChange }: SidebarProps) {
  const menuItems: MenuItem[] = [
    { id: 'activity', label: 'Activity', emoji: '📊' },
    { id: 'courses', label: 'My Modules', emoji: '📚' },
    { id: 'assignments', label: 'Assignments', emoji: '📝' },
    { type: 'separator' },
    { id: 'email', label: 'Email', emoji: '✉️' },
    { id: 'timetable', label: 'Timetable', emoji: '📅' },
  ];

  return (
    <div className="w-64 bg-gray-50 flex flex-col">
      {/* Logo area */}
      <div className="p-6">
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

      {/* Role switcher */}
      <div className="px-4 pb-4">
        <div className="flex gap-2">
          <button
            onClick={() => onRoleChange('student')}
            className={`flex-1 px-3 py-2 rounded-lg text-sm transition-colors ${
              userRole === 'student'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Student
          </button>
          <button
            onClick={() => onRoleChange('instructor')}
            className={`flex-1 px-3 py-2 rounded-lg text-sm transition-colors ${
              userRole === 'instructor'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Instructor
          </button>
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

                return (
                  <li key={item.id}>
                    <button
                      onClick={() => onViewChange(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-lg">{item.emoji}</span>
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              }

              return null;
            })}
          </ul>
        </div>
      </nav>

      {/* Settings card */}
      <div className="p-4">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-2">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}

