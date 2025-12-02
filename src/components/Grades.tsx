import { TrendingUp, Award, BookOpen } from 'lucide-react';
import type { UserRole } from '../App';
import { mockCourses, mockAssignments } from '../data/mockData';

interface GradesProps {
  userRole: UserRole;
}

export function Grades({ userRole }: GradesProps) {
  const gradedAssignments = mockAssignments.filter(a => a.status === 'graded' && a.grade);
  
  const courseGrades = mockCourses.map(course => {
    const courseAssignments = gradedAssignments.filter(a => a.course === course.name);
    const totalPoints = courseAssignments.reduce((sum, a) => sum + (a.points || 0), 0);
    const earnedPoints = courseAssignments.reduce((sum, a) => sum + (a.grade || 0), 0);
    const percentage = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
    
    return {
      ...course,
      percentage,
      letterGrade: percentage >= 90 ? 'A' : percentage >= 80 ? 'B' : percentage >= 70 ? 'C' : percentage >= 60 ? 'D' : 'F'
    };
  });

  const overallGPA = (courseGrades.reduce((sum, c) => sum + c.percentage, 0) / courseGrades.length / 25).toFixed(2);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1>Grades</h1>
        <p className="text-gray-600 mt-2">
          {userRole === 'student'
            ? 'Track your academic performance across all courses'
            : 'View student grades and performance analytics'}
        </p>
      </div>

      {userRole === 'student' && (
        <>
          {/* GPA Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Overall GPA</p>
                  <p className="mt-2">{overallGPA}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-purple-700" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Current Avg.</p>
                  <p className="mt-2">87%</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-700" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Credits Earned</p>
                  <p className="mt-2">45</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-700" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Class Rank</p>
                  <p className="mt-2">12/156</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-orange-700" />
                </div>
              </div>
            </div>
          </div>

          {/* Course Grades */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h2 className="mb-4">Course Grades</h2>
            <div className="space-y-4">
              {courseGrades.map((course) => (
                <div key={course.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3>{course.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{course.code}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-semibold text-gray-900">{course.letterGrade}</div>
                      <p className="text-sm text-gray-600">{course.percentage}%</p>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        course.percentage >= 90 ? 'bg-green-600' :
                        course.percentage >= 80 ? 'bg-blue-600' :
                        course.percentage >= 70 ? 'bg-yellow-600' :
                        'bg-red-600'
                      }`}
                      style={{ width: `${course.percentage}%` }}
                    />
                  </div>

                  <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
                    <span>Instructor: {course.instructor}</span>
                    <span>Credits: 3</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Assignment Grades */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="mb-4">Recent Graded Assignments</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Assignment</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Course</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Due Date</th>
                    <th className="text-right py-3 px-4 text-sm text-gray-600">Score</th>
                    <th className="text-right py-3 px-4 text-sm text-gray-600">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {gradedAssignments.map((assignment) => {
                    const percentage = ((assignment.grade || 0) / assignment.points) * 100;
                    return (
                      <tr key={assignment.id} className="border-b border-gray-100 last:border-0">
                        <td className="py-3 px-4">{assignment.title}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{assignment.course}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{assignment.dueDate}</td>
                        <td className="py-3 px-4 text-right text-sm">
                          {assignment.grade}/{assignment.points}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            percentage >= 90 ? 'bg-green-100 text-green-700' :
                            percentage >= 80 ? 'bg-blue-100 text-blue-700' :
                            percentage >= 70 ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {percentage >= 90 ? 'A' : percentage >= 80 ? 'B' : percentage >= 70 ? 'C' : 'D'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {userRole === 'instructor' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="mb-4">Student Performance Overview</h2>
          <div className="space-y-4">
            {mockCourses.slice(0, 3).map((course) => (
              <div key={course.id} className="p-4 border border-gray-200 rounded-lg">
                <h3 className="mb-3">{course.name}</h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Class Average</p>
                    <p className="mt-1">85%</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Submissions</p>
                    <p className="mt-1">38/{course.students}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Pending</p>
                    <p className="mt-1 text-orange-600">8</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

