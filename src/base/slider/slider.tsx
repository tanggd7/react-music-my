import React, { useEffect, useRef, useState } from 'react'
import { addClass } from '../../common/js/dom'
import BScroll from 'better-scroll'
import './style.scss'
import { ISlidePage } from './type'

const Slider = (props: any) => {
  const { children } = props

  const sliderRef = useRef<HTMLDivElement>(null)
  const sliderGroupRef = useRef<HTMLDivElement>(null)
  const slider = useRef<BScroll>()
  const currentPageIndex = useRef(0)

  const [dots, setDots] = useState<number[]>([])

  useEffect(() => {
    const children = sliderGroupRef.current!.children
    let width = 0
    const sliderWidth = sliderRef.current!.clientWidth
    for (let i = 0; i < children.length; i++) {
      const child = children[i] as HTMLElement
      addClass(child, 'slider-item')
      child.style.width = `${sliderWidth}px`
      width += sliderWidth
    }
    sliderGroupRef.current!.style.width = `${width}px`

    setDots(Array.from({ length: children.length }).map((item, index) => index))

    slider.current = new BScroll(sliderRef.current!, {
      scrollX: true,
      scrollY: false,
      momentum: false, // 当快速在屏幕上滑动一段距离的时候，会根据滑动的距离和时间计算出动量，并生成滚动动画
      bounce: false, // 当滚动超过边缘的时候会有一小段回弹动画
      stopPropagation: true, // 是否阻止事件冒泡。多用在嵌套 scroll 的场景
      probeType: 3,
      slide: {
        loop: true,
        autoplay: true,
      },
    })

    slider.current.on('slideWillChange', (page: ISlidePage) => {
      currentPageIndex.current = page.pageX
    })
  }, [])

  return (
    <div className="slider" ref={sliderRef}>
      <div className="slider-group" ref={sliderGroupRef}>
        {children}
      </div>
      <div className="dots">
        {dots.map((item, index) => {
          return (
            <span
              key={index}
              className={`dot ${
                currentPageIndex.current === index ? 'active' : ''
              }`}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Slider
