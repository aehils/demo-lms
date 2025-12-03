import { useState, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Clock,
  MapPin,
  Users,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Zap,
  MessageSquare,
  ClipboardCheck,
  Eye
} from 'lucide-react';
import { mockSchedule, TimeSlot } from '../data/mockData';
import { format, addWeeks, startOfWeek, addDays, isSameDay } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from './ui/dropdown-menu';

export function Timetable() {
  // Simulating "today" as Tuesday, Dec 3, 2024 at 11:45 AM
  const getCurrentDate = () => new Date(2024, 11, 3, 11, 45); // Month is 0-indexed, so 11 = December
  const getCurrentTime = () => {
    const now = getCurrentDate();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  };

  // Generate semester weeks (Fall 2024: Aug 26 - Dec 13, 2024)
  const semesterWeeks = useMemo(() => {
    const semesterStart = new Date(2024, 7, 26); // Aug 26, 2024
    const weeks = [];
    for (let i = 0; i < 15; i++) {
      const weekStart = startOfWeek(addWeeks(semesterStart, i), { weekStartsOn: 1 });
      weeks.push({
        weekNumber: i + 1,
        startDate: weekStart,
        endDate: addDays(weekStart, 4),
      });
    }
    return weeks;
  }, []);

  const [currentWeekStart, setCurrentWeekStart] = useState(() =>
    startOfWeek(getCurrentDate(), { weekStartsOn: 1 }) // Start week on Monday
  );

  const isCurrentWeek = useMemo(() => {
    const today = getCurrentDate();
    const todayWeekStart = startOfWeek(today, { weekStartsOn: 1 });
    return isSameDay(currentWeekStart, todayWeekStart);
  }, [currentWeekStart]);

  const currentWeekNumber = useMemo(() => {
    const week = semesterWeeks.find(w => isSameDay(w.startDate, currentWeekStart));
    return week?.weekNumber;
  }, [currentWeekStart, semesterWeeks]);

  const weekDays = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => addDays(currentWeekStart, i));
  }, [currentWeekStart]);

  const goToPreviousWeek = () => {
    setCurrentWeekStart(prev => addWeeks(prev, -1));
  };

  const goToNextWeek = () => {
    setCurrentWeekStart(prev => addWeeks(prev, 1));
  };

  const goToToday = () => {
    setCurrentWeekStart(startOfWeek(getCurrentDate(), { weekStartsOn: 1 }));
  };

  const selectWeek = (weekStart: Date) => {
    setCurrentWeekStart(weekStart);
  };

  // Get today's classes
  const todaysClasses = useMemo(() => {
    const today = getCurrentDate();
    const todayDayOfWeek = today.getDay();
    const adjustedDayOfWeek = todayDayOfWeek === 0 ? 7 : todayDayOfWeek; // Convert Sunday (0) to 7

    return mockSchedule
      .filter(slot => slot.dayOfWeek === adjustedDayOfWeek)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  }, []);

  // Find next class
  const nextClass = useMemo(() => {
    const currentTime = getCurrentTime();
    return todaysClasses.find(cls => cls.startTime > currentTime);
  }, [todaysClasses]);

  // Time slots for the grid (8 AM to 6 PM)
  const timeSlots = useMemo(() => {
    const slots = [];
    for (let hour = 8; hour <= 18; hour++) {
      slots.push(`${String(hour).padStart(2, '0')}:00`);
    }
    return slots;
  }, []);

  const getClassPosition = (slot: TimeSlot) => {
    const [startHour, startMinute] = slot.startTime.split(':').map(Number);
    const [endHour, endMinute] = slot.endTime.split(':').map(Number);

    const startMinutes = (startHour - 8) * 60 + startMinute;
    const duration = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);

    const top = (startMinutes / 60) * 80; // 80px per hour
    const height = (duration / 60) * 80;

    return { top, height };
  };

  const formatTime = (time: string) => {
    const [hour, minute] = time.split(':').map(Number);
    const period = hour >= 12 ? 'pm' : 'am';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${String(minute).padStart(2, '0')}${period}`;
  };

  const getTimeUntil = (startTime: string) => {
    const now = getCurrentDate();
    const [hour, minute] = startTime.split(':').map(Number);
    const classTime = new Date(now);
    classTime.setHours(hour, minute, 0);

    const diff = classTime.getTime() - now.getTime();
    const minutes = Math.floor(diff / 60000);

    if (minutes < 60) {
      return `in ${minutes} mins`;
    }
    const hours = Math.floor(minutes / 60);
    return `in ${hours}h ${minutes % 60}m`;
  };

  const isClassHappening = (slot: TimeSlot) => {
    const currentTime = getCurrentTime();
    return currentTime >= slot.startTime && currentTime < slot.endTime;
  };

  const isPastClass = (slot: TimeSlot) => {
    const currentTime = getCurrentTime();
    return currentTime >= slot.endTime;
  };

  return (
    <div className="p-8">
      {/* Week Navigation on left, Title on right */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          {!isCurrentWeek && (
            <button
              onClick={goToToday}
              className="px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-brand-green-dark transition-colors flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Today
            </button>
          )}

          <button
            onClick={goToPreviousWeek}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 bg-white"
            aria-label="Previous week"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          {/* Clickable Week Selector with Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center gap-2 group">
                <span className="font-semibold text-gray-900">
                  Week of {format(currentWeekStart, 'MMM d')} - {format(addDays(currentWeekStart, 4), 'MMM d, yyyy')}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              <DropdownMenuLabel>Fall 2024 Semester</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-[300px] overflow-y-auto">
                {semesterWeeks.map((week) => {
                  const isSelected = isSameDay(week.startDate, currentWeekStart);
                  const isCurrent = isSameDay(week.startDate, startOfWeek(getCurrentDate(), { weekStartsOn: 1 }));

                  return (
                    <DropdownMenuItem
                      key={week.weekNumber}
                      onClick={() => selectWeek(week.startDate)}
                      className={`${isSelected ? 'bg-brand-green text-white hover:bg-brand-green-dark' : ''}`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-medium">Week {week.weekNumber}</span>
                        <span className="text-xs opacity-80">
                          {format(week.startDate, 'MMM d')} - {format(week.endDate, 'MMM d')}
                        </span>
                      </div>
                      {isCurrent && !isSelected && (
                        <span className="ml-2 text-xs text-brand-green font-semibold">Today</span>
                      )}
                    </DropdownMenuItem>
                  );
                })}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            onClick={goToNextWeek}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 bg-white"
            aria-label="Next week"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        <h1 className="text-4xl font-bold text-gray-900">Timetable</h1>
      </div>

      {/* Today's Classes Section - Only show if viewing current week */}
      {isCurrentWeek && todaysClasses.length > 0 && (
        <div className="mb-8 bg-gradient-to-r from-brand-green to-brand-green-light rounded-xl p-6 text-white">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
            <h2 className="text-xl font-bold">Today's Classes • {format(getCurrentDate(), 'EEEE, MMM d')}</h2>
          </div>

          {nextClass && (
            <div className="mb-4 p-3 bg-white/10 rounded-lg border-2 border-white/30">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-semibold">Next: {getTimeUntil(nextClass.startTime)}</span>
              </div>
              <div className="text-lg font-bold">{nextClass.courseCode} • {nextClass.courseName}</div>
            </div>
          )}

          <div className="space-y-3">
            {todaysClasses.map((slot) => {
              const isNow = isClassHappening(slot);
              const isPast = isPastClass(slot);

              return (
                <div
                  key={slot.id}
                  className={`bg-white rounded-lg p-4 transition-all ${
                    isNow ? 'ring-4 ring-white/50 shadow-xl' : 'shadow-md'
                  } ${isPast ? 'opacity-60' : ''}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {isNow && (
                          <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse">
                            LIVE NOW
                          </span>
                        )}
                        {isPast && (
                          <span className="px-2 py-0.5 bg-gray-400 text-white text-xs font-bold rounded-full">
                            COMPLETED
                          </span>
                        )}
                        <span className={`text-lg font-bold ${slot.color.replace('bg-', 'text-')}`}>
                          {slot.courseCode}
                        </span>
                        {slot.yearGroup && (
                          <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full">
                            {slot.yearGroup}
                          </span>
                        )}
                      </div>

                      <div className="text-sm text-gray-900 mb-2">{slot.courseName}</div>

                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{formatTime(slot.startTime)} - {formatTime(slot.endTime)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>Room {slot.room}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{slot.students} students</span>
                        </div>
                      </div>

                      {/* Prep Status Indicators */}
                      <div className="flex items-center gap-2 mt-2">
                        {slot.materialsUploaded ? (
                          <div className="flex items-center gap-1 text-green-600 text-xs">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Materials ready</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-amber-600 text-xs">
                            <Zap className="w-3 h-3" />
                            <span>No materials</span>
                          </div>
                        )}
                        {slot.hasUpcomingAssignment && (
                          <div className="flex items-center gap-1 text-orange-600 text-xs">
                            <AlertTriangle className="w-3 h-3" />
                            <span>Assignment due</span>
                          </div>
                        )}
                        {slot.newQuestions > 0 && (
                          <div className="flex items-center gap-1 text-blue-600 text-xs">
                            <MessageSquare className="w-3 h-3" />
                            <span>{slot.newQuestions} new questions</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex flex-col gap-2 ml-4">
                      {slot.type !== 'office_hours' && (
                        <>
                          <button className="px-3 py-1.5 bg-brand-green text-white text-xs font-medium rounded hover:bg-brand-green-dark transition-colors flex items-center gap-1">
                            <ClipboardCheck className="w-3 h-3" />
                            Take Attendance
                          </button>
                          <button className="px-3 py-1.5 bg-white text-brand-green border border-brand-green text-xs font-medium rounded hover:bg-gray-50 transition-colors flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            View Class
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Weekly Grid View */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[1000px]">
            {/* Header with days */}
            <div className="grid grid-cols-[80px_repeat(5,1fr)] border-b border-gray-200 bg-gray-50">
              <div className="p-4 font-semibold text-gray-700 text-sm">Time</div>
              {weekDays.map((day, index) => {
                const isToday = isCurrentWeek && isSameDay(day, getCurrentDate());
                return (
                  <div
                    key={index}
                    className={`p-4 text-center border-l border-gray-200 ${
                      isToday ? 'bg-brand-green text-white' : ''
                    }`}
                  >
                    <div className={`font-semibold ${isToday ? 'text-white' : 'text-gray-900'}`}>
                      {format(day, 'EEE')}
                    </div>
                    <div className={`text-2xl font-bold ${isToday ? 'text-white' : 'text-gray-900'}`}>
                      {format(day, 'd')}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Time grid */}
            <div className="relative">
              <div className="grid grid-cols-[80px_repeat(5,1fr)]">
                {/* Time column */}
                <div className="border-r border-gray-200">
                  {timeSlots.map((time) => (
                    <div
                      key={time}
                      className="h-20 px-3 py-2 text-sm text-gray-500 border-b border-gray-100"
                    >
                      {formatTime(time)}
                    </div>
                  ))}
                </div>

                {/* Day columns */}
                {[1, 2, 3, 4, 5].map((dayOfWeek) => (
                  <div key={dayOfWeek} className="relative border-l border-gray-200">
                    {/* Hour lines */}
                    {timeSlots.map((_, index) => (
                      <div
                        key={index}
                        className="h-20 border-b border-gray-100"
                      />
                    ))}

                    {/* Class blocks */}
                    {mockSchedule
                      .filter((slot) => slot.dayOfWeek === dayOfWeek)
                      .map((slot) => {
                        const { top, height } = getClassPosition(slot);
                        const isNow = isCurrentWeek &&
                                     dayOfWeek === (getCurrentDate().getDay() === 0 ? 7 : getCurrentDate().getDay()) &&
                                     isClassHappening(slot);

                        return (
                          <div
                            key={slot.id}
                            className={`absolute left-1 right-1 rounded-lg p-2 cursor-pointer transition-all hover:shadow-lg hover:z-10 ${
                              slot.color
                            } ${
                              slot.type === 'office_hours' ? 'opacity-70' : ''
                            } ${
                              isNow ? 'ring-4 ring-red-500 shadow-xl z-20' : 'shadow-md'
                            }`}
                            style={{ top: `${top}px`, height: `${height}px` }}
                          >
                            <div className="text-white h-full flex flex-col">
                              <div className="font-bold text-sm truncate">
                                {slot.courseCode || slot.courseName}
                              </div>
                              {slot.type !== 'office_hours' && (
                                <>
                                  <div className="text-xs opacity-90 truncate">
                                    {slot.courseName}
                                  </div>
                                  <div className="flex items-center gap-1 text-xs mt-1 opacity-90">
                                    <MapPin className="w-3 h-3" />
                                    <span className="truncate">Room {slot.room}</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-xs opacity-90">
                                    <Users className="w-3 h-3" />
                                    <span>{slot.students}</span>
                                  </div>
                                  {slot.yearGroup && (
                                    <div className="text-xs opacity-90 truncate">
                                      {slot.yearGroup}
                                    </div>
                                  )}
                                </>
                              )}
                              <div className="text-xs mt-auto opacity-90">
                                {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                              </div>

                              {/* Status indicators */}
                              {slot.type !== 'office_hours' && (
                                <div className="flex gap-1 mt-1">
                                  {!slot.materialsUploaded && (
                                    <div className="w-2 h-2 bg-amber-400 rounded-full" title="No materials" />
                                  )}
                                  {slot.hasUpcomingAssignment && (
                                    <div className="w-2 h-2 bg-orange-400 rounded-full" title="Assignment due" />
                                  )}
                                  {slot.newQuestions > 0 && (
                                    <div className="w-2 h-2 bg-blue-300 rounded-full" title={`${slot.newQuestions} questions`} />
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}

                    {/* Current time indicator - only show for today's column */}
                    {isCurrentWeek &&
                     dayOfWeek === (getCurrentDate().getDay() === 0 ? 7 : getCurrentDate().getDay()) && (
                      <div
                        className="absolute left-0 right-0 border-t-2 border-red-500 z-30"
                        style={{
                          top: `${(() => {
                            const now = getCurrentDate();
                            const minutes = (now.getHours() - 8) * 60 + now.getMinutes();
                            return (minutes / 60) * 80;
                          })()}px`,
                        }}
                      >
                        <div className="w-3 h-3 bg-red-500 rounded-full -mt-1.5 -ml-1.5" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Legend</h3>
        <div className="flex flex-wrap gap-4 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-amber-400 rounded-full" />
            <span>No materials uploaded</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-400 rounded-full" />
            <span>Assignment due soon</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-300 rounded-full" />
            <span>New student questions</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <span>Current time</span>
          </div>
        </div>
      </div>
    </div>
  );
}
