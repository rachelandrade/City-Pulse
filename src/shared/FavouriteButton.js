import { useContext } from 'react';
import { FavouritesContext } from '../context/FavouritesContext';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export const FavouriteButton = ({ event }) => {
    const { favourites, addFavourite, removeFavourite } = useContext(FavouritesContext);

    const isFavourite = favourites.some(e => e.id === event.id) || false;

    const toggleFavourite = () => {
        isFavourite ? removeFavourite(event.id) : addFavourite(event);
    };

    return (
        <IconButton onClick={toggleFavourite} color={isFavourite ? 'error' : 'default'}>
            {isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
    );
}
