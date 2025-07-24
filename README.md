# E-Shop
This is a FullStack E-Commerce Project with a simple rule defined chatbot able to answer a limoted number of questions predifined. This project is public for all to clone and update as required and also can fork and pull all the contributions for a more versatile experience and growth for all.
This project mainly uses React for the Frontend and uses Node.js and MongoDB for the backend of the project. This Project is fully integrated and wired for all intensive purposes. I welcome any and all developer to develope it further by forking and contributing making it a complete E-Commerce website with all functionalities.
### Frontend Setup

```sh
cd ../frontend
npm install
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔑 Authentication & Security

- Passwords are hashed with bcrypt.
- JWT is used for secure authentication.
- Cart and Wishlist are protected routes.
- Forgot password flow with reset link (simulated via backend console).

---

## 💬 Chatbot

- Click the chat bubble in the bottom-right to open the AI assistant.
- The bot answers FAQs, provides suggestions, and guides users interactively.
- Easily extendable with more Q&A pairs in `frontend/src/components/chatbot/AIChat.tsx`.

---

## 🛠️ Scripts

**Frontend:**
- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build

**Backend:**
- `node server.js` — Start backend server

---

## 🧪 Testing the Password Reset Flow

1. Click "Forgot password?" in the login modal.
2. Enter your email.
3. Check the backend console for a reset link (e.g., `http://localhost:5173/reset-password?token=...`).
4. Open the link, set a new password, and log in.

---

## 🤝 Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## 📄 License

MIT

---

## 🙏 Acknowledgements

- [shadcn/ui](https://ui.shadcn.com/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
- [Lucide Icons](https://lucide.dev/)

---

> _Built with ❤️ by [Deepjyoti Roy]_
