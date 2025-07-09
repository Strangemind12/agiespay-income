import ClickToEarn from './pages/ClickToEarn';

// Inside <Routes>:
<Route
  path="/clicktoearn"
  element={
    <ProtectedRoute>
      <ClickToEarn user={user} />
    </ProtectedRoute>
  }
/>
