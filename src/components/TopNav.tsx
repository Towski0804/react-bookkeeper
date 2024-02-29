import type { ReactNode } from 'react';

interface Props {
  title?: string;
  icon: ReactNode;
}
export const TopNav: React.FC<Props> = ({ title = 'BookEase', icon }) => {
  return (
    <div text="#423d3c" flex items-center pt-24px pb-8px px-24px>
      <span
        w-24px
        h-5vh
        mr-16px
        flex
        justify-center
        items-center
        children-max-w="100%"
        children-max-h="100%"
      >
        {icon}
      </span>
      <h1 text-24px>{title}</h1>
    </div>
  );
};
