import { Dialog } from '@headlessui/react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import useKeypress from 'react-use-keypress'
import type { CloudinaryImageProps } from '../utils/types'
import SharedModal from './SharedModal'

export default function Modal({
  images,
  onClose,
}: {
  images: CloudinaryImageProps[]
  onClose?: () => void
}) {
  let overlayRef = useRef()
  const router = useRouter()

  const { photoId, name, date } = router.query
  let index = Number(photoId)

  const [direction, setDirection] = useState(0)
  const [curIndex, setCurIndex] = useState(index)

  function handleClose() {
    if (date) {
      router.push(`/${name}/${date}`, undefined, { shallow: true })
    } else {
      router.push(`/${name}`, undefined, { shallow: true })
    }

    onClose()
  }

  function changePhotoId(newVal: number) {
    if (newVal > index) {
      setDirection(1)
    } else {
      setDirection(-1)
    }
    setCurIndex(newVal)
    if (date) {
      router.push(
        {
          pathname: `/${name}/${date}`,
          query: { photoId: newVal },
        },
        undefined,
        { shallow: true }
      )
    } else {
      router.push(
        {
          pathname: `/${name}`,
          query: { photoId: newVal },
        },
        undefined,
        { shallow: true }
      )
    }

  }

  useKeypress('ArrowRight', () => {
    if (index + 1 < images.length) {
      changePhotoId(index + 1)
    }
  })

  useKeypress('ArrowLeft', () => {
    if (index > 0) {
      changePhotoId(index - 1)
    }
  })

  return (
    <Dialog
      static
      open={true}
      onClose={handleClose}
      initialFocus={overlayRef}
      className="fixed inset-0 z-10 flex items-center justify-center"
    >
      <Dialog.Overlay
        ref={overlayRef}
        as={motion.div}
        key="backdrop"
        className="fixed inset-0 z-30 bg-black/70 backdrop-blur-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      <SharedModal
        index={curIndex}
        direction={direction}
        images={images}
        changePhotoId={changePhotoId}
        closeModal={handleClose}
        navigation={true}
      />
    </Dialog>
  )
}
