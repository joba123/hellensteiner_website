//AI-Tool - siehe AI-Tool Doku - 
import { Button } from "../Button";
import { UserAvatar } from "./UserAvatar";
import { logout, type PublicUser } from "../../../assets/ts/authStore";

interface AccountLoginProps {
  user: PublicUser;
  onLogout?: () => void;
}

export function AccountLogin({ user, onLogout }: AccountLoginProps) {
  function handleLogout() {
    logout();
    onLogout?.();
  }

  return (
    <div className="account-panel">
      <div className="account-panel__identity">
        <UserAvatar name={user.name} className="user-avatar--large" />
        <div className="account-panel__identity-text">
          <strong>{user.name}</strong>
          <span>{user.email}</span>
        </div>
      </div>

      <dl className="account-panel__details">
        <div>
          <dt>Name</dt>
          <dd>{user.name}</dd>
        </div>
        <div>
          <dt>E-Mail</dt>
          <dd>{user.email}</dd>
        </div>
        <div>
          <dt>Freundeclub</dt>
          <dd>{user.isClubMember ? "Mitglied – 10 % Rabatt aktiv" : "Kein Mitglied"}</dd>
        </div>
      </dl>

      <Button type="button" className="account-panel__logout" onClick={handleLogout}>
        Abmelden
      </Button>
    </div>
  );
}
//AI-Tool Ende - siehe AI-Tool Doku - 
