<h1 align="center">passport-handler</h1>
<h6 align="center">Developed with ❤️ by Swôth</h6>

---

![npm install](https://nodei.co/npm/passport-handler.png?mini=true)
![npm version](https://badge.fury.io/js/passport-handler.svg)

# 🔎 Installation
```console
npm i passport-handler --save
yarn add passport-handler
```

# 🔮 Importing
```js
import Handler from 'passport-handler'; // esm
const Handler = require('passport-handler').default; // commonjs
```

# ✨ Setup
```ts
import Handler from 'passport-handler';
import passport from 'passport';

// passport strategy and others...

app.get('/auth/callback', Handler(passport.authenticate('provider'), {
    error: (err, req, res, next) => {
        console.log(err.message);
        next();
    },
    success: (req, res, next) => {
        // if you don't add this function, next() will run automatically
        console.log('successful');
        next();
    }
}));
```