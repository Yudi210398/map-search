import { useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

import "@reach/combobox/styles.css";
import PlacesAutocomplete from "./PlacesAutocomplete";
function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyB37WjSx3gW4BjHGkGgbgpAgMhipXWr8oY",
    libraries: ["places"],
  });
  if (loadError) return <div>Error loading maps</div>;

  let datasMap = !isLoaded ? <div>Loading...</div> : <Map />;

  if (!isLoaded) return <div>Loading...</div>;
  return datasMap;
}

function Map() {
  const center = { lat: -6.2087634, lng: 106.845599 };

  const [selected, setSelected] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);

  const onMarkerDragEnd = (event) => {
    setMarkerPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };
  console.log(markerPosition);
  return (
    <>
      <div className="places-container">
        <PlacesAutocomplete
          setMarkerPosition={setMarkerPosition}
          setSelected={setSelected}
        />
      </div>
      <GoogleMap
        zoom={!selected ? 10 : 18}
        center={!selected ? center : selected}
        mapContainerClassName="map-container"
      >
        {selected && (
          <Marker onDragEnd={onMarkerDragEnd} position={selected} draggable />
        )}
      </GoogleMap>
    </>
  );
}

export default App;
