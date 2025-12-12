import LeaderboardLiveClient from "../../../components/LeaderboardLiveClient";

export default async function LeaderboardPage({ params }) {
  const { eventId } = await params;
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Live Leaderboard</h1>
      <LeaderboardLiveClient eventId={eventId} />
    </div>
  );
}
