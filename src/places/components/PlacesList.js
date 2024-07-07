import React, { useContext } from "react";

import "./PlacesList.css";
import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";
import Button from "../../shared/components/FormElements/Button";
import { AuthContext } from "../../shared/context/auth-context";

const PlacesList = (props) => {
  const auth = useContext(AuthContext);
  const loggedUserId = auth.userId;

  if (props.places.length === 0) {
    if (loggedUserId !== props.userId) {
      return (
        <div className="center">
          <h2>No places for this user.</h2>
        </div>
      );
    }
    return (
      <div className="place-list center">
        <Card className="empty-places-card">
          <h2>No places found! Maybe create one?</h2>
          <Button to="/places/new">Share Place</Button>
        </Card>
      </div>
    );
  }
  return (
    <ul className="place-list">
      {props.places.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
          onDelete={props.onDeletePlace}
        />
      ))}
    </ul>
  );
};

export default PlacesList;
