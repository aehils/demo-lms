import { Calendar } from 'lucide-react';

export function Timetable() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Timetable</h1>
        <p className="text-gray-600 mt-2">
          View your class schedule and upcoming sessions
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Timetable Coming Soon</h3>
            <p className="text-gray-600">
              Your class timetable will be available in a future update.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
