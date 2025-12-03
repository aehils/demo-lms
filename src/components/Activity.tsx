import { useState, useMemo } from 'react';
import { AlertCircle, Clock, Users, FileText, MessageCircle, CheckCircle, Megaphone, ClipboardCheck, TrendingUp, AlertTriangle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import {
  mockActivityFeed,
  mockAttentionItems,
  mockCourseStats,
  type ActivityType,
} from '../data/mockData';

type ActivityFilter = 'all' | 'time_sensitive' | 'submission' | 'late_submission' | 'access' | 'comment';

type SortField = 'attendance' | 'averageGrade' | 'atRisk' | 'submissionRate';

export function Activity() {
  const [activityFilter, setActivityFilter] = useState<ActivityFilter>('all');
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [sortField, setSortField] = useState<SortField>('attendance');

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
    if (activityFilter === 'all') {
      // Combine regular activities and time sensitive items for "All" filter
      // Add synthetic timestamps to time sensitive items so they can be sorted
      const timeSensitiveWithTimestamps = mockAttentionItems.map((item, index) => ({
        ...item,
        timestamp: new Date(Date.now() - (index * 30 * 60 * 1000)), // Stagger by 30 minutes
      }));

      // Combine and sort by timestamp
      const combined = [...timeSensitiveWithTimestamps, ...mockActivityFeed];
      return combined.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    }
    if (activityFilter === 'time_sensitive') {
      // Return only attention items when time_sensitive filter is selected
      return mockAttentionItems;
    }
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

  // Sort and filter courses
  const sortedCourses = useMemo(() => {
    return [...mockCourseStats].sort((a, b) => a[sortField] - b[sortField]);
  }, [sortField]);

  const displayedCourses = showAllCourses ? sortedCourses : sortedCourses.slice(0, 3);

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

        {/* Course Overview Section */}
        <div className="space-y-6">
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
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">My Classes</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Headcount</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      <button
                        onClick={() => setSortField('attendance')}
                        className={`flex items-center gap-1 hover:text-brand-green transition-colors ${
                          sortField === 'attendance' ? 'text-brand-green font-bold' : 'text-gray-700'
                        }`}
                      >
                        Attendance
                        <span className={sortField === 'attendance' ? 'opacity-100' : 'opacity-30'}>↑</span>
                      </button>
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      <button
                        onClick={() => setSortField('averageGrade')}
                        className={`flex items-center gap-1 hover:text-brand-green transition-colors ${
                          sortField === 'averageGrade' ? 'text-brand-green font-bold' : 'text-gray-700'
                        }`}
                      >
                        Avg. Grade
                        <span className={sortField === 'averageGrade' ? 'opacity-100' : 'opacity-30'}>↑</span>
                      </button>
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      <button
                        onClick={() => setSortField('atRisk')}
                        className={`flex items-center gap-1 hover:text-brand-green transition-colors ${
                          sortField === 'atRisk' ? 'text-brand-green font-bold' : 'text-gray-700'
                        }`}
                      >
                        At-Risk
                        <span className={sortField === 'atRisk' ? 'opacity-100' : 'opacity-30'}>↑</span>
                      </button>
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      <button
                        onClick={() => setSortField('submissionRate')}
                        className={`flex items-center gap-1 hover:text-brand-green transition-colors ${
                          sortField === 'submissionRate' ? 'text-brand-green font-bold' : 'text-gray-700'
                        }`}
                      >
                        Submission Rate
                        <span className={sortField === 'submissionRate' ? 'opacity-100' : 'opacity-30'}>↑</span>
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {displayedCourses.map((course) => (
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
                        <span className="text-sm font-medium text-orange-600">
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
            {sortedCourses.length > 3 && (
              !showAllCourses ? (
                <button
                  onClick={() => setShowAllCourses(true)}
                  className="w-full border-t border-gray-200 bg-gray-50 hover:bg-gray-100 px-6 py-3 text-sm text-brand-green hover:text-brand-green-light font-medium transition-colors cursor-pointer"
                >
                  View More
                </button>
              ) : (
                <button
                  onClick={() => setShowAllCourses(false)}
                  className="w-full border-t border-gray-200 bg-gray-50 hover:bg-gray-100 px-6 py-3 text-xs text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                >
                  Show Less
                </button>
              )
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
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors border ${
                  activityFilter === 'all'
                    ? 'bg-brand-green/10 text-brand-green-dark font-medium border-brand-green'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-transparent'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActivityFilter('time_sensitive')}
                className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg transition-colors border ${
                  activityFilter === 'time_sensitive'
                    ? 'bg-brand-green/10 text-brand-green-dark font-medium border-brand-green'
                    : 'bg-orange-100 text-orange-700 hover:bg-orange-200 border-orange-300'
                }`}
              >
                <Clock className="w-4 h-4 text-orange-600" />
                Time Sensitive
              </button>
              <button
                onClick={() => setActivityFilter('submission')}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors border ${
                  activityFilter === 'submission'
                    ? 'bg-brand-green/10 text-brand-green-dark font-medium border-brand-green'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-transparent'
                }`}
              >
                Submissions
              </button>
              <button
                onClick={() => setActivityFilter('access')}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors border ${
                  activityFilter === 'access'
                    ? 'bg-brand-green/10 text-brand-green-dark font-medium border-brand-green'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-transparent'
                }`}
              >
                Access
              </button>
              <button
                onClick={() => setActivityFilter('late_submission')}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors border ${
                  activityFilter === 'late_submission'
                    ? 'bg-brand-green/10 text-brand-green-dark font-medium border-brand-green'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-transparent'
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
              filteredActivities.slice(0, 10).map((activity) => {
                // Check if this is a time sensitive item (has priority field)
                const isTimeSensitive = 'priority' in activity;

                if (isTimeSensitive) {
                  return (
                    <div
                      key={activity.id}
                      className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                        activity.priority === 'high'
                          ? 'bg-red-50/50 hover:bg-red-50'
                          : 'bg-yellow-50/50 hover:bg-yellow-50'
                      }`}
                    >
                      <div className="mt-0.5">
                        <Clock className="w-4 h-4 text-orange-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">
                          <span className="font-medium">{activity.courseName}:</span> {activity.description}
                        </p>
                      </div>
                      {activity.dueDate && (
                        <span className="text-xs text-gray-600 whitespace-nowrap font-medium">
                          {getTimeRemaining(activity.dueDate)}
                        </span>
                      )}
                    </div>
                  );
                }

                return (
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
                );
              })
            )}
          </div>

          {filteredActivities.length > 10 && (
            <button className="w-full mt-4 py-2 text-sm text-brand-green hover:text-brand-green-light font-medium">
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
