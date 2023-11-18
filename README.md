#### Kursk State University Scientific Magazine App.

 - React, Redux Toolkit
 - React Bootstrap, Formik, i18next, Styled Components
 - ESLint
 - Webpack

____

#### install deps
```sh
npm install
```

#### run app
```sh
npm run start
```

#### build app in the development mode
```sh
npm run build
```

#### build app in the production mode
```sh
npm run build-prod
```

#### clean `dist` folder
```sh
npm run clean
```

#### добавление нового журнала
1. добавляем переменную с url нового журнала в файл `.env` по аналогии с предыдущими
2. в объект magazines, лежащий по пути `src/context/DomainContext.jsx` добавляем новое поле по аналогии с предыдущими. Запоминаем значение поля
3. в файле `src/themes.js` добавляем стили для нового журнала по аналогии с предыдущими, градиенты можно нагенерить в любом online-css-gradient-generator. Используем значение поля из шага 2 как ключ
4. в файле `src/locales/ru.js` прописывает название и подзаголовок журнала по аналогии с предыдущими. Используем значение поля из шага 2 как ключ
5. собираем бандл `npm run build-prod`
6. файлы из папки c бандлом кладем на хостинг
