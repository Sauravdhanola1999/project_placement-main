import EventDetails from '../../../components/EventDetails';

export default async function EventPage({ params }) {
  const { id } = await params; 
  return <EventDetails eventId={id} />;
}
