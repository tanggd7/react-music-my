import BScroll from 'better-scroll'
import PropTypes from 'prop-types'
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'
import { IPosition } from './type'

const Scroll = forwardRef((props: any, ref) => {
  const wrapper = useRef<HTMLDivElement>(null)
  const bs = useRef<BScroll>()

  useEffect(() => {
    if (!wrapper.current) return
    const scroll = new BScroll(wrapper.current, {
      scrollY: true,
      click: props.click,
      probeType: props.probeType,
    })
    if (props.listenScroll) {
      scroll.on('scroll', (position: IPosition) => {
        props.scroll(position)
      })
    }
    bs.current = scroll
  }, [props])

  useImperativeHandle(ref, () => ({
    refresh: () => {
      bs.current?.refresh()
    },
    scrollToElement: (el: HTMLElement) => {
      bs.current?.scrollToElement(el, 0, false, false)
    },
    wrapper,
  }))

  return (
    <div ref={wrapper} className={props.className}>
      {props.children}
    </div>
  )
})

Scroll.prototype = {
  className: PropTypes.string,
  click: PropTypes.bool,
  listenScroll: PropTypes.bool,
  data: PropTypes.array,
  probeType: PropTypes.number,
  scroll: PropTypes.func,
}

Scroll.defaultProps = {
  className: '',
  click: true,
  listenScroll: false,
  data: null,
  probeType: 2,
  scroll: () => {},
}

export default Scroll
