import Axios from 'axios'


const getDate = () => {
  const today = new Date();
  today.setDate(today.getDate() - 30);
  return today.toISOString().split("T")[0];
}

const dateAgo = getDate();
const instance = Axios.create({
  baseURL: `https://api.github.com/search/repositories?q=created:>${dateAgo}&sort=stars&order=desc`
});

export default instance;
