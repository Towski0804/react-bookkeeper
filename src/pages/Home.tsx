import useSWR from 'swr';
import { Link, Navigate } from 'react-router-dom';
import { useAjax } from '../lib/ajax';
import { useTitle } from '../hooks/useTitle';
import { Icon } from '../components/Icon';
interface Props {
  title?: string;
}
export const Home: React.FC<Props> = (props) => {
  useTitle(props.title);
  const { get } = useAjax({ showLoading: true, handleError: false });
  const { data: meData, error: meError } = useSWR(
    '/api/v1/me',
    async (path) => {
      const response = await get<Resource<User>>(path);
      return response.data.resource;
    }
  );
  const { data: itemsData, error: itemsError } = useSWR(
    meData ? '/api/v1/items' : null,
    async (path) => (await get<Resources<Item>>(path)).data
  );

  if (itemsData?.resources[0]) {
    return <Navigate to="/items" />;
  }

  return (
    <div>
      <div flex justify-center items-center>
        <Icon className="mt-20svh mb-20svh w-128px h-128px" name="piggy" />
      </div>
      <div px-16px>
        <Link to="/items/new">
          <button p-btn>开始记账</button>
        </Link>
      </div>
    </div>
  );
};
