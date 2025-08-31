import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { FavouriteButton } from '../shared/FavouriteButton';
import { Map } from '../components/Map';
import {formatDate} from '../utils/DateFormat'

import './EventDetails.css';

export const EventDetails = () => {
  const { id } = useParams();
  const { data: event, loading, error, fetchEvents } = useFetch(`https://app.ticketmaster.com/discovery/v2/events/${id}.json`);
  const [location, setLocation] = useState({ lat: 51.505, lng: -0.09 });
  useEffect(() => {
    if (id) {
      fetchEvents({ id });
    }
  }, [id, fetchEvents]);
  useEffect(() => {
    if (event && event._embedded && event._embedded.venues && event._embedded.venues[0]) {
      const venue = event._embedded.venues[0];
      if (venue.location) {
        setLocation({
          lat: parseFloat(venue.location.latitude),
          lng: parseFloat(venue.location.longitude)
        });
      }
    }
  }, [event, setLocation]);
  if (loading) return <p>Loading event details...</p>;
  if (error) return <p>{error}</p>;
  if (!event) return null;

  return (
    <>
      <div className="event-details">
        <h2>{event.name}</h2>
        <p>{formatDate(event.dates?.start?.localDate)}</p>
        <p>{event._embedded?.venues?.[0]?.name}</p>
        <p>{event.info || 'No description available.'}</p>
        <FavouriteButton event={event} />
      </div>
      <div className='map-container'>
        <Map location={[location.lat, location.lng]} zoom={13} scrollWheelZoom={false} />
      </div>
    </>
  );
}
