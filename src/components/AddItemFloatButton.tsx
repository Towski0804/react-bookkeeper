import { Link } from 'react-router-dom';
import { Icon } from './Icon';
import s from './AddButton.module.scss';

export const AddItemFloatButton: React.FC = () => {
  return (
    <Link to="/items/new">
      <button
        w-56px
        h-56px
        bg="[var(--color-btn)]"
        rounded="50%"
        b-none
        text-white
        fixed
        bottom-16px
        right-16px
        flex
        justify-center
        items-center
        className={s.addButton}
      >
        <Icon name="add" className="w-36px h-36px" />
      </button>
    </Link>
  );
};
