# ExpressJS Template & TailwindCSS

A modern, ready to use template featuring Express.js, TailwindCSS, and Discord Authentication.


## ⭐ Features

- **Modern Stack**: Built with Express.js and TailwindCSS
- **Discord Authentication**: Ready to use Discord OAuth2 integration
- **Database Integration**: MySQL setup with automatic database creation
- **Session Management**: Secure session handling
- **Responsive Design**: Mobile friendly interface with modern UI
- **Dark Mode**: Built-in dark mode support
- **Easy to Customize**: Well organized structure for easy modifications

## 🚀 Quick Start

1. **Clone the repository**
2. **Install dependencies**
```npm install```

3. **Configure the application**
- Update the configuration with your details:
  ```json
  {
    "site": {
        "port": 3000
    },
    "database": {
        "host": "localhost",
        "username": "root",
        "password": "",
        "database": "ejstemplate",
        "charset": "utf8mb4"
    },
    "discord": {
        "clientId": "YOUR_DISCORD_CLIENT_ID",
        "clientSecret": "YOUR_DISCORD_CLIENT_SECRET",
        "callbackURL": "http://localhost:3000/auth/discord/callback"
    }
  }
  ```
4. **Start the development server**

```npm run dev```

5. **Start the webserver**

```node .``` 

## 📁 Project Structure

├── src/
│ ├── views/ # EJS templates
│ ├── assets/ # Static assets
│ │ └── css/ # Stylesheets
│ └── index.js # Main application file
├── package.json
└── tailwind.config.js

## 🛠️ Built With

- [Express.js](https://expressjs.com/) - Web framework
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
- [Discord OAuth2](https://discord.com/developers/docs/topics/oauth2) - Authentication
- [MySQL](https://www.mysql.com/) - Database
- [EJS](https://ejs.co/) - Templating engine

## ⚙️ Discord Setup

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Go to OAuth2 settings
4. Add redirect URL: `http://localhost:3000/auth/discord/callback`
5. Copy Client ID and Client Secret to your config.json


## ⭐ Show Your Support

Give a ⭐️ if this project helped you! 

## 📝 License

This project is [MIT](LICENSE) licensed.

## 🙏 Acknowledgments

- Thanks to all contributors
- Inspired by modern web development practices
- Built with love for the developer community

---

If you found this template helpful, please consider giving it a star ⭐ on GitHub!
