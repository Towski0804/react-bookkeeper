import { Link } from 'react-router-dom'
import p from '../assets/images/welcome1.svg'
export const Welcome1: React.FC = () => {
  return (
    <div text-center>
      <img w-150px h-150px src={p} />
      <h2 text-32px mt-48px text="#573938">
        会挣钱 <br />
        还要会省钱
      </h2>
      <div mt-64px>
        <Link text-32px color="#573938" font-bold to="/welcome/2">下一页</Link>
      </div>
    </div>
  )
}
