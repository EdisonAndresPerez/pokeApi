import axios from "axios";

const instance = axios.create({
    baseURL: 'https://pokeapi.co/api/v2',
    timeout: 25000,
    headers: {
        'Content-Type': 'application/json'
      }
})

export default instance