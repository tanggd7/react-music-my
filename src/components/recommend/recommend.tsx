import React, { useEffect, useState, useRef } from 'react'
import BScroll from 'better-scroll'
import Scroll from '../../base/scroll/scroll'
import {
  getRecommendList,
  getDiscList,
  IRecommend,
  IDisc,
} from '../../api/recommend'
import './recommend.scss'

const Recommend = (props: any) => {
  const recommendDom = useRef<HTMLDivElement>(null)
  const scroll = useRef<BScroll>()
  const [recommendList, setRecommendList] = useState<Array<IRecommend>>([])
  const [discList, setDiscList] = useState<Array<IDisc>>([])

  useEffect(() => {
    Promise.all([getRecommendList(), getDiscList()]).then(
      ([recommendList, discList]): void => {
        setRecommendList(recommendList)
        setDiscList(discList)
        scroll.current?.refresh()
      }
    )
  }, [])

  return (
    <div className="recommend" ref={recommendDom}>
      <Scroll className="recommend-content" ref={scroll}>
        <div>
          <div className="recommend-list">
            <h1 className="list-title">热门歌单推荐</h1>
            <ul>
              {discList.map((item: IDisc) => {
                return (
                  <li className="item" key={item.id}>
                    <div className="icon" id={`test${item.id}`}>
                      <img width="60" height="60" src={item.picUrl} alt="" />
                    </div>
                    <div className="text">
                      <h2
                        className="name"
                        dangerouslySetInnerHTML={{ __html: item.name! }}
                      ></h2>
                      <p
                        className="desc"
                        dangerouslySetInnerHTML={{ __html: item.copywriter! }}
                      ></p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </Scroll>
    </div>
  )
}

export default Recommend
