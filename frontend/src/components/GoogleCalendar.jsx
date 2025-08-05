import React, { useEffect, useState } from "react";

const CLIENT_ID = "YOUR_CLIENT_ID.apps.googleusercontent.com";
const API_KEY = "YOUR_API_KEY";
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

const GoogleCalendar = () => {
  const [gapiLoaded, setGapiLoaded] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    script.onload = () => {
      window.gapi.load("client:auth2", async () => {
        await window.gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        });

        const auth = window.gapi.auth2.getAuthInstance();
        setSignedIn(auth.isSignedIn.get());
        setGapiLoaded(true);

        auth.isSignedIn.listen(setSignedIn);

        if (auth.isSignedIn.get()) {
          loadCalendarEvents();
        }
      });
    };
    document.body.appendChild(script);
  }, []);

  const signIn = () => {
    window.gapi.auth2.getAuthInstance().signIn();
  };

  const signOut = () => {
    window.gapi.auth2.getAuthInstance().signOut();
    setEvents([]);
  };

  const loadCalendarEvents = () => {
    window.gapi.client.calendar.events
      .list({
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 5,
        orderBy: "startTime",
      })
      .then((res) => {
        setEvents(res.result.items || []);
      })
      .catch((err) => console.error("Error loading events", err));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Google Calendar Integration</h2>
      {!gapiLoaded ? (
        <p>Loading Google API...</p>
      ) : !signedIn ? (
        <button
          onClick={signIn}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Sign in with Google
        </button>
      ) : (
        <>
          <button
            onClick={signOut}
            className="bg-red-500 text-white px-4 py-2 rounded mb-4"
          >
            Sign out
          </button>
          <h3 className="text-lg font-semibold mb-2">Upcoming Events</h3>
          {events.length === 0 ? (
            <p>No upcoming events.</p>
          ) : (
            <ul>
              {events.map((event) => (
                <li key={event.id} className="mb-2">
                  <strong>{event.summary}</strong> —{" "}
                  {new Date(event.start.dateTime || event.start.date).toLocaleString()}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default GoogleCalendar;
