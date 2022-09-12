import axios from "axios";
import { IBoutiques } from "../interfaces";

const getAllPoints = async () => {
  const URL = `${process.env.REACT_APP_GET_ALL_BOUTIQUES}`;
  try {
    const resp = await axios.get(URL);
    return resp?.data;
  } catch (error) {
    console.log(error);
  }
};

const findLastClosestPoints = (
  center: { lat: number; lng: number },
  boutiques: IBoutiques[]
): IBoutiques[] => {
  if ((center.lat && center.lng) === 0) return [];
  if (!boutiques?.length) return [];

  boutiques?.sort((a, b) => {
    return (
      Math.sqrt(
        a.location.lat * a.location.lat + a.location.lon * a.location.lon
      ) -
      Math.sqrt(
        b.location.lat * b.location.lat + b.location.lon * b.location.lon
      )
    );
  });

  return boutiques?.slice(0, 5) || [];
};

export { getAllPoints, findLastClosestPoints };
