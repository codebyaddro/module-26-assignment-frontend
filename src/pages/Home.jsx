import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Home() {
    const navigate = useNavigate();
    const [upcomingEvents, setUpcomingEvents] = useState([]);

    const categories = [
        "Fair",
        "Science Fest",
        "Sports Event",
        "Education Fest",
        "General Event",
        "Music Concert",
    ];

    const fetchUpcomingEvents = async () => {
        try {
            const res = await api.get("/events");
            setUpcomingEvents(res.data.slice(0, 3));
        } catch (error) {
            console.error("Failed to load events");
        }
    };

    useEffect(() => {
        fetchUpcomingEvents();
    }, []);

    return (
        <div className="lg:w-3/4 md:w-full mx-auto p-10 space-y-16">

            {/* 🔵 Banner */}
            <section>
                <h1 className="text-4xl font-bold mb-4">
                    Discover Events Near You
                </h1>
                <p className="text-gray-600">
                    Browse, save and create local events easily.
                </p>
            </section>

            {/* 🟢 Categories */}
            <section>
                <h2 className="text-2xl font-semibold mb-4">
                    Browse by Category
                </h2>

                <div className="flex flex-wrap gap-4">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => navigate("/events")}
                            className="px-4 py-2 border rounded hover:bg-black hover:text-white transition"
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {/* 🟣 Upcoming Events */}
            <section>
                <h2 className="text-2xl font-semibold mb-4">
                    Upcoming Events
                </h2>

                {upcomingEvents.length === 0 ? (
                    <p className="text-gray-500">No upcoming events</p>
                ) : (
                    <div className="grid md:grid-cols-3 gap-6">
                        {upcomingEvents.map((event) => (
                            <div
                                key={event._id}
                                className="border p-4 rounded shadow-sm"
                            >
                                <h3 className="font-bold text-lg">
                                    {event.title}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {event.date} • {event.time}
                                </p>
                                <p className="text-sm text-gray-600">
                                    {event.location}
                                </p>

                                <button
                                    onClick={() => navigate("/events")}
                                    className="mt-3 text-sm text-blue-600 hover:underline"
                                >
                                    View Details →
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
