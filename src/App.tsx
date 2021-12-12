import { Switch, Route } from 'react-router-dom';
import UploadPage from 'src/pages/UploadPage';
import LibraryPage from 'src/pages/LibraryPage';

import 'antd/dist/antd.less';
import './App.css';

const App: React.FC = () => {
  return (
    <Switch>
      <Route path='/upload' component={UploadPage} />
      <Route path='/' component={LibraryPage} />
    </Switch>
  );
};

export default App;
