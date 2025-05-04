import React from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Tag } from 'primereact/tag';

const HomePage=()=> {
    const trips = [
        {
            title: "פריז הרומנטית",
            desc: "שבוע קסום בעיר האורות עם מדריך מקומי, מלון 4 כוכבים וסיורים מיוחדים.",
            image: "https://source.unsplash.com/500x300/?paris",
            label: "חם עכשיו",
        },
        {
            title: "שוויץ הקסומה",
            desc: "נופים עוצרי נשימה, רכבת הפנורמה ואגמים צלולים כמו זכוכית.",
            image: "https://source.unsplash.com/500x300/?switzerland",
            label: "מבצע",
        },
        {
            title: "יוון הקלאסית",
            desc: "שילוב של נוף, היסטוריה וחופים בוהקים בטיול נוח ומרתק.",
            image: "https://source.unsplash.com/500x300/?greece",
            label: "חדש!",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-500 to-teal-400 text-white py-20 px-6 text-center">
                <h1 className="text-5xl font-bold mb-4">המסע שלך מתחיל כאן</h1>
                <p className="text-xl mb-6">טיולים מאורגנים לנופשים בלתי נשכחים</p>
                <Button label="הזמן עכשיו" className="p-button-raised p-button-warning p-button-lg" />
            </div>

            {/* Divider */}
            <Divider align="center">
                <span className="p-tag p-tag-rounded p-tag-info">הטיולים שלנו</span>
            </Divider>

            {/* Trips Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 pb-10">
                {trips.map((trip, i) => (
                    <Card
                        key={i}
                        title={trip.title}
                        className="shadow-2 border-none rounded-3xl overflow-hidden"
                        header={<img alt={trip.title} src={trip.image} className="w-full h-48 object-cover rounded-t-3xl" />}
                        footer={
                            <div className="flex justify-between items-center">
                                <Button label="לפרטים" className="p-button-outlined p-button-secondary" />
                                <Tag value={trip.label} severity="info" />
                            </div>
                        }
                    >
                        <p className="m-0 text-gray-700">{trip.desc}</p>
                    </Card>
                ))}
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-4 text-center text-sm">
                © 2025 טיולים בעולם. כל הזכויות שמורות.
            </footer>
        </div>
    );
}
export default HomePage;
