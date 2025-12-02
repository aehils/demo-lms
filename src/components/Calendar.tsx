import { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import type { UserRole } from '../App';

interface CalendarProps {
  userRole: UserRole;
}

export function Calendar({ }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 11, 1)); // December 2024

  const events = [
    { date: 3, title: 'Computer Science Assignment Due', color: 'bg-blue-100 text-blue-700', time: '11:59 PM' },
    { date: 5, title: 'Mathematics Quiz', color: 'bg-purple-100 text-purple-700', time: '2:00 PM' },
    { date: 10, title: 'Physics Lab Report Due', color: 'bg-green-100 text-green-700', time: '5:00 PM' },
    { date: 15, title: 'Literature Essay Submission', color: 'bg-orange-100 text-orange-700', time: '11:59 PM' },
    { date: 18, title: 'Final Exam - Data Structures', color: 'bg-red-100 text-red-700', time: '9:00 AM' },
    { date: 20, title: 'Final Exam - Calculus', color: 'bg-red-100 text-red-700', time: '1:00 PM' },
  ];

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getDayEvents = (day: number) => {
    return events.filter(event => event.date === day);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1>Academic Calendar</h1>
        <p className="text-gray-600 mt-2">View important dates and deadlines</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
            <div className="flex gap-2">
              <button
                onClick={previousMonth}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-sm text-gray-600 py-2">
                {day}
              </div>
            ))}
            
            {Array.from({ length: firstDayOfMonth }).map((_, index) => (
              <div key={`empty-${index}`} className="aspect-square" />
            ))}
            
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;
              const dayEvents = getDayEvents(day);
              const isToday = day === 1;

              return (
                <div
                  key={day}
                  className={`aspect-square p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors ${
                    isToday ? 'bg-blue-50 border-blue-300' : ''
                  }`}
                >
                  <div className={`text-sm mb-1 ${isToday ? 'text-blue-600' : ''}`}>
                    {day}
                  </div>
                  {dayEvents.length > 0 && (
                    <div className="space-y-1">
                      {dayEvents.slice(0, 2).map((event, i) => (
                        <div
                          key={i}
                          className={`text-xs px-1 py-0.5 rounded ${event.color} truncate`}
                        >
                          {event.title.split(' ')[0]}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-xs text-gray-600">+{dayEvents.length - 2} more</div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="mb-4">Upcoming Events</h2>
          <div className="space-y-4">
            {events.slice(0, 6).map((event, index) => (
              <div key={index} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className={`inline-block px-2 py-1 rounded text-xs mb-2 ${event.color}`}>
                  Dec {event.date}, 2024
                </div>
                <h3 className="text-sm mb-1">{event.title}</h3>
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Clock className="w-3 h-3" />
                  <span>{event.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

