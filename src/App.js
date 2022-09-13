import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TopNav from './components/TopNav';
import HomePage from './components/HomePage';
import CommentsPage from './components/CommentsPage';
import { RedditProvider } from './providers/RedditProvider';

function App() {
  return (
    <div className="App">
      <TopNav />
      <RedditProvider >
        <Router>
          <Routes>
            <Route exact path="/" element={ <Navigate to="/r/memes" /> } />
            <Route path="/r/:subreddit" element={<HomePage />} />
            <Route path="/r/:subreddit/comments/:id/:title" element={<CommentsPage />} />
          </Routes>
        </Router>
      </RedditProvider>
    </div>
  );
}

export default App;
