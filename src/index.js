import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import init from './init.jsx';
import '@babel/polyfill';

const runApp = async () => {
  const app = await init();

  ReactDOM.render(
    app,
    document.getElementById('root'),
  );

  return app;
};

runApp();
