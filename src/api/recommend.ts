import axios from 'axios'
import { ISong } from '../common/js/type'
import { handleWangYiImage2Small } from '../common/js/util'
import { API_PREFIX } from './config'

export interface IRecommend {
  pic?: string
  targetId?: number
}

export const getRecommendList = (): Promise<Array<IRecommend>> => {
  return axios.get(`${API_PREFIX}/banner?type=2`, {}).then((res) => {
    return res.data.banners as Array<IRecommend>
  })
}

export interface IDisc {
  id?: number
  picUrl?: string
  name?: string
  copywriter?: string
}

export const getDiscList = (): Promise<Array<IDisc>> => {
  return axios.get(`${API_PREFIX}/personalized`, {}).then((res) => {
    return res.data.result.map((item: IDisc) => ({
      ...item,
      picUrl: handleWangYiImage2Small(item.picUrl),
    }))
  })
}

export interface IDiscDetail {
  id?: number
  name?: string
  bgImage?: string
  songList?: Array<ISong>
}

export const getDiscDetail = (id: string | number): Promise<IDiscDetail> => {
  return axios.get(`${API_PREFIX}/playlist/detail?id=` + id, {}).then((res) => {
    const { playlist } = res.data
    const { id, name, coverImgUrl, tracks = [] } = playlist
    const ret: IDiscDetail = {
      id,
      name,
      bgImage: handleWangYiImage2Small(coverImgUrl, '400y400'),
      songList: tracks.map((item: any): ISong => {
        const song: ISong = {
          id: item.id,
          name: item.name,
        }
        song.author = item.ar.map((it: any) => it.name).join(' / ')
        song.image = handleWangYiImage2Small(item.al.picUrl, '300y300')
        return song
      }),
    }
    return ret
  })
}
