import React from 'react';
import MainHeader from './MainHeader';
import ResourceMetadata from './ResourceMetadata';
import ScriptCode from './ScriptCode';

const Script = ({ script }) => {
  if (!script) {
    return null;
  }

  return (
    <>
      <MainHeader title={`Script ${script.metadata.id}`}>
        <ResourceMetadata metadata={script.metadata} />
      </MainHeader>

      <div className="text-xs">
        <ScriptCode code={script.code} />
      </div>
    </>
  );
};

export default Script;
