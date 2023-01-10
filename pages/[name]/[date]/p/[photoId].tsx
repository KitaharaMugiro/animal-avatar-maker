import type { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Carousel from '../../../../components/Carousel'
import getResults from '../../../../utils/cachedImages'
import cloudinary from '../../../../utils/cloudinary'
import getBase64ImageUrl from '../../../../utils/generateBlurPlaceholder'
import { imageUrl } from '../../../../utils/imageUrl'
import type { ImageProps } from '../../../../utils/types'

const Home: NextPage = ({ currentPhoto }: { currentPhoto: ImageProps }) => {
  const router = useRouter()
  const { photoId, name, date } = router.query
  let index = Number(photoId)

  const currentPhotoUrl = imageUrl(currentPhoto.public_id, currentPhoto.format, "c_scale,w_2560")

  return (
    <>
      <Head>
        <title>{name}さんのアバター {date}</title>
        <meta property="og:image" content={currentPhotoUrl} />
        <meta name="twitter:image" content={currentPhotoUrl} />
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        <Carousel currentPhoto={currentPhoto} index={index} />
      </main>

    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async (context) => {
  const { photoId, name, date } = context.params
  const results = await getResults(name as string, date as string)

  let reducedResults: ImageProps[] = []
  let i = 0
  for (let result of results.resources) {
    reducedResults.push({
      id: i,
      height: result.height,
      width: result.width,
      public_id: result.public_id,
      format: result.format,
    })
    i++
  }

  const currentPhoto = reducedResults.find(
    (img) => img.id === Number(photoId)
  )
  currentPhoto.blurDataUrl = await getBase64ImageUrl(currentPhoto)

  return {
    props: {
      currentPhoto: currentPhoto,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
