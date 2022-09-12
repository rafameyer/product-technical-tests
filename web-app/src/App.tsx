import { Status, Wrapper } from "@googlemaps/react-wrapper";
import * as React from "react";
import Map from "./components/Map";
import Marker from "./components/Marker";
import { IBoutiques, ILocationFromData } from "./interfaces";
import {
  findLastClosestPoints,
  getAllPoints,
} from "./services/BoutiquesService";

const CONSTANTS = {
  DEFAULT: {
    LAT: 0,
    LNG: 0,
  },
  ZOOM: 4,
};

const render = (status: Status): React.ReactElement => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return <></>;
};

const App = () => {
  const [boutiques, setBoutiques] = React.useState([]);
  const [boutiquesClosest, setBoutiquesClosest] = React.useState<IBoutiques[]>(
    []
  );
  const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
    lat: CONSTANTS.DEFAULT.LAT,
    lng: CONSTANTS.DEFAULT.LNG,
  });

  const getData = React.useCallback(async () => {
    const resp = await getAllPoints();
    setBoutiques(resp);
  }, []);

  React.useEffect(() => {
    navigator?.geolocation?.watchPosition((position) => {
      setCenter({
        lat: position?.coords?.latitude,
        lng: position?.coords?.longitude,
      });
    });
  });

  React.useEffect(() => {
    getData();
  }, [getData]);

  React.useEffect(() => {
    const closestPoint = findLastClosestPoints(center, boutiques);
    setBoutiquesClosest(closestPoint);
  }, [center, boutiques]);

  return (
    <>
      <h1>Find nearby boutiques</h1>
      {!!boutiquesClosest ? (
        <Wrapper
          apiKey={process.env.REACT_APP_MAPS_JS_API_KEY ?? ""}
          render={render}
        >
          {(center?.lat && center?.lng) === 0 ? (
            <h3>Getting user location...</h3>
          ) : (
            <Map
              center={center}
              zoom={CONSTANTS.ZOOM}
              style={{ width: "100%", height: "900px" }}
            >
              {boutiquesClosest?.map(
                (item: { location: ILocationFromData }) => {
                  return (
                    <Marker
                      position={{
                        lat: item?.location?.lat,
                        lng: item?.location?.lon,
                      }}
                    />
                  );
                }
              )}
            </Map>
          )}
        </Wrapper>
      ) : (
        <h3>Loading data...</h3>
      )}
    </>
  );
};

export default App;
