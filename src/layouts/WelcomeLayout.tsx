import { animated, useTransition } from '@react-spring/web'
import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useOutlet } from 'react-router-dom'
import logo from '../assets/icons/logo.svg'
import { useSwipe } from '../hooks/useSwipe'
import { useLocalStore } from '../stores/useLocalStore'
import s from './WelcomeLayout.module.scss'

const linkMap: Record<string, string> = {
  '/welcome/1': '/welcome/2',
  '/welcome/2': '/welcome/3',
  '/welcome/3': '/welcome/4',
  '/welcome/4': '/home',
}
export const WelcomeLayout: React.FC = () => {
  const animating = useRef(false)
  const map = useRef<Record<string, ReactNode>>({})
  const location = useLocation()
  const outlet = useOutlet()
  map.current[location.pathname] = outlet
  const [extraStyle, setExtraStyle] = useState<{ position: 'relative' | 'absolute' }>({ position: 'relative' })
  const transitions = useTransition(location.pathname, {
    from: { transform: location.pathname === '/welcome/1' ? 'translateX(0%)' : 'translateX(100%)' },
    enter: { transform: 'translateX(0%)' },
    leave: { transform: 'translateX(-100%)' },
    config: { duration: 300 },
    onStart: () => {
      setExtraStyle({ position: 'absolute' })
    },
    onRest: () => {
      animating.current = false
      setExtraStyle({ position: 'relative' })
    }
  })
  const main = useRef<HTMLElement>(null)
  const { direction } = useSwipe(main)
  const nav = useNavigate()
  useEffect(() => {
    if (direction === 'left') {
      if (animating.current) { return }
      animating.current = true
      nav(linkMap[location.pathname])
    }
  }, [direction, location.pathname, linkMap])
  const { setHasReadWelcomes } = useLocalStore()
  const onSkip = () => {
    setHasReadWelcomes(true)
    nav('/home')
  }
  return (
    <div className="bg-#f1f3ed" h-screen flex flex-col items-stretch pb-16px overflow-hidden>
      <span fixed text="#573938" top-16px right-16px text-32px className={s.skip} onClick={onSkip}>跳过</span>
      <header shrink-0 text-center pt-100px>
        <img src={logo} w-100px h-100px />
        <h1 text="#573938" text-32px>BookEase</h1>
      </header>
      <main shrink-1 grow-1 relative ref={main} >
        {transitions((style, pathname) =>
          <animated.div key={pathname} style={{ ...style, ...extraStyle }} w="100%" h="100%" p-16px flex>
            <div grow-1 flex justify-center items-center rounded-8px bg-white>
              {map.current[pathname]}
            </div>
          </animated.div>
        )}
      </main>
    </div>
  )
}

