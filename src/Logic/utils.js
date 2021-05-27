import Axios from "axios";

const getDate = () => {
  const today = new Date();
  today.setDate(today.getDate() - 30);
  return today.toISOString().split("T")[0];
};

const daysDiff = (first, second = new Date()) => {
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.round((second - first) / oneDay);
};

const dateAgo = getDate();
const fetchPage = (page = "") =>  {
  return Axios.get(
    `https://api.github.com/search/repositories?q=created:>${dateAgo}&sort=stars&order=desc${page}`
  ).then( (response) => response.data);
}

export { daysDiff, fetchPage };