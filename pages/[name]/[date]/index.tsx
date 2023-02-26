import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { getImages } from "../../../utils/getImages";
import MyHeader from "../../../components/common/MyHeader";
import PhotoGallary from "../../../components/gallary/PhotoGallary";
import { imageUrl } from "../../../utils/imageUrl";
import { CloudinaryImageProps } from "../../../utils/types";

const Home: NextPage = ({
  images,
  inputImages,
}: {
  images: CloudinaryImageProps[];
  inputImages: CloudinaryImageProps[];
}) => {
  const router = useRouter();
  const { name } = router.query;

  const onClickKifu = () => {
    const kihuUrl = `https://buy.stripe.com/6oE7vY8i80x81TG8wy?client_reference_id=${name}`;
    window.open(kihuUrl, "_blank");
  };

  const title = `${name}さんのギャラリー | アニマルアバターメーカー`;
  let pickedImage = undefined;
  if (images.length > 0) {
    pickedImage = imageUrl(images[0].public_id, images[0].format, false, false);
  }
  return (
    <>
      <Head>
        <title>{title}</title>
        {pickedImage && (
          <>
            <meta property="og:image" content={pickedImage} />
            <meta name="twitter:image" content={pickedImage} />
          </>
        )}
      </Head>
      <MyHeader />
      <PhotoGallary images={images} inputImages={inputImages} />
      <button
        onClick={onClickKifu}
        className="z-90 mouse fixed bottom-10 right-8 h-10 w-auto rounded-full bg-red-600 px-4 text-white shadow transition duration-200 ease-in hover:bg-red-700 focus:outline-none active:shadow-lg"
      >
        <svg
          viewBox="0 0 20 20"
          enable-background="new 0 0 20 20"
          className="mr-1 inline-block h-6 w-6"
        >
          <path
            fill="#FFFFFF"
            d="M17.19,4.155c-1.672-1.534-4.383-1.534-6.055,0L10,5.197L8.864,4.155c-1.672-1.534-4.382-1.534-6.054,0
                                    c-1.881,1.727-1.881,4.52,0,6.246L10,17l7.19-6.599C19.07,8.675,19.07,5.881,17.19,4.155z"
          />
        </svg>
        <span>寄付する</span>
      </button>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  //URLからパラメータを取得
  const { name, date } = context.params;
  const reducedResults = await getImages(name as string, date as string);
  return {
    props: {
      images: reducedResults,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  //全てのフォルダを取得
  return {
    paths: [],
    fallback: "blocking",
  };
};
