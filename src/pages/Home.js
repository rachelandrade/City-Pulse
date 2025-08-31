import { useEffect, useState } from 'react';
import './Home.css';
import { TextField, Button, Box } from '@mui/material'
import { useFetch } from '../hooks/useFetch';
import { Link, useLocation } from 'react-router-dom';
import { FavouriteButton } from '../shared/FavouriteButton';
import { formatDate } from '../utils/DateFormat';

export const Home = () => {
  const { data, loading, error, fetchEvents } = useFetch(`https://app.ticketmaster.com/discovery/v2/events`);
  const [keyword, setKeyword] = useState(localStorage.getItem('keyword') || '');
  const [city, setCity] = useState(localStorage.getItem('city' || ''));
  const location = useLocation();

  useEffect(()=> {
    fetchEvents({keyword,city})
  },[location.pathname])

  const handleSearch = async () => {
    fetchEvents({ keyword, city })
    console.log('Fetching with:', keyword, city);
  };

  const onKeywordChange = (e) => {
    localStorage.setItem('keyword', e.target.value)
    setKeyword(e.target.value)
  }
  const onCityChange = (e) => {
    localStorage.setItem('city', e.target.value)
    setCity(e.target.value)
  }
 

  return (
    <div className="home-container">
      <h2>Search Events</h2>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        gap={2}
        alignItems="center"
        justifyContent="center"
        mb={3}
      >
        <TextField
          label="Keyword"
          variant="outlined"
          value={keyword}
          onChange={onKeywordChange}
          fullWidth
        />
        <TextField
          label="City"
          variant="outlined"
          value={city}
          onChange={onCityChange}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{ minWidth: 120, minHeight: 55 }}
        >
          Search
        </Button>
      </Box>
      {loading && <p>Loading events...</p>}
      {error && <p className="error">{error}</p>}

      <div className="event-list">
        {data && data.map(event => {
          console.log(event)
          return (
            <div key={event.id} className="event-card">
              <h3>{event?.name || 'No Name'}</h3>
              <p>{formatDate(event.dates?.start?.localDate)}</p>
              <p>{event._embedded.venues[0]?.city?.name}</p>
              <Link to={`/event/${event.id}`}>View Details</Link>
              <FavouriteButton event={event} />
            </div>
          )
        })}
      </div>
    </div>
  );
}
