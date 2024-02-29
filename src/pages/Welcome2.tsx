import { Link } from 'react-router-dom'
import p from '../assets/images/welcome2.svg'
export const Welcome2: React.FC = () => {
  return (
    <div text-center>
      <img w-150px h-150px src={p} />
      <h2 text-32px mt-48px text="#573938">
        每日提醒 <br />
        不会遗漏每一笔账单
      </h2>
      <div mt-64px>
        <Link text-32px color="#573938" font-bold to="/welcome/3">下一页</Link>
      </div>
    </div>
  )
}
