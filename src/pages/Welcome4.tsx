import { useNavigate } from 'react-router-dom'
import p from '../assets/images/welcome4.svg'
import { useLocalStore } from '../stores/useLocalStore'

export const Welcome4: React.FC = () => {
  const { setHasReadWelcomes } = useLocalStore()
  const nav = useNavigate()
  const onSkip = () => {
    setHasReadWelcomes(true)
    nav('/home')
  }
  return (
    <div text-center>
      <img src={p} w-150px h-150px/>
      <h2 text-32px mt-48px text="#573938">
        云备份 <br />
        再也不怕数据丢失
      </h2>
      <div mt-64px>
        <span text-32px color="#573938" font-bold onClick={onSkip}>开启应用</span>
      </div>
    </div>
  )
}
