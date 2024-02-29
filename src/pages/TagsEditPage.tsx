import { useNavigate, useParams } from 'react-router-dom';
import { BackIcon } from '../components/BackIcon';
import { TopNav } from '../components/TopNav';
import { useAjax } from '../lib/ajax';
import { comfirmable } from '../lib/comfirmable';
import { TagForm } from './TagsNewPage/TagForm';

export const TagsEditPage: React.FC = () => {
  const { id } = useParams();
  const { destroy } = useAjax({ showLoading: true, handleError: true });
  const nav = useNavigate();
  const onDelete = comfirmable('确定要删除吗？', async () => {
    if (!id) {
      throw new Error('id 不能为空');
    }
    await destroy(`/api/v1/tags/${id}`).catch((error) => {
      window.alert('删除失败');
      throw error;
    });
    window.alert('删除成功');
    nav('/items/new');
  });
  return (
    <div>
      <TopNav title="查看标签" icon={<BackIcon />} />
      <TagForm type="edit" />
      <div px-16px p-b-32px>
        <button p-btn bg="#cb6649" onClick={onDelete}>
          删除
        </button>
      </div>
    </div>
  );
};
