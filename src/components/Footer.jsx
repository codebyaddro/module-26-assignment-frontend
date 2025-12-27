export default function Footer() {
    const date = new Date().getFullYear();
    return (
        <footer className="bg-gray-100 text-center py-4">
        <p className="text-sm">© {date} Event Listing System. All rights reserved.</p>
        </footer>
    );
}
