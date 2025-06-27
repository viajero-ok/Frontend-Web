import { ReactNode } from "react";

export const Sidebar = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row border border-b-0 bg-gray-50 border-gray-200 rounded-t-md p-4 h-fit">
        <div className="text-2xl text-gray-600 font-bold">{title}</div>
      </div>
      <div className="flex flex-col gap-2 py-4 px-2 rounded-b-md border border-gray-200 h-fit">
        {children}
      </div>
    </div>
  );
};

export default function FormSideMenu({
  renderSidebar,
  children,
}: {
  renderSidebar: () => ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-10 mx-8 mt-4 gap-4">
      <div className="flex flex-col col-span-2 gap-2">{renderSidebar()}</div>
      <div className="w-full col-span-8">{children}</div>
    </div>
  );
}
