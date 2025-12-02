import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';

interface EventCardProps {
  event: {
    _id: string;
    title: string;
    startDate: string;
    venue: string;
    poojas: any[];
    totalAttendees: number;
    maxAttendees: number;
    status: string;
  };
}

export default function EventCard({ event }: EventCardProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 h-32 flex items-center justify-center">
        <span className="text-4xl">🏛️</span>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800">{event.title}</h3>
        <p className="text-gray-600 text-sm">{event.venue}</p>

        <div className="mt-2 text-sm text-gray-700">
          <p>📅 {format(new Date(event.startDate), 'MMM dd, yyyy')}</p>
          <p>🕉️ {event.poojas.length} {t('common.poojas')}</p>
          <p>👥 {event.totalAttendees}/{event.maxAttendees} {t('common.attendees')}</p>
        </div>

        <div className="mt-4 flex gap-2">
          <Link
            to={`/events/${event._id}`}
            className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 text-center"
          >
            {t('common.viewDetails')}
          </Link>
          <button className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600">
            {t('common.book')}
          </button>
        </div>
      </div>
    </div>
  );
}