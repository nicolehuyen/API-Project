import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { getCurrentUserSpotsThunk } from "../../store/spots";
import './CurrentSpots.css'

function CurrentSpots() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const spotsObj = useSelector((state) => state.spots)
    const spots = Object.values(spotsObj)

    useEffect(() => {
        if(!sessionUser) navigate('/')
        dispatch(getCurrentUserSpotsThunk())
    }, [dispatch, sessionUser, navigate])

    return (
        <>
            {sessionUser && (
                <div className="section">
                    <div className="manage-spots-container">
                        <h1 className="manage-title">Manage Your Spots</h1>
                        <button onClick={() => navigate('/spots/new')}>Create a New Spot</button>
                    </div>
                    <div className="spots-container">
                        {spots.map((spot) => (
                            <div key={spot.id}>
                                <div className='spot-tile' onClick={() => navigate(`/spots/${spot.id}`)}>
                                    <img className='spot-image' src={spot.previewImage} alt='preview' />
                                    <div className="text-container">
                                        <div className="spot-left">
                                            <span>{`${spot.city}, ${spot.state}`}</span>
                                            <p className="spot-price"><span style={{fontWeight: 'bold'}}>{`$${Number(spot.price).toFixed(2)}`}</span> night</p>
                                        </div>
                                        <div className="spot-right">
                                            <i className="fas fa-star">{` ${spot.avgRating ? spot.avgRating.toFixed(1) : 'New'}`}</i>
                                        </div>
                                    </div>
                                </div>
                                <div className="manage-buttons">
                                    <button onClick={() => navigate(`/spots/${spot.id}/edit`)}>Update</button>
                                    <button>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

export default CurrentSpots;
