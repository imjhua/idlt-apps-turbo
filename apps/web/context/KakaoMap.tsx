import { createContext, PropsWithChildren, useContext, useEffect, useRef, useState } from 'react'

type KakaoMapProps = {
  width?: number
  height?: number
  center: number[]
  appKey: string
}
const KakaoMapContext = createContext(undefined as unknown as kakao.maps.Map)

const { Provider } = KakaoMapContext

const KAKAO_MAP_SDK_URL = '//dapi.kakao.com/v2/maps/sdk.js'

export function KakaoMap({
  appKey,
  children,
  center = [37.501299834009416, 127.03608752312653],
}: PropsWithChildren<KakaoMapProps>) {
  const [map, setMap] = useState<kakao.maps.Map>()
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.async = false
    script.src = `${KAKAO_MAP_SDK_URL}?appkey=${appKey}&libraries=services,clusterer,drawing&autoload=false`
    document.head.appendChild(script)

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        const options = {
          level: 3,
          center: new window.kakao.maps.LatLng(center[0]!, center[1]!),
        }
        const map = new window.kakao.maps.Map(mapRef.current!, options)
        setMap(map)
      })
    }

    script.addEventListener('load', onLoadKakaoAPI)
  }, [appKey, center])

  return (
    <div ref={mapRef} className="w-full h-full">
      {map && <Provider value={map}>{children}</Provider>}
    </div>
  )
}

export const useKakaoMap = () => {
  const kakaoMap = useContext(KakaoMapContext)

  if (!kakaoMap) {
    throw new Error('kakaoMap instance가 없습니다.')
  }

  return kakaoMap
}
