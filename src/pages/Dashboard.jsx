import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-hot-toast";

export default function Dashboard() {
    const [events, setEvents] = useState([]);
    const [title, setTitle] = useState("");

    // const date = new Date().toLocaleDateString();
    // const time = new Date().toLocaleTimeString();

    const fetchEvents = async () => {
        const res = await api.get("/events");
        setEvents(res.data);
    };

    useEffect(() => {
       fetchEvents();
    }, []);

    const createEvent = async () => {
        if (!title) {
            toast.error("Event title required");
            return;
        }

        try {
            await api.post("/events", {
                title,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
                location: "Rangpur",
                category: "General",
                description: "Sample event",
            });

            toast.success("Event created 🎉");
            setTitle("");
            fetchEvents();
        } catch (error) {
            toast.error("Failed to create event");
        }
    };

    const deleteEvent = async (id) => {
        try {
            await api.delete(`/events/${id}`);
            toast.success("Event deleted");
            fetchEvents();
        } catch (error) {
            toast.error("Delete failed");
        }
    };

    return (
        <div className="p-10">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

        <div className="mb-6">
            <input
            className="border p-2 mr-2"
            placeholder="Event title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
            <button
            onClick={createEvent}
            className="bg-black text-white px-4 py-2"
            >
            Create
            </button>
        </div>

        {events.map((event) => (
            <div
            key={event._id}
            className="border p-3 mb-2 flex justify-between"
            >
            <span>{event.title}</span>
            <button
                onClick={() => deleteEvent(event._id)}
                className="text-red-500 cursor-pointer border border-red-500 hover:bg-red-500 hover:text-white px-2 py-1"
            >
                Delete
            </button>
            </div>
        ))}
        </div>
    );
}
