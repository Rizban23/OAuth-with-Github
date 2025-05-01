#  GitHub OAuth Viewer

Полноценное приложение на **React + Express**, в котором реализована:

- Авторизация через GitHub OAuth
- Отображение и редактирование профиля
- Вкладки с репозиториями (публичные и приватные)
- Поиск других пользователей и их репозиториев

---

##  Используемые технологии

- React + React Router
- Tailwind CSS
- Express.js (бэкенд для OAuth)
- GitHub API v3
- Axios

---

##  Как запустить проект локально

> Убедитесь, что у вас есть GitHub OAuth приложение и вы знаете `Client ID` и `Client Secret`.

### 1. Клонируйте репозиторий

git clone https://github.com/username/github-profile-viewer.git
 
2. Установка и запуск frontend 
cd github-profile-viewer
npm install
npm run build:css    # если используете Tailwind CSS
npm start

Создайте файл .env в директории github-profile-viewer/:
REACT_APP_CLIENT_ID=ваш_github_client_id

3. Установка и запуск backend

cd ../github-profile-viewer-backend
npm install
npm start

Создайте файл .env в директории github-profile-viewer-backend/:
CLIENT_ID=ваш_github_client_id
CLIENT_SECRET=ваш_github_client_secret

