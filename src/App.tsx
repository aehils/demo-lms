import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Activity } from './components/Activity';
import { Dashboard } from './components/Dashboard';
import { CourseList } from './components/CourseList';
import { CourseView } from './components/CourseView';
import { Assignments } from './components/Assignments';
import { Grades } from './components/Grades';
import { Calendar } from './components/Calendar';
import { Email } from './components/Email';
import { Timetable } from './components/Timetable';

export type UserRole = 'student' | 'instructor';
export type ViewType = 'activity' | 'courses' | 'course' | 'assignments' | 'grades' | 'calendar' | 'email' | 'timetable';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('activity');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<UserRole>('instructor');

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourseId(courseId);
    setCurrentView('course');
  };

  const renderView = () => {
    switch (currentView) {
      case 'activity':
        return <Activity />;
      case 'courses':
        return <CourseList userRole={userRole} onCourseSelect={handleCourseSelect} />;
      case 'course':
        return <CourseView courseId={selectedCourseId} userRole={userRole} />;
      case 'assignments':
        return <Assignments userRole={userRole} />;
      case 'grades':
        return <Grades userRole={userRole} />;
      case 'calendar':
        return <Calendar userRole={userRole} />;
      case 'email':
        return <Email />;
      case 'timetable':
        return <Timetable />;
      default:
        return <Activity />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        currentView={currentView}
        onViewChange={setCurrentView}
      />
      <main className="flex-1 overflow-y-auto">
        {renderView()}
      </main>
    </div>
  );
}

