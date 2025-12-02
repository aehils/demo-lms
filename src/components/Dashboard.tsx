import { Clock, TrendingUp, BookOpen, CheckCircle2 } from 'lucide-react';
import type { UserRole } from '../App';
import { mockCourses, mockAssignments, mockAnnouncements } from '../data/mockData';

interface DashboardProps {
  userRole: UserRole;
  onCourseSelect: (courseId: string) => void;
}

export function Dashboard({ userRole, onCourseSelect }: DashboardProps) {
  const upcomingAssignments = mockAssignments.slice(0, 3);
  const recentCourses = mockCourses.slice(0, 4);

  const stats = userRole === 'student'
    ? [
        { label: 'Active Courses', value: '5', icon: BookOpen, color: 'bg-blue-100 text-blue-700' },
        { label: 'Assignments Due', value: '3', icon: Clock, color: 'bg-orange-100 text-orange-700' },
        { label: 'Completed', value: '12', icon: CheckCircle2, color: 'bg-green-100 text-green-700' },
        { label: 'Average Grade', value: '87%', icon: TrendingUp, color: 'bg-purple-100 text-purple-700' },
      ]
    : [
        { label: 'My Courses', value: '4', icon: BookOpen, color: 'bg-blue-100 text-blue-700' },
        { label: 'Total Students', value: '156', icon: TrendingUp, color: 'bg-green-100 text-green-700' },
        { label: 'Pending Reviews', value: '8', icon: Clock, color: 'bg-orange-100 text-orange-700' },
        { label: 'Avg. Completion', value: '92%', icon: CheckCircle2, color: 'bg-purple-100 text-purple-700' },
      ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1>Welcome back, {userRole === 'student' ? 'Sarah' : 'Dr. Johnson'}!</h1>
        <p className="text-gray-600 mt-2">
          {userRole === 'student'
            ? "Here's what's happening with your courses today."
            : "Here's an overview of your teaching activities."}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                  <p className="mt-2">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Assignments */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="mb-4">{userRole === 'student' ? 'Upcoming Assignments' : 'Recent Assignments'}</h2>
          <div className="space-y-4">
            {upcomingAssignments.map((assignment) => (
              <div key={assignment.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  assignment.status === 'pending' ? 'bg-orange-100' : 'bg-green-100'
                }`}>
                  <FileText className={`w-5 h-5 ${
                    assignment.status === 'pending' ? 'text-orange-600' : 'text-green-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm">{assignment.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{assignment.course}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-gray-500">Due: {assignment.dueDate}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      assignment.status === 'pending' 
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {assignment.status === 'pending' ? 'Pending' : 'Submitted'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Announcements */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="mb-4">Announcements</h2>
          <div className="space-y-4">
            {mockAnnouncements.map((announcement) => (
              <div key={announcement.id} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <h3 className="text-sm">{announcement.title}</h3>
                <p className="text-xs text-gray-600 mt-1">{announcement.course}</p>
                <p className="text-xs text-gray-500 mt-2">{announcement.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Courses */}
      <div className="mt-6 bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="mb-4">My Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentCourses.map((course) => (
            <button
              key={course.id}
              onClick={() => onCourseSelect(course.id)}
              className="text-left p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
            >
              <div className={`w-full h-32 rounded-lg mb-3 ${course.color} flex items-center justify-center`}>
                <BookOpen className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-sm">{course.name}</h3>
              <p className="text-xs text-gray-600 mt-1">{course.code}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-gray-500">{course.instructor}</span>
                <span className="text-xs text-gray-500">{course.progress}%</span>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-blue-600 h-1.5 rounded-full"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const FileText = Clock;

