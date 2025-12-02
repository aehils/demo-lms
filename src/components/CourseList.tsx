import { BookOpen, Users, Clock } from 'lucide-react';
import type { UserRole } from '../App';
import { mockCourses } from '../data/mockData';

interface CourseListProps {
  userRole: UserRole;
  onCourseSelect: (courseId: string) => void;
}

export function CourseList({ userRole, onCourseSelect }: CourseListProps) {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1>{userRole === 'student' ? 'My Courses' : 'Teaching Courses'}</h1>
        <p className="text-gray-600 mt-2">
          {userRole === 'student'
            ? 'View and manage all your enrolled courses'
            : 'Manage your teaching courses and students'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCourses.map((course) => (
          <button
            key={course.id}
            onClick={() => onCourseSelect(course.id)}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all text-left"
          >
            <div className={`h-32 ${course.color} flex items-center justify-center`}>
              <BookOpen className="w-14 h-14 text-white" />
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h2 className="text-lg">{course.name}</h2>
                  <p className="text-sm text-gray-600 mt-1">{course.code}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{course.students}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.semester}</span>
                </div>
              </div>

              {userRole === 'student' && (
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="text-blue-600">{course.progress}%</span>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-600">
                  {course.coInstructors && course.coInstructors.length > 0
                    ? `You and ${course.coInstructors.join(', ')}`
                    : 'You'}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

