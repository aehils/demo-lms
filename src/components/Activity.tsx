import { useState, useMemo } from 'react';
import { AlertCircle, Clock, Users, FileText, MessageCircle, CheckCircle, Megaphone, ClipboardCheck, TrendingUp, AlertTriangle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import {
  mockActivityFeed,
  mockAttentionItems,
  mockCourseStats,
  type ActivityType,
} from '../data/mockData';

type ActivityFilter = 'all' | 'submission' | 'late_submission' | 'access' | 'comment';

export function Activity() {
  const [activityFilter, setActivityFilter] = useState<ActivityFilter>('all');
  const [attentionPage, setAttentionPage] = useState(1);
  const itemsPerPage = 4;

  // Pagination for attention items
  const totalAttentionPages = Math.ceil(mockAttentionItems.length / itemsPerPage);
  const paginatedAttentionItems = mockAttentionItems.slice(
    (attentionPage - 1) * itemsPerPage,
    attentionPage * itemsPerPage
  );

  // Calculate time remaining text
  const getTimeRemaining = (dueDate: string | undefined) => {
    if (!dueDate) return null;

    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(23, 59, 59, 999);

    const dayAfterTomorrow = new Date(now);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
    dayAfterTomorrow.setHours(23, 59, 59, 999);

    if (dueDate.toLowerCase() === 'today') {
      const endOfDay = new Date(now);
      endOfDay.setHours(23, 59, 59, 999);
      const hoursLeft = Math.ceil((endOfDay.getTime() - now.getTime()) / (1000 * 60 * 60));
      return `Due in ${hoursLeft}h`;
    } else if (dueDate.toLowerCase() === 'tomorrow') {
      return 'Due in 1 day';
    } else {
      // For other cases, could add more logic
      return `Due ${dueDate}`;
    }
  };

  // Filter activity feed based on selected filter
  const filteredActivities = useMemo(() => {
    if (activityFilter === 'all') return mockActivityFeed;
    if (activityFilter === 'comment') {
      return mockActivityFeed.filter((item) => item.type === 'comment');
    }
    return mockActivityFeed.filter((item) => item.type === activityFilter);
  }, [activityFilter]);

  // Calculate aggregate stats
  const aggregateStats = useMemo(() => {
    const totalStudents = mockCourseStats.reduce((sum, course) => sum + course.activeStudents, 0);
    const avgAttendance = Math.round(
      mockCourseStats.reduce((sum, course) => sum + course.attendance, 0) / mockCourseStats.length
    );
    const avgGrade = Math.round(
      mockCourseStats.reduce((sum, course) => sum + course.averageGrade * course.totalStudents, 0) /
        mockCourseStats.reduce((sum, course) => sum + course.totalStudents, 0)
    );
    const atRiskCount = mockCourseStats.reduce((sum, course) => sum + course.atRisk, 0);

    return { totalStudents, avgAttendance, avgGrade, atRiskCount };
  }, []);

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

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Activity Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor student activity and course performance</p>
        </div>

        {/* Quick Actions */}
        <div className="flex justify-end gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm">
            <ClipboardCheck className="w-4 h-4" />
            <span className="text-sm font-medium">View Submissions</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm">
            <Megaphone className="w-4 h-4" />
            <span className="text-sm font-medium">Post Announcement</span>
          </button>
        </div>

        {/* Time Sensitive Section */}
        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          <div className="p-6 pb-4">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-orange-600" />
              <h2 className="text-xl font-semibold text-gray-900">Time Sensitive</h2>
            </div>
            {mockAttentionItems.length === 0 ? (
              <div className="py-8">
                <p className="text-gray-500 text-sm text-center">No items.</p>
              </div>
            ) : (
              <div className="space-y-3 min-h-[280px]">
                {paginatedAttentionItems.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-start justify-between gap-4 p-4 rounded-lg border ${
                      item.priority === 'high'
                        ? 'bg-red-50 border-red-200'
                        : 'bg-yellow-50 border-yellow-200'
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900">{item.courseName}</h3>
                      <p className="text-sm text-gray-700 mt-1">{item.description}</p>
                    </div>
                    {item.dueDate && (
                      <div className="text-sm text-gray-600 whitespace-nowrap font-medium">
                        {getTimeRemaining(item.dueDate)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pagination Footer */}
          {mockAttentionItems.length > 0 && (
            <div className="border-t border-gray-200 bg-gray-50 px-6 py-3 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing page {attentionPage} of {totalAttentionPages}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setAttentionPage((p) => Math.max(1, p - 1))}
                  disabled={attentionPage === 1}
                  className={`px-3 py-1 text-sm rounded border ${
                    attentionPage === 1
                      ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={() => setAttentionPage((p) => Math.min(totalAttentionPages, p + 1))}
                  disabled={attentionPage === totalAttentionPages}
                  className={`px-3 py-1 text-sm rounded border ${
                    attentionPage === totalAttentionPages
                      ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
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
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Course Overview</h2>

          {/* Aggregate Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{aggregateStats.totalStudents}</p>
                  <p className="text-sm text-gray-600">Total Students</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{aggregateStats.avgAttendance}%</p>
                  <p className="text-sm text-gray-600">Avg Attendance</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{aggregateStats.avgGrade}%</p>
                  <p className="text-sm text-gray-600">Avg Grade</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{aggregateStats.atRiskCount}</p>
                  <p className="text-sm text-gray-600">At-Risk Students</p>
                </div>
              </div>
            </div>
          </div>

          {/* Course Table */}
          <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Course</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Students</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Attendance</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Avg. Grade</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">At-Risk</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Submission Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {mockCourseStats.map((course) => (
                    <tr key={course.courseId} className="hover:bg-gray-50 transition-colors cursor-pointer">
                      <td className="py-4 px-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{course.courseName}</p>
                          <p className="text-xs text-gray-500">{course.courseCode}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-900">
                          {course.activeStudents}/{course.totalStudents}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-900">{course.attendance}%</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-900">{course.averageGrade}%</span>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                            course.atRisk === 0
                              ? 'bg-green-100 text-green-700'
                              : course.atRisk <= 3
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {course.atRisk}
                        </span>
                      </td>
                      <td className="py-4 px-4">
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
    </div>
  );
}
