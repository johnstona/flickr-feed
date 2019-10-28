const CORS_ANYWHERE = "https://cors-anywhere.herokuapp.com/"
const BASE_URL = `${CORS_ANYWHERE}https://api.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=true&safe_search=3&tags=safe`

const getPictures = async () => {
  const res = await fetch(BASE_URL)
  return res.json(res)
}

export default {
  getPictures
}