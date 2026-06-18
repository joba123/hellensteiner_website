import { getUserInitials } from "../../authStore";

interface UserAvatarProps {
  name: string;
  className?: string;
}

export function UserAvatar({ name, className }: UserAvatarProps) {
  const avatarClassName = ["user-avatar", className].filter(Boolean).join(" ");

  return (
    <span className={avatarClassName} aria-hidden="true">
      {getUserInitials(name)}
    </span>
  );
}
