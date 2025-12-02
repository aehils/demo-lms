import { BookOpen, Users } from 'lucide-react';
import type { UserRole } from '../App';
import { mockCourses } from '../data/mockData';

interface CourseListProps {
  userRole: UserRole;
  onCourseSelect: (courseId: string, yearGroup?: string) => void;
}

export function CourseList({ userRole, onCourseSelect }: CourseListProps) {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1>{userRole === 'student' ? 'My Courses' : 'My Classes'}</h1>
        <p className="text-gray-600 mt-2">
          {userRole === 'student'
            ? 'View and manage all your enrolled courses'
            : 'Select a cohort to engage with on your platform'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
          >
            {/* Gradient Header with Icon */}
            <div className={`h-32 ${course.color} bg-gradient-to-br from-current to-opacity-80 flex items-center justify-center relative`}>
              <BookOpen className="w-14 h-14 text-white" />
            </div>

            {/* Course Content */}
            <div className="p-6">
              {/* Course Name and Code */}
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900">{course.name}</h2>
                <p className="text-sm text-gray-500 mt-1">{course.code}</p>
              </div>

              {/* Key Metrics Row */}
              <div className="mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-700 mb-3">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">{course.students} students</span>
                </div>

                {/* Year Groups */}
                {userRole === 'instructor' && course.yearGroups && course.yearGroups.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm text-gray-600">Year Groups:</span>
                    {course.yearGroups.map((yearGroup) => (
                      <button
                        key={yearGroup}
                        onClick={() => onCourseSelect(course.id, yearGroup)}
                        className="px-3 py-1 text-sm font-medium border-2 border-gray-300 rounded-full hover:border-brand-green hover:bg-brand-green hover:text-white transition-all"
                      >
                        {yearGroup}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Progress for Students */}
              {userRole === 'student' && (
                <div className="mb-4 flex items-center justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="text-brand-green-dark font-semibold">{course.progress}%</span>
                </div>
              )}

              {/* Co-instructors */}
              {userRole === 'instructor' && (
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-600">
                    {course.coInstructors && course.coInstructors.length > 0
                      ? `You and ${course.coInstructors.join(', ')}`
                      : 'You'}
                  </p>
                </div>
              )}

              {/* For students, make the entire card clickable */}
              {userRole === 'student' && (
                <button
                  onClick={() => onCourseSelect(course.id)}
                  className="mt-4 w-full py-2 text-sm font-medium text-brand-green-dark hover:text-brand-green transition-colors"
                >
                  View Course
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

