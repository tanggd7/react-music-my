import React, { useCallback, useEffect, useRef, useState } from 'react'
import DefaultImage from '../../common/image/default.png'
import { ImgLazyProps } from '../../common/js/img-lazy'

const ImgLazy = (props: ImgLazyProps) => {
  const { src = '', ...params } = props

  const imageRef = useRef<HTMLImageElement>(null)

  const screenHeight = useRef<number>(window.innerHeight)

  const [imageInfo, setImageInfo] = useState({
    url: DefaultImage,
    isLoad: false,
  })

  const onTouchMove = useCallback(() => {
    const top = imageRef?.current?.getBoundingClientRect().top
    if (top && top < screenHeight.current) {
      setImageInfo({ url: src, isLoad: true })
      document.removeEventListener('touchmove', onTouchMove, false)
    }
  }, [src])

  useEffect(() => {
    const top = imageRef?.current?.getBoundingClientRect().top
    if (top && top < screenHeight.current) {
      setImageInfo({ url: src, isLoad: true })
    }

    document.addEventListener('touchmove', onTouchMove, false)
  }, [src, onTouchMove])

  return <img ref={imageRef} src={imageInfo.url} alt=" " {...params} />
}

export default ImgLazy
