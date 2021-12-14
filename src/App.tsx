import { Switch, Route } from 'react-router-dom';
import UploadPage from 'src/pages/UploadPage';
import LibraryPage from 'src/pages/LibraryPage';
import CallbackPage from 'src/pages/CallbackPage';

import 'antd/dist/antd.less';
import './App.css';

const App: React.FC = () => {
  return (
    <Switch>
      <Route path='/upload' component={UploadPage} />
      <Route path='/callback' component={CallbackPage} />
      <Route path='/' component={LibraryPage} />
    </Switch>
  );
};

export default App;
