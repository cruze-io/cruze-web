import moment from 'moment'

export const generateTimelineSeoTitle = (calendar) => {
  return 'Sync ' + calendar.name + ' Events to Your Calendar (Stanza | Powering Calendar Everywhere)'
}

export const generateTimelineSeoDescription = (calendar, event) => {
  const eventName = event ? event.name : ''
  const eventDescription = event ? event.description ? ' | Sync ' + event.name + ' to your calendar' + ' | ' + event.description : 'Sync ' + event.name + ' to your calendar' : 'Easily add ' + calendar.name + ' events to you calendar'
  const eventLocation = event ? ' | ' + event.location.address : 'Never miss another event'
  const eventDate = event ? ' | ' + moment(event.dates.start).format('YYYY DD MM') : ''
  const eventPrimaryLink = event ? ' | ' + event.ticketingPrimary : null
  const eventSecondaryLink = event ? ' | ' + event.ticketingPrimary : null
  const calendarName = calendar.name
  const calendarDescription = 'Sync ' + calendarName + ' events to your Google, Exchange, Ical, Outlook or Yahoo Calendar.'
  let eventInfo = event ? ' ' + eventDescription + eventLocation + eventDate + ' | ' : 'View all ' + calendar.name + ' upcoming and past events'
  const finalSeoDescription = calendarDescription + eventInfo
  return finalSeoDescription
}

export const generateTimelinesSearchTitle = () => {
	return 'Stanza - Add Popular Events To Your Calendar - Powering Calendar Everywhere'
}

export const generateTimelinesSearchDescription = () => {
	return 'Search through your favorite calendars, ranging from sports to cooking classes to Nike training programs. Sync these events to your calendar and get real time updates when any of the events change. No need to download an App and you even get real time notifications!'
}

export const SEO = {
  timelineSeoDescription: generateTimelineSeoDescription,
  timelineSeoTitle: generateTimelineSeoTitle,
  timelinesSearchSeoTitle: generateTimelinesSearchTitle,
  timelinesSearchSeoDescription: generateTimelinesSearchDescription,
}

export default SEO
