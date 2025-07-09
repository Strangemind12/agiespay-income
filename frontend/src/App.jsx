import ClickToEarn from './page/ClickToEarn';

// Inside <Routes>:
<Route
  path="/clicktoearn"
  element={
    <ProtectedRoute>
      <ClickToEarn user={user} />
    </ProtectedRoute>
  }
/>
