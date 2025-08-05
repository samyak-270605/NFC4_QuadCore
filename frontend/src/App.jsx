import { Navigate, Route, Routes } from 'react-router';

import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";
import Calendar from "./components/Calendar.jsx";
import TimedTask from './components/TimedTask.jsx';
import FriendsPage from './pages/FriendsPage.jsx';
import { Toaster } from 'react-hot-toast';
import PageLoader from './components/PageLoader.jsx';
import useAuthUser from './hooks/useAuthUser.js';
import Layout from './components/Layout.jsx';
import { useThemeStore } from './store/useThemeStore.js';
import Leaderboard from './pages/LeaderBoard.jsx';
import LandingPage from './pages/LandingPage.jsx';

const App = () => {

  const { isLoading, authUser } = useAuthUser();
  const { theme } = useThemeStore();

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  if (isLoading) return <PageLoader />;

  return (
    <div className='h-screen text-5xl' data-theme={theme}>
      <Routes>
        {/* Landing Page as Default for Non-Logged Users */}
        <Route
          path="/"
          element={
            !isAuthenticated ? (
              <LandingPage />
            ) : isOnboarded ? (
              <Layout showSidebar={true}>
                <HomePage />
              </Layout>
            ) : (
              <Navigate to="/onboarding" />
            )
          }
        />

        {/* Landing Page explicit route */}
        <Route path="/landing" element={<LandingPage />} />

        <Route
          path="/signup"
          element={
            !isAuthenticated ? <SignUpPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />
          }
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? <LoginPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />
          }
        />
        <Route
          path="/friends"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <FriendsPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/notifications"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <NotificationsPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/leaderboard"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <Leaderboard />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/call/:id"
          element={
            isAuthenticated && isOnboarded ? <CallPage /> : <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
          }
        />
        <Route
          path="/chat/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={false}>
                <ChatPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/onboarding"
          element={
            isAuthenticated ? (!isOnboarded ? <OnboardingPage /> : <Navigate to="/" />) : <Navigate to="/login" />
          }
        />

        <Route path="/calendar" element={<Calendar />} />
        <Route path="/timed-task" element={<TimedTask />} />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
