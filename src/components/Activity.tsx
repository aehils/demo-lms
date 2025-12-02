import { useState, useMemo } from 'react';
import { AlertCircle, Clock, Users, FileText, MessageCircle, CheckCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import {
  mockActivityFeed,
  mockAttentionItems,
  mockCourseStats,
  type ActivityType,
} from '../data/mockData';
import type { UserRole } from '../App';

interface ActivityProps {
  userRole: UserRole;
}

type ActivityFilter = 'all' | 'submission' | 'late_submission' | 'access' | 'comment';

export function Activity({ userRole }: ActivityProps) {
  const [activityFilter, setActivityFilter] = useState<ActivityFilter>('all');

  // Filter activity feed based on selected filter
  const filteredActivities = useMemo(() => {
    if (activityFilter === 'all') return mockActivityFeed;
    if (activityFilter === 'comment') {
      return mockActivityFeed.filter((item) => item.type === 'comment');
    }
    return mockActivityFeed.filter((item) => item.type === activityFilter);
  }, [activityFilter]);

  // Get icon for activity type
  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case 'submission':
        return <FileText className="w-4 h-4 text-blue-600" />;
      case 'late_submission':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      case 'comment':
        return <MessageCircle className="w-4 h-4 text-purple-600" />;
      case 'access':
        return <Users className="w-4 h-4 text-green-600" />;
      case 'grade_posted':
        return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  // Show instructor view only
  if (userRole !== 'instructor') {
    return (
      <div className="p-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <p className="text-blue-800">Activity dashboard is available in Instructor view only.</p>
          <p className="text-sm text-blue-600 mt-2">Switch to Instructor mode to access this feature.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Activity Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor student activity and course performance</p>
        </div>

        {/* Needs Attention Section */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            <h2 className="text-xl font-semibold text-gray-900">Needs Attention</h2>
          </div>
          <div className="space-y-3">
            {mockAttentionItems.length === 0 ? (
              <p className="text-gray-500 text-sm">All caught up! No urgent items.</p>
            ) : (
              mockAttentionItems.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-start gap-3 p-4 rounded-lg border ${
                    item.priority === 'high'
                      ? 'bg-red-50 border-red-200'
                      : 'bg-yellow-50 border-yellow-200'
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-900">{item.courseName}</h3>
                      {item.dueDate && (
                        <span className="text-xs px-2 py-1 bg-white border border-gray-300 rounded-full text-gray-700">
                          {item.dueDate}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 mt-1">
                      <span className="font-medium">{item.description}</span>
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setActivityFilter('all')}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  activityFilter === 'all'
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActivityFilter('submission')}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  activityFilter === 'submission'
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Submissions
              </button>
              <button
                onClick={() => setActivityFilter('access')}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  activityFilter === 'access'
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Access
              </button>
              <button
                onClick={() => setActivityFilter('late_submission')}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  activityFilter === 'late_submission'
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Late
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {filteredActivities.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-8">No activities found for this filter.</p>
            ) : (
              filteredActivities.slice(0, 10).map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="mt-0.5">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.studentName}</span>{' '}
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{activity.course}</p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                  </span>
                </div>
              ))
            )}
          </div>

          {filteredActivities.length > 10 && (
            <button className="w-full mt-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
              Show more
            </button>
          )}
        </div>

        {/* Course Overview Section */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Course Overview</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Course</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Pending</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Avg. Grade</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Active Students</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Submission Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockCourseStats.map((course) => (
                  <tr key={course.courseId} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{course.courseName}</p>
                        <p className="text-xs text-gray-500">{course.courseCode}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          course.pendingReviews > 5
                            ? 'bg-red-100 text-red-700'
                            : course.pendingReviews > 0
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {course.pendingReviews}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-900">{course.averageGrade}%</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-900">
                        {course.activeStudents}/{course.totalStudents}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                          <div
                            className={`h-2 rounded-full ${
                              course.submissionRate >= 85
                                ? 'bg-green-500'
                                : course.submissionRate >= 70
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                            }`}
                            style={{ width: `${course.submissionRate}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 whitespace-nowrap">
                          {course.submissionRate}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
