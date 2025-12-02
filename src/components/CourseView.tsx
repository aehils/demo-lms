import { useState } from 'react';
import { BookOpen, Users, FileText, Video, File, CheckCircle2, Circle } from 'lucide-react';
import type { UserRole } from '../App';
import { mockCourses, mockModules } from '../data/mockData';

interface CourseViewProps {
  courseId: string | null;
  userRole: UserRole;
}

export function CourseView({ courseId, userRole }: CourseViewProps) {
  const [activeTab, setActiveTab] = useState<'modules' | 'assignments' | 'people'>('modules');
  const course = mockCourses.find(c => c.id === courseId);

  if (!course) {
    return (
      <div className="p-8">
        <p className="text-gray-600">Course not found</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Course Header */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
        <div className={`h-48 ${course.color} flex items-center justify-center`}>
          <BookOpen className="w-20 h-20 text-white" />
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h1>{course.name}</h1>
              <p className="text-gray-600 mt-2">{course.code} • {course.semester}</p>
              <p className="text-gray-700 mt-3">{course.description}</p>
            </div>
            {userRole === 'student' && (
              <div className="text-right">
                <p className="text-sm text-gray-600">Your Progress</p>
                <p className="text-blue-600 mt-1">{course.progress}%</p>
              </div>
            )}
          </div>
          
          <div className="mt-6 flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-500" />
              <span className="text-gray-700">{course.students} students</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-gray-500" />
              <span className="text-gray-700">Instructor: {course.instructor}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('modules')}
          className={`px-4 py-2 transition-colors ${
            activeTab === 'modules'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Course Modules
        </button>
        <button
          onClick={() => setActiveTab('assignments')}
          className={`px-4 py-2 transition-colors ${
            activeTab === 'assignments'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Assignments
        </button>
        <button
          onClick={() => setActiveTab('people')}
          className={`px-4 py-2 transition-colors ${
            activeTab === 'people'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          People
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'modules' && (
        <div className="space-y-4">
          {mockModules.map((module) => (
            <div key={module.id} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2>{module.title}</h2>
                  <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                </div>
                {userRole === 'student' && (
                  <span className="text-sm text-gray-600">{module.progress}% complete</span>
                )}
              </div>
              
              <div className="space-y-2">
                {module.lessons.map((lesson) => {
                  const Icon = lesson.type === 'video' ? Video : lesson.type === 'reading' ? File : FileText;
                  const StatusIcon = lesson.completed ? CheckCircle2 : Circle;
                  
                  return (
                    <button
                      key={lesson.id}
                      className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                    >
                      <Icon className="w-5 h-5 text-gray-400" />
                      <span className="flex-1 text-sm">{lesson.title}</span>
                      <span className="text-xs text-gray-500">{lesson.duration}</span>
                      {userRole === 'student' && (
                        <StatusIcon className={`w-5 h-5 ${
                          lesson.completed ? 'text-green-600' : 'text-gray-300'
                        }`} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'assignments' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="mb-4">Course Assignments</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm">Assignment {i}: Research Paper</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Write a 5-page research paper on the given topic
                    </p>
                  </div>
                  <span className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                    Due in {i + 2} days
                  </span>
                </div>
                <div className="mt-3 flex gap-4 text-xs text-gray-600">
                  <span>Posted: Dec {i}, 2024</span>
                  <span>Due: Dec {i + 5}, 2024</span>
                  <span>Points: {20 * i}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'people' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="mb-4">Course Participants</h2>
          <div className="space-y-3">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
                  {course.instructor.charAt(0)}
                </div>
                <div>
                  <p>{course.instructor}</p>
                  <p className="text-sm text-gray-600">Instructor</p>
                </div>
              </div>
            </div>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white">
                    S{i + 1}
                  </div>
                  <div>
                    <p className="text-sm">Student {i + 1}</p>
                    <p className="text-xs text-gray-600">student{i + 1}@university.edu</p>
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

