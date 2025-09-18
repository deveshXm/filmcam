import React from 'react';
import { PhotoEditorPage } from './pages/PhotoEditorPage';
import { AuthProvider } from './contexts/AuthContext';

function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <PhotoEditorPage />
    </AuthProvider>
  );
}

export default App;