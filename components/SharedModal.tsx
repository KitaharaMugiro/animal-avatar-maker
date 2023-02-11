import {
    ArrowDownTrayIcon,
    ArrowTopRightOnSquareIcon,
    ArrowUturnLeftIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import { variants } from '../utils/animationVariants'
import downloadPhoto from '../utils/downloadPhoto'
import { imageUrl, thumbailImageUrl } from '../utils/imageUrl'
import { range } from '../utils/range'
import type { CloudinaryImageProps, SharedModalProps } from '../utils/types'
import Twitter from './Icons/Twitter'

export default function SharedModal({
    index,
    images,
    changePhotoId,
    closeModal,
    navigation,
    currentPhoto,
    direction,
}: SharedModalProps) {
    const [loaded, setLoaded] = useState(false)

    let filteredImages = images?.filter((img: CloudinaryImageProps) =>
        range(index - 15, index + 15).includes(img.id)
    )

    const handlers = useSwipeable({
        onSwipedLeft: () => changePhotoId(index + 1),
        onSwipedRight: () => changePhotoId(index - 1),
        trackMouse: true,
    })

    let currentImage = images ? images[index] : currentPhoto


    return (
        <MotionConfig
            transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
            }}
        >
            <div
                className="relative z-50 flex aspect-[3/2] w-full max-w-7xl items-center wide:h-full xl:taller-than-854:h-auto"
                {...handlers}
            >
                {/* Main image */}
                <div className="w-full overflow-hidden">
                    <div className="relative flex aspect-[1/1] items-center justify-center">
                        <AnimatePresence initial={false} custom={direction}>
                            <motion.div
                                key={index}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="absolute"
                            >

                                <Image
                                    src={imageUrl(currentImage.public_id, currentImage.format, currentImage.mosaic, currentImage.sample)}
                                    width={720}
                                    height={480}
                                    sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
                                    priority
                                    unoptimized
                                    alt="avatar"
                                    onLoadingComplete={() => setLoaded(true)}
                                />


                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Buttons + bottom nav bar */}
                <div className="absolute inset-0 mx-auto flex max-w-7xl items-center justify-center">
                    {/* Buttons */}
                    {loaded && (
                        <div className="relative aspect-[1/1] max-h-full w-full">
                            {navigation && (
                                <>
                                    {index > 0 && (
                                        <button
                                            className="absolute left-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
                                            style={{ transform: 'translate3d(0, 0, 0)' }}
                                            onClick={() => changePhotoId(index - 1)}
                                        >
                                            <ChevronLeftIcon className="h-6 w-6" />
                                        </button>
                                    )}
                                    {index + 1 < images.length && (
                                        <button
                                            className="absolute right-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
                                            style={{ transform: 'translate3d(0, 0, 0)' }}
                                            onClick={() => changePhotoId(index + 1)}
                                        >
                                            <ChevronRightIcon className="h-6 w-6" />
                                        </button>
                                    )}
                                    {currentImage.mosaic && (
                                        <div className="flex h-screen justify-center items-center">
                                            <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-4 w-4">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                                </svg>

                                                <a href="https://buy.stripe.com/14k6rU7e40x82XKdQZ">
                                                    <button className="text-sm">モザイクを外す</button>
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                    {currentImage.sample && (
                                        <div className="flex h-screen justify-center items-center">

                                            <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-4 w-4">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                                </svg>

                                                <a href="https://buy.stripe.com/14k6rU7e40x82XKdQZ">
                                                    <button className="text-sm">サンプルを外す</button>
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                            <div className="absolute top-0 right-0 flex items-center gap-2 p-3 text-white">
                                {navigation ? (
                                    <a
                                        href={imageUrl(currentImage.public_id, currentImage.format, currentImage.mosaic, currentImage.sample)}
                                        className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                                        target="_blank"
                                        title="Open fullsize version"
                                        rel="noreferrer"
                                    >
                                        <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                                    </a>
                                ) : (
                                    <a
                                        href={`https://twitter.com/intent/tweet?text=Check%20out%20this%20pic%20from%20Next.js%20Conf!%0A%0Ahttps://nextjsconf-pics.vercel.app/p/${index}`}
                                        className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                                        target="_blank"
                                        title="Open fullsize version"
                                        rel="noreferrer"
                                    >
                                        <Twitter className="h-5 w-5" />
                                    </a>
                                )}
                                <button
                                    onClick={() =>
                                        downloadPhoto(
                                            imageUrl(currentImage.public_id, currentImage.format, currentImage.mosaic, currentImage.sample),
                                            `${index}.jpg`
                                        )
                                    }
                                    className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                                    title="Download fullsize version"
                                >
                                    <ArrowDownTrayIcon className="h-5 w-5" />
                                </button>
                            </div>
                            <div className="absolute top-0 left-0 flex items-center gap-2 p-3 text-white">
                                <button
                                    onClick={() => closeModal()}
                                    className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                                >
                                    {navigation ? (
                                        <XMarkIcon className="h-5 w-5" />
                                    ) : (
                                        <ArrowUturnLeftIcon className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                    {/* Bottom Nav bar */}
                    {navigation && (
                        <div className="fixed inset-x-0 bottom-0 z-40 overflow-hidden bg-gradient-to-b from-black/0 to-black/60">
                            <motion.div
                                initial={false}
                                className="mx-auto mt-6 mb-6 flex aspect-[1/1] h-14"
                            >
                                <AnimatePresence initial={false}>
                                    {filteredImages.map(({ public_id, format, id }) => (
                                        <motion.button
                                            initial={{
                                                width: '0%',
                                                x: `${Math.max((index - 1) * -100, 15 * -100)}%`,
                                            }}
                                            animate={{
                                                scale: id === index ? 1.25 : 1,
                                                width: '100%',
                                                x: `${Math.max(index * -100, 15 * -100)}%`,
                                            }}
                                            exit={{ width: '0%' }}
                                            onClick={() => changePhotoId(id)}
                                            key={id}
                                            className={`${id === index
                                                ? 'z-20 rounded-md shadow shadow-black/50'
                                                : 'z-10'
                                                } ${id === 0 ? 'rounded-l-md' : ''} ${id === images.length - 1 ? 'rounded-r-md' : ''
                                                } relative inline-block w-full shrink-0 transform-gpu overflow-hidden focus:outline-none`}
                                        >
                                            <Image
                                                alt="small photos on the bottom"
                                                width={80}
                                                height={80}
                                                unoptimized
                                                className={`${id === index
                                                    ? 'brightness-110 hover:brightness-110'
                                                    : 'brightness-50 contrast-125 hover:brightness-75'
                                                    } h-full transform object-cover transition`}
                                                src={thumbailImageUrl(public_id, format)}
                                            />
                                        </motion.button>
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        </div>
                    )}
                </div>
            </div>
        </MotionConfig>
    )
}
