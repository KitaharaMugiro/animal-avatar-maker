import cloudinary from './cloudinary'

let cachedResults

export default async function getResults(name: string, date: string) {
  if (!cachedResults) {
    const fetchedResults = await cloudinary.v2.search
      .expression(`folder:${name}/${date}/*`)
      .sort_by('public_id', 'desc')
      .max_results(400)
      .execute()

    cachedResults = fetchedResults
  }

  return cachedResults
}
