import { useRom } from './contexts/RomContext';
import Layout from './components/Layout';
import DropZoneContainer from './containers/DropZoneContainer';
import ResourceExplorer from './containers/ResourceExplorer';

const App = () => {
  const { prg, res, resources } = useRom();

  return (
    <Layout>
      {!prg || !res || !resources ? (
        <DropZoneContainer />
      ) : (
        <ResourceExplorer />
      )}
    </Layout>
  );
};

export default App;
