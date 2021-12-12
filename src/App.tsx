import { Switch, Route } from 'react-router-dom';
import UploadPage from 'src/pages/UploadPage';
import AlbumPage from 'src/pages/AlbumPage';

import 'antd/dist/antd.less';
import './App.css';

const App: React.FC = () => {
  return (
    <Switch>
      <Route path='/upload' component={UploadPage} />
      <Route path='/' component={AlbumPage} />
    </Switch>
  );
};

export default App;
