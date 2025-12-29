import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-hot-toast";

export default function Dashboard() {
    const [events, setEvents] = useState([]);
    const [title, setTitle] = useState("");

    // 🔹 Update states
    const [isEditing, setIsEditing] = useState(false);
    const [editEventId, setEditEventId] = useState(null);
    const [editTitle, setEditTitle] = useState("");

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
        } catch {
            toast.error("Failed to create event");
        }
    };

    const deleteEvent = async (id) => {
        try {
            await api.delete(`/events/${id}`);
            toast.success("Event deleted");
            fetchEvents();
        } catch {
            toast.error("Delete failed");
        }
    };

    // 🔹 Open edit modal
    const openEditModal = (event) => {
        setEditEventId(event._id);
        setEditTitle(event.title);
        setIsEditing(true);
    };

    // 🔹 Update event
    const updateEvent = async () => {
        if (!editTitle) {
            toast.error("Title required");
            return;
        }

        try {
            await api.put(`/events/${editEventId}`, {
                title: editTitle,
            });

            toast.success("Event updated ✅");
            setIsEditing(false);
            fetchEvents();
        } catch {
            toast.error("Update failed");
        }
    };

    return (
        <div className="p-10">
            <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

            {/* Create */}
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

            {/* List */}
            {events.map((event) => (
                <div
                    key={event._id}
                    className="border p-3 mb-2 flex justify-between items-center"
                >
                    <span>{event.title}</span>

                    <div className="space-x-2">
                        <button
                            onClick={() => openEditModal(event)}
                            className="border px-2 py-1 hover:bg-black hover:text-white"
                        >
                            Update
                        </button>

                        <button
                            onClick={() => deleteEvent(event._id)}
                            className="text-red-500 border border-red-500 hover:bg-red-500 hover:text-white px-2 py-1"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}

            {/* 🔥 Edit Modal */}
            {isEditing && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
                    <div className="bg-white p-6 rounded w-80">
                        <h3 className="text-lg font-bold mb-4">
                            Update Event
                        </h3>

                        <input
                            className="border p-2 w-full mb-4"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />

                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-2 border"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={updateEvent}
                                className="px-4 py-2 bg-black text-white"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
