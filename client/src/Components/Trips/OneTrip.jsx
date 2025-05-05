import { Card } from 'primereact/card';
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { Tag } from 'primereact/tag';
import { Divider } from 'primereact/divider';
import { Galleria } from 'primereact/galleria';
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import 'primeicons/primeicons.css';
import Context from "../../context/Context"
import NewOrder from "../Orders/NewOrder.jsx"
import { useSelector } from 'react-redux';
import { InputNumber } from 'primereact/inputnumber';
const OneTrip = () => {
  const navigate = useNavigate();
  const { id } = useParams()
  const [trip, setTrip] = useState([]);
  const [value, setValue] = useState(10)
  // const context = useContext(Context);
  const token = useSelector(state => state.TokenSlice.token)
  useEffect(() => { getTrip() }, [])
  const getTrip = async () => {
    try {
      const res = await axios.get(`http://localhost:4300/api/trips/${id}`)
      if (res.status === 200) {
        setTrip(res.data);
      }
    } catch (e) {
      console.error(e)
    }
  }
  useEffect(() => {
    console.log(trip);
  }, [])
  const [visible, setVisible] = useState(false);
  if (!trip) return null;
  const responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '960px',
      numVisible: 4,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];
  // trip.images = trip.images || []; 
  // const images = trip.images.map((src) => ({
  //   source: src,
  //   thumbnail: src,
  //   alt: 'Gallery Image',
  //   title: 'Trip Image',
  // }));
  const images = []
  const itemTemplate = (item) => {
    return <img src={item.source} alt={item.alt} style={{ width: '100%', display: 'block', margin: '0 auto', border: '5px solid #000' }} />;
  };

  const thumbnailTemplate = (item) => {
    return (
      <img
        src={item.thumbnail}
        alt={item.alt}
        style={{
          display: 'block',
          width: '100px',
          height: '100px',
          margin: '10px',
          cursor: 'pointer',
        }}
      />
    );
  };
  const handleToTrips = () => {

    navigate(`/Trips/${trip.area}`); // שינוי URL עם state
  }

  const handleOrder = () => {
    if (token)
      navigate(`/Orders/newOrder/${trip._id}?num=${value}&type=trip`);
  }
  return (
    <div className="p-4">

      <h2 className="text-3xl font-bold text-center mb-4">{trip.location}</h2>

      <Card className="flex flex-column lg:flex-row shadow-2 p-4">

        <div className="flex flex-column lg:flex-row w-full lg:w-2/5 items-center">
          <Galleria
            value={images}
            responsiveOptions={responsiveOptions}
            numVisible={4}
            circular

            style={{ maxWidth: '60%', marginLeft: '20%' }}
            item={itemTemplate}
            thumbnail={thumbnailTemplate}
          />
        </div>


        <div className="w-full lg:w-3/5 p-6">
          <div className="text-lg mb-3">
            <strong>אזור:</strong> {trip.area}
          </div>
          <div className="text-lg mb-3">
            <strong>קהל יעד:</strong> {trip.targetAudience}
          </div>
          <div className="text-lg mb-4 flex items-center">
            <strong>מחיר:</strong>
            <Tag value={`₪${trip.price}`} style={{ background: "var(--orange-400)" }} className="ml-2 text-lg p-3" />
          </div>


          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <div className="font-semibold text-gray-600">תאריך סיום</div>
              <div className="text-xl text-gray-800">
                {new Date(trip.endDate).toLocaleDateString('he-IL', {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                })}
              </div>
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-600">תאריך התחלה</div>
              <div className="text-xl text-gray-800">
                {new Date(trip.startDate).toLocaleDateString('he-IL', {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                })}
              </div>
            </div>



          </div>
          <div className="flex-1">
            <InputNumber inputId="minmax-buttons" value={value} onValueChange={(e) => setValue(e.value)} mode="decimal" showButtons min={0} max={100} size="small" />
          </div>
          <Divider />


          <div className="flex gap-4 mt-5">
            <Button
              icon="pi pi-map-marker"
              label="הצג מיקום"
              className="p-button-outlined p-button-secondary"
              onClick={() => window.open(`https://www.google.com/maps?q=${encodeURIComponent(trip.location)}`, '_blank')}
            />

            <Button label="הזמן" rounded aria-label="Filter" onClick={handleOrder} />

          </div>
        </div>

      </Card>

      <div className="mt-6">
        <h3 className="text-2xl font-semibold text-center mb-4">פעילויות נוספות במלון</h3>

        <Carousel

          value={trip.activities || []}
          numVisible={3}
          numScroll={3}

          responsiveOptions={responsiveOptions}
          className="custom-carousel"
          circular
          autoplayInterval={3000}
          itemTemplate={(activity) => (
            <div className="border-1 surface-border border-round m-2 text-center py-4 px-3">
              <div className="mb-3 flex justify-content-center">
                <Image src="/images/0210005.jpg" zoomSrc="/images/0210005.jpg" alt="Activity" width="100" height="80" preview />
              </div>
              <h4 className="mb-1">{activity.name}</h4>
              <h6 className="text-sm">{activity.type}</h6>
              <div className="mt-3 flex gap-2 justify-content-center">
                <Button icon="pi pi-search" className="p-button-rounded p-button-outlined" />
                <Button icon="pi pi-star-fill" className="p-button-rounded p-button-warning" />
              </div>
            </div>
          )}
        />
      </div>
      <Button onClick={handleToTrips}> חזרה לנופשים</Button>
    </div>
  );
};

export default OneTrip;




