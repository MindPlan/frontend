interface ClickableIconProps {
  Icon: React.ElementType | string;
  onClick: () => void;
  className?: string;
}

export const ClickableIcon: React.FC<ClickableIconProps> = ({
  Icon,
  onClick,
  className,
}) => {
  return (
    <div onClick={onClick} style={{ cursor: 'pointer' }} className={className}>
      {typeof Icon === 'string' ? <img src={Icon} alt='icon' /> : <Icon />}
    </div>
  );
};
