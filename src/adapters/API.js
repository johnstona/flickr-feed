const CORS_ANYWHERE = "https://cors-anywhere.herokuapp.com/"
const BASE_URL = `${CORS_ANYWHERE}https://api.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=true&safe_search=1`

const getPictures = async () => {
  const res = await fetch(BASE_URL)
  return res.json(res)
}

const getTaggedPics = async (tag) => {
  const res = await fetch(`${BASE_URL}&tags=${tag}`)
  return res.json(res)
}

export default {
  getPictures,
  getTaggedPics
}