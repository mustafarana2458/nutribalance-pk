import { CalendarPlus } from 'lucide-react'
import { bookingEmbedUrl, showBookingEmbed } from '@/data/site'

/**
 * Optional scheduling embed. Renders nothing until `showBookingEmbed` is true
 * and `bookingEmbedUrl` is set in src/data/site.ts.
 */
export function BookingCalendar() {
  if (!showBookingEmbed || !bookingEmbedUrl) return null

  return (
    <div className="overflow-hidden rounded-[2rem] border border-cream-200 bg-white shadow-soft">
      <div className="border-b border-cream-200 bg-sage-100 px-7 py-6">
        <h2 className="flex items-center gap-2.5 font-display text-xl font-semibold text-forest-700">
          <CalendarPlus className="h-5 w-5" aria-hidden />
          Pick your slot
        </h2>
        <p className="mt-2 text-base leading-relaxed sm:text-sm text-ink-600">
          Choose a time that suits you. You will receive a confirmation and the meeting link once
          your booking is complete.
        </p>
      </div>
      <iframe
        src={bookingEmbedUrl}
        title="Booking calendar"
        loading="lazy"
        className="h-[42rem] w-full border-0"
      />
    </div>
  )
}
