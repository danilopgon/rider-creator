import getAllVenues from "../services/getAllVenues";
import getAllBands from "../services/getAllBands";

const fetchRiderData = async () => {
  const venuesResponse = await getAllVenues();
  const bandsResponse = await getAllBands();

  const venues = venuesResponse.venues;
  const bands = bandsResponse;

  return { venues, bands };
};

export default fetchRiderData;
