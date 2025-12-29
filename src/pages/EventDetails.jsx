import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

export default function EventDetails() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        api.get(`/events`).then((res) => {
        const found = res.data.find((e) => e._id === id);
        setEvent(found);
        });
    }, [id]);

    if (!event) return toast("Loading...");

    return (
        <div className="lg:w-3/4 md:w-full mx-auto p-10">
            <h1 className="text-3xl font-bold">{event.title}</h1>
            <p className="text-gray-600 mt-2">
                {event.date} • {event.time}
            </p>
            
            <p className="mt-4">{event.description}</p>
            <p className="mt-2 font-semibold">
                Location: {event.location}
            </p>
        </div>
    );
}
