type Types = {
  icon: any;
  title: string;
  isActive: boolean;
  figure: number;
  action: () => void;
};

export const AsideButton = ({
  isActive,
  action,
  icon,
  title,
  figure,
}: Types) => {
  return (
    <div
      role="presentation"
      onClick={action}
      className={`flex ${isActive && "bg-primary"} cursor-pointer items-center w-full ${figure !== 0 && "justify-between"} rounded-md px-3 py-3`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`${isActive && "text-white"} ${title == "Search" && !isActive && "opacity-65"}`}
        >
          {icon}
        </div>
        <p
          className={`text-[15px] md:text-[13px] font-medium ${isActive && "text-white"} ${title == "Search" && !isActive && "opacity-65"} `}
        >
          {title}
        </p>
      </div>

      {figure !== 0 && (
        <p className={`text-[13px] ${isActive && "text-white"} `}>{figure}</p>
      )}
    </div>
  );
};
