import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import DropZoneContainer from './containers/DropZoneContainer';
import ResourceExplorer from './containers/ResourceExplorer';
import ErrorMessage from './components/ErrorMessage';

const App = () => {
  const [rom, setRom] = useState(null);
  const [res, setRes] = useState(null);
  const [resources, setResources] = useState(null);
  const navigate = useNavigate();

  const onFile = async (rom, res) => {
    const { default: parseRom } = await import('./lib/parser/parseRom');
    setRom(rom);
    setRes(res);
    setResources(parseRom(rom, res));

    // Redirect to the first room.
    navigate('/rooms/1');
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorMessage}>
      <Layout>
        {!rom || !res ? (
          <DropZoneContainer onFile={onFile} />
        ) : (
          <ResourceExplorer
            rom={rom}
            res={res}
            resources={resources}
          />
        )}
      </Layout>
    </ErrorBoundary>
  );
};

export default App;
