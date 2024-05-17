import { useParams } from 'react-router-dom';
import PrimaryColumn from '../components/PrimaryColumn';
import Main from '../components/Main';
import ScriptsList from '../components/ScriptsList';
import Script from '../components/Script';

const ScriptContainer = ({ scripts }) => {
  const { scriptId } = useParams();

  const currentScriptId =
    typeof scriptId === 'undefined' ? null : parseInt(scriptId, 10);

  const script =
    scripts.find(({ metadata }) => metadata.id === currentScriptId) || null;

  return (
    <>
      <PrimaryColumn>
        <ScriptsList
          scripts={scripts}
          currentId={currentScriptId}
        />
      </PrimaryColumn>
      <Main>
        {!script ? (
          <h1>Scripts</h1>
        ) : (
          <>
            <Script script={script}></Script>
          </>
        )}
      </Main>
    </>
  );
};

export default ScriptContainer;
