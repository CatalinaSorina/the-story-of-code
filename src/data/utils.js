import axios from "axios";

export const getResponseFromApi = async api => axios.get(api);

export const shuffle = array => array.map(index => [Math.random(), index]).sort(([a], [b]) => a - b).map(([_, index]) => index);