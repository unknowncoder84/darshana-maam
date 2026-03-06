'use client';

import { useState } from 'react';

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: 'court' | 'meeting' | 'deadline';
}

export default function CalendarWidget() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Court Hearing - Case #123',
      date: new Date(2026, 1, 28),
      type: 'court',
    },
    {
      id: '2',
      title: 'Client Meeting',
      date: new Date(2026, 2, 5),
      type: 'meeting',
    },
    {
      id: '3',
      title: 'Filing Deadline',
      date: new Date(2026, 2, 10),
      type: 'deadline',
    },
  ]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const hasEvent = (day: number) => {
    return events.some(event => 
      event.date.getDate() === day &&
      event.date.getMonth() === currentDate.getMonth() &&
      event.date.getFullYear() === currentDate.getFullYear()
    );
  };

  const getEventType = (day: number): 'court' | 'meeting' | 'deadline' | null => {
    const event = events.find(event => 
      event.date.getDate() === day &&
      event.date.getMonth() === currentDate.getMonth() &&
      event.date.getFullYear() === currentDate.getFullYear()
    );
    return event ? event.type : null;
  };

  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() &&
           currentDate.getMonth() === today.getMonth() &&
           currentDate.getFullYear() === today.getFullYear();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Calendar
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={previousMonth}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            aria-label="Previous month"
          >
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[140px] text-center">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <button
            onClick={nextMonth}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            aria-label="Next month"
          >
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map(day => (
          <div key={day} className="text-center text-xs font-semibold text-gray-600 dark:text-gray-400 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: startingDayOfWeek }).map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square" />
        ))}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const eventType = getEventType(day);
          const today = isToday(day);
          
          return (
            <div
              key={day}
              className={`aspect-square flex items-center justify-center text-sm rounded-lg relative ${
                today
                  ? 'bg-blue-600 text-white font-bold'
                  : hasEvent(day)
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-medium'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              } cursor-pointer transition-colors`}
            >
              {day}
              {eventType && (
                <span
                  className={`absolute bottom-1 w-1.5 h-1.5 rounded-full ${
                    eventType === 'court'
                      ? 'bg-red-500'
                      : eventType === 'meeting'
                      ? 'bg-blue-500'
                      : 'bg-amber-500'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Upcoming Events
        </h3>
        <div className="space-y-2">
          {events.slice(0, 3).map(event => (
            <div key={event.id} className="flex items-start text-sm">
              <span
                className={`w-2 h-2 rounded-full mt-1.5 mr-2 flex-shrink-0 ${
                  event.type === 'court'
                    ? 'bg-red-500'
                    : event.type === 'meeting'
                    ? 'bg-blue-500'
                    : 'bg-amber-500'
                }`}
              />
              <div className="flex-1">
                <p className="text-gray-900 dark:text-gray-100 font-medium">
                  {event.title}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-xs">
                  {event.date.toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-red-500 mr-1.5" />
            Court
          </div>
          <div className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-blue-500 mr-1.5" />
            Meeting
          </div>
          <div className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-amber-500 mr-1.5" />
            Deadline
          </div>
        </div>
      </div>
    </div>
  );
}
