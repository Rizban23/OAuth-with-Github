import EditableField from "./EditableField";

const ProfileCard = ({ user, onEdit }) => {
  if (!user) {
    return (
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6 text-center">
        <p className="text-gray-500 text-lg"> Загрузка профиля...</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow p-6 space-y-4">
      <div className="flex items-center gap-4">
        <img
          src={user.avatar_url}
          alt="avatar"
          className="w-20 h-20 rounded-full"
        />
        <div>
          <h2 className="text-xl font-semibold">{user.name || "—"}</h2>
          <p className="text-gray-600">@{user.login}</p>
          <p className="text-gray-500"> {user.email || " Имейл не указан"}</p>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
             Профиль на GitHub
          </a>
        </div>
      </div>

      <div className="space-y-2">
        <EditableField
          label="Имя"
          value={user.name}
          onSave={(val) => onEdit("name", val)}
        />
        <EditableField
          label="Компания"
          value={user.company}
          onSave={(val) => onEdit("company", val)}
        />
        <EditableField
          label="Местоположение"
          value={user.location}
          onSave={(val) => onEdit("location", val)}
        />
        <EditableField
          label="О себе"
          value={user.bio}
          onSave={(val) => onEdit("bio", val)}
        />
      </div>
    </div>
  );
};

export default ProfileCard;
