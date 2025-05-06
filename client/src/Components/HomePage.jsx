import React from 'react';
import { Button } from 'primereact/button';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const HomePage=()=> {
    const navigate = useNavigate();
    const token = useSelector(state => state.TokenSlice.token)
    const moveTo = (page) => {
        if (token)
            navigate(`/${page}`)
        else
            navigate("/login")
    }
    const testimonies = [
        {
            name: 'שירה מ.',
            comment: 'האתר קל לשימוש והטיול היה מושלם! נחזור שוב!',
        },
        {
            name: 'יוסי ל.',
            comment: 'פשוט לתכנן, קל להזמין והצוות מדהים. מומלץ בחום!',
        },
        {
            name: 'נעמי ר.',
            comment: 'בחרתי אטרקציות לבד – יצא מושלם! ממש חוויה.',
        },
    ];

    return (
        <div className="home-container">
            <div className="home-content">
                <h1 className="home-title">תכננו את החוויה הבאה שלכם</h1>
                <p className="home-description">
                    הזמינו טיול מושלם או עצבו בעצמכם חוויה בלתי נשכחת
                </p>

                <div className="home-buttons">
                    <Button label="הזמן טיול" className="home-btn home-btn-blue" onClick={()=>moveTo("Trips/הכל")} />
                    <Button label="צור טיול בעצמך" className="home-btn home-btn-orange" onClick={()=>moveTo("Trips/ByUser")}/>
                </div> <Button label="הזמן נופש" className="home-btn home-btn-blue" onClick={()=>moveTo("Vacations/הכל")} />

                <div className="testimonies-section">
                    <h2 className="testimonies-title">מה אומרים עלינו?</h2>
                    <div className="testimonies-list">
                        {testimonies.map((t, idx) => (
                            <div key={idx} className="testimony-card">
                                <p className="testimony-comment">"{t.comment}"</p>
                                <p className="testimony-name">- {t.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
 

        </div>
    );
}
export default HomePage;
