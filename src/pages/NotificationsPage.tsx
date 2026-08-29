import React, { useState } from 'react';
import {
  Bell,
  CheckCircle2,
  CheckCheck,
  Briefcase,
  Sparkles,
  Award,
  Users,
  Trash2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NotificationsPage: React.FC = () => {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    navigateTo
  } = useApp();

  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredNotifs = notifications.filter((n) =>
    filter === 'all' ? true : !n.isRead
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-extrabold text-slate-900 flex items-center gap-2">
            <Bell className="w-6 h-6 text-indigo-600" />
            <span>Campus Notification Center</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time updates on gigs, mentorship requests, community posts, and rewards
          </p>
        </div>

        <button
          onClick={markAllNotificationsRead}
          className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition flex items-center gap-1.5"
        >
          <CheckCheck className="w-4 h-4" />
          <span>Mark All Read</span>
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-lg font-bold transition ${
            filter === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          All Notifications ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-3 py-1.5 rounded-lg font-bold transition ${
            filter === 'unread' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Unread Only ({notifications.filter((n) => !n.isRead).length})
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifs.map((notif) => (
          <div
            key={notif.id}
            onClick={() => {
              markNotificationRead(notif.id);
              if (notif.actionUrl) navigateTo(notif.actionUrl as any);
            }}
            className={`p-4 rounded-2xl border transition cursor-pointer flex items-start justify-between gap-4 ${
              !notif.isRead
                ? 'bg-indigo-50/50 border-indigo-200 hover:bg-indigo-50'
                : 'bg-white border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${
                  !notif.isRead ? 'bg-indigo-600 animate-pulse' : 'bg-slate-300'
                }`}
              ></div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">{notif.title}</h4>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{notif.message}</p>
                <div className="flex items-center gap-3 mt-2 text-[11px]">
                  <span className="text-slate-400">{notif.timestamp}</span>
                  {notif.actionText && (
                    <span className="font-bold text-indigo-600 hover:underline">
                      {notif.actionText} →
                    </span>
                  )}
                </div>
              </div>
            </div>

            {!notif.isRead && (
              <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full flex-shrink-0">
                New
              </span>
            )}
          </div>
        ))}

        {filteredNotifs.length === 0 && (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
            <Bell className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700">No notifications in this filter</p>
          </div>
        )}
      </div>

    </div>
  );
};
