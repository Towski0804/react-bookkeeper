import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackIcon } from '../components/BackIcon';
import { Tabs } from '../components/Tabs';
import { TopNav } from '../components/TopNav';
import { useAjax } from '../lib/ajax';
import { time } from '../lib/time';
import { hasError, validate } from '../lib/validate';
import { useCreateItemStore } from '../stores/useCreateItemStore';
import s from './ItemsNewPage.module.scss';
import { ItemAmount } from './ItemsNewPage/ItemAmount';
import { ItemDate } from './ItemsNewPage/ItemDate';
import { Tags } from './ItemsNewPage/Tags';

export const ItemsNewPage: React.FC = () => {
  const { data, setData, setError } = useCreateItemStore();
  const tabItems: { key: Item['kind']; text: string; element?: ReactNode }[] = [
    {
      key: 'expenses',
      text: '支出',
      element: (
        <Tags
          kind="expenses"
          value={data.tag_id}
          onChange={(id) => setData({ tag_id: id })}
        />
      )
    },
    {
      key: 'income',
      text: '收入',
      element: (
        <Tags
          kind="income"
          value={data.tag_id}
          onChange={(id) => setData({ tag_id: id })}
        />
      )
    }
  ]; // React DOM diff 的优化
  const { post } = useAjax({ showLoading: true, handleError: true });
  const nav = useNavigate();
  const onSubmit = async () => {
    const error = validate(data, [
      { key: 'kind', type: 'required', message: '请选择类型：收入或支出' },
      { key: 'tag_id', type: 'required', message: '请选择一个标签' },
      { key: 'happened_at', type: 'required', message: '请选择一个时间' },
      { key: 'amount', type: 'required', message: '请输入金额' },
      { key: 'amount', type: 'notEqual', value: 0, message: '金额不能为0' }
    ]);
    setError(error);
    if (hasError(error)) {
      const message = Object.values(error).flat().join('\n');
      window.alert(message);
    } else {
      await post<Resource<Item>>('/api/v1/items', data);
      // this is to reset page states
      setData({ amount: 0, happened_at: time().isoString });
      nav('/items');
    }
  };
  return (
    <div className={s.wrapper} h-screen flex flex-col onSubmit={onSubmit}>
      <div grow-0 shrink-0>
        <TopNav title="记一笔" icon={<BackIcon />} />
      </div>
      <Tabs
        tabItems={tabItems}
        className="text-center grow-1 shrink-1 overflow-hidden"
        classPrefix="itemsNewPage"
        value={data.kind!}
        onChange={(tabItem) => {
          setData({ kind: tabItem });
        }}
      />
      <ItemAmount
        className="grow-0 shrink-0"
        itemDate={
          <ItemDate
            value={data.happened_at}
            onChange={(happened_at) => setData({ happened_at })}
          />
        }
        value={data.amount}
        onChange={(amount) => setData({ amount })}
        onSubmit={onSubmit}
      />
    </div>
  );
};
