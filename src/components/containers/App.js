import '../../stylesheets/app.scss';
import Footer from '../Footer';
import RepoList from './RepoList';
import { getDate } from '../../Logic/utils';

function App() {
  return (
    <div className="App">
      <header className="App__header">
        <h1>
          Most Starred Github Repos created from
          {' '}
          {getDate()}
          {' '}
          till date (last 30
          Days)
        </h1>
      </header>
      <main className="App__main">
        <RepoList />
      </main>
      <footer className="App__footer">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
