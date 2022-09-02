const jwt = require('jsonwebtoken');

const YOUR_JWT = 'eb28135ebcfc17578f96d4d65b6c7871f2c803be4180c165061d5c2db621c51b';
// вставьте сюда JWT, который вернул публичный сервер
const SECRET_KEY_DEV = 'some-secret-key';
// вставьте сюда секретный ключ для разработки из кода
try {
  jwt.verify(YOUR_JWT, SECRET_KEY_DEV);
  // eslint-disable-next-line no-console
  console.log('\x1b[31m%s\x1b[0m', `
    Надо исправить. В продакшне используется тот же
    секретный ключ, что и в режиме разработки.
  `);
} catch (err) {
  if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
    // eslint-disable-next-line no-console
    console.log(
      '\x1b[32m%s\x1b[0m',
      'Всё в порядке. Секретные ключи отличаются',
    );
  } else {
    // eslint-disable-next-line no-console
    console.log(
      '\x1b[33m%s\x1b[0m',
      'Что-то не так',
      err,
    );
  }
}
