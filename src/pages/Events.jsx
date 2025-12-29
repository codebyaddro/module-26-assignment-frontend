import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function Events() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        api.get("/events").then((res) => {
        setEvents(res.data);
        });
    }, []);

    return (
        <div className="lg:w-3/4 md:w-full mx-auto p-10">
            <h2 className="text-3xl font-bold mb-6">All Events</h2>

            <div className="grid md:grid-cols-3 gap-6">
                {events.map((event) => (
                <div
                    key={event._id}
                    className="border rounded-lg p-4 shadow"
                >
                    <h3 className="text-xl font-semibold">{event.title}</h3>
                    <p className="text-sm text-gray-500">
                    {event.date} • {event.location}
                    </p>

                    <Link
                        to={`/events/${event._id}`}
                        className="inline-block mt-3 text-[16px] text-gray-600 font-medium hover:underline hover:decoration-2"
                    >
                        View Details <i class="fa-solid fa-arrow-right text-sm"></i>
                    </Link>
                </div>
                ))}
            </div>
        </div>
    );
}
