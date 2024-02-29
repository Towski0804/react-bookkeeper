import { TopNav } from '../components/TopNav';
import { BackIcon } from '../components/BackIcon';
import { TagForm } from './TagsNewPage/TagForm';

export const TagsNewPage: React.FC = () => {
  return (
    <div>
      <TopNav title="新建标签" icon={<BackIcon />} />
      <TagForm type="create" />
    </div>
  );
};
