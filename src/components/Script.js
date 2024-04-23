import React from 'react';
import MainHeader from './MainHeader';
import ResourceMetadata from './ResourceMetadata';
import ScriptRows from './ScriptRows';

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
        <ScriptRows scriptRows={script.script} />
      </div>
    </>
  );
};

export default Script;
