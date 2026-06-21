//AI-Tool - siehe AI-Tool Doku - 

import { getUserInitials } from "../../../assets/ts/authStore";

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
//AI-Tool Ende - siehe AI-Tool Doku - 
