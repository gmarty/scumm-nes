import { useRom } from './contexts/RomContext';
import Layout from './components/Layout';
import DropZoneContainer from './containers/DropZoneContainer';
import Router from './containers/Router';

const App = () => {
  const { prg, res, resources } = useRom();

  return (
    <Layout>
      {!prg || !res || !resources ? <DropZoneContainer /> : <Router />}
    </Layout>
  );
};

export default App;
