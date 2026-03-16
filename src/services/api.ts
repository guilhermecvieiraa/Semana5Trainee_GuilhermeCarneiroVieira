import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://trainee.fidelis.workers.dev/api',
  headers: {
    // ✔️ Cole aqui o seu token pessoal!
    // Acesse trainee.fidelis.workers.dev/inicio para pegar o seu.
    'Authorization': 'Bearer f3f0d1ed-1f8d-44fb-9833-c1b61e6ff9e0',
    'Content-Type': 'application/json',
  },
});