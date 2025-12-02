import { useState } from 'react';
import { FileText, Upload, CheckCircle2, Clock } from 'lucide-react';
import type { UserRole } from '../App';
import { mockAssignments } from '../data/mockData';

interface AssignmentsProps {
  userRole: UserRole;
}

export function Assignments({ userRole }: AssignmentsProps) {
  const [filter, setFilter] = useState<'all' | 'pending' | 'submitted' | 'graded'>('all');
  const [selectedAssignment, setSelectedAssignment] = useState<string | null>(null);

  const filteredAssignments = filter === 'all'
    ? mockAssignments
    : mockAssignments.filter(a => a.status === filter);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1>Assignments</h1>
        <p className="text-gray-600 mt-2">
          {userRole === 'student'
            ? 'View and submit your assignments'
            : 'Review and grade student submissions'}
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        {['all', 'pending', 'submitted', 'graded'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              filter === f
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Assignments List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {filteredAssignments.map((assignment) => {
            const Icon = assignment.status === 'pending' ? Clock :
                        assignment.status === 'submitted' ? Upload :
                        CheckCircle2;
            const statusColor = assignment.status === 'pending' ? 'text-orange-600' :
                               assignment.status === 'submitted' ? 'text-blue-600' :
                               'text-green-600';
            const bgColor = assignment.status === 'pending' ? 'bg-orange-50' :
                           assignment.status === 'submitted' ? 'bg-blue-50' :
                           'bg-green-50';

            return (
              <button
                key={assignment.id}
                onClick={() => setSelectedAssignment(assignment.id)}
                className={`w-full bg-white rounded-xl border-2 p-6 text-left transition-all ${
                  selectedAssignment === assignment.id
                    ? 'border-blue-500 shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${statusColor}`} />
                  </div>
                  <div className="flex-1">
                    <h3>{assignment.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{assignment.course}</p>
                    
                    <div className="mt-3 flex items-center gap-4 text-sm">
                      <span className="text-gray-600">Due: {assignment.dueDate}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${bgColor} ${statusColor}`}>
                        {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-sm">
                      <span className="text-gray-600">Points: {assignment.points}</span>
                      {assignment.grade && (
                        <span className="text-green-600">Grade: {assignment.grade}/{assignment.points}</span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Assignment Detail */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-6 h-fit">
          {selectedAssignment ? (
            <>
              {(() => {
                const assignment = mockAssignments.find(a => a.id === selectedAssignment);
                if (!assignment) return null;

                return (
                  <>
                    <h2 className="mb-4">{assignment.title}</h2>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-600">Course</p>
                        <p className="mt-1">{assignment.course}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-600">Description</p>
                        <p className="text-sm mt-1 text-gray-700">
                          Complete the assignment following the guidelines provided in class.
                          Submit your work in PDF format. Late submissions will incur a penalty.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Due Date</p>
                          <p className="text-sm mt-1">{assignment.dueDate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Points</p>
                          <p className="text-sm mt-1">{assignment.points}</p>
                        </div>
                      </div>

                      {assignment.status === 'pending' && userRole === 'student' && (
                        <div className="pt-4 border-t border-gray-200">
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                            <p className="text-sm text-gray-600 mb-3">
                              Drag and drop your file here or click to browse
                            </p>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                              Choose File
                            </button>
                          </div>
                        </div>
                      )}

                      {assignment.status === 'submitted' && (
                        <div className="pt-4 border-t border-gray-200">
                          <div className="flex items-center gap-2 text-blue-600 mb-2">
                            <CheckCircle2 className="w-5 h-5" />
                            <span className="text-sm">Submitted</span>
                          </div>
                          <p className="text-sm text-gray-600">
                            Your submission is being reviewed by the instructor.
                          </p>
                        </div>
                      )}

                      {assignment.status === 'graded' && assignment.grade && (
                        <div className="pt-4 border-t border-gray-200">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-gray-600">Your Grade</span>
                            <span className="text-green-600">{assignment.grade}/{assignment.points}</span>
                          </div>
                          <div className="p-4 bg-green-50 rounded-lg">
                            <p className="text-sm text-gray-700">
                              Great work! Your submission demonstrated excellent understanding of the concepts.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                );
              })()}
            </>
          ) : (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">Select an assignment to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

