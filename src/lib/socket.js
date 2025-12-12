'use client';
import { io } from "socket.io-client";
import Cookies from "js-cookie";

let socket = null;

export function connectSocket() {
  if (socket) return socket;
  const token = Cookies.get("token");
  socket = io(process.env.NEXT_PUBLIC_WS_BASE || "http://localhost:5000", {
    auth: { token },
  });
  return socket;
}

export function joinLeaderboard(eventId) {
  const s = connectSocket();
  if (!eventId) return;
  s.emit("joinLeaderboard", { eventId });
}

export function leaveLeaderboard(eventId) {
  const s = connectSocket();
  if (!eventId) return;
  s.emit("leaveLeaderboard", { eventId });
}
