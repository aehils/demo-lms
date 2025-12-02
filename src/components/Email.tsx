import { Mail } from 'lucide-react';

export function Email() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Email</h1>
        <p className="text-gray-600 mt-2">
          Communicate with instructors, students, and staff
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Email Coming Soon</h3>
            <p className="text-gray-600">
              Email functionality will be available in a future update.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
