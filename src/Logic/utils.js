import Axios from "axios";

const getDate = () => {
  const today = new Date();
  today.setDate(today.getDate() - 30);
  return today.toISOString().split("T")[0];
};

const dateAgo = getDate();
const axios = Axios.create({
  baseURL: `https://api.github.com/search/repositories?q=created:>${dateAgo}&sort=stars&order=desc`,
});

const daysDiff = (first, second = new Date()) => {
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.round((second - first) / oneDay);
};

const fetchNextPage = (page) =>  {
  return Axios.get(
    `https://api.github.com/search/repositories?q=created:>${dateAgo}&sort=stars&order=desc${page}`
  ).then( (response) => response.data);
}

export { axios, daysDiff, fetchNextPage }