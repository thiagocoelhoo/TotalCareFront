'use client'

import Image from 'next/image';
import logo from './images/logo.png';
import login_img from './images/login_img.png';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

function LoginForm(props) {
  return (
    <form 
      className="text-black p-8 flex flex-col gap-4 max-w-md mx-auto" 
      onSubmit={props.onSubmit}
    >
      <h1 className="text-3xl font-semibold">Seja bem vindo</h1>
      <p className="text-neutral-500">Por favor, digite suas informações.</p>
      
      <div className="flex flex-col gap-3">
        <label className="flex flex-col gap-1">
          Nome de usuário
          <input 
            className="w-full border border-neutral-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            type="text" 
            name="email" 
            placeholder="Digite seu nome de usuário" 
            required 
          />
        </label>

        <label className="flex flex-col gap-1">
          Senha
          <input 
            className="w-full border border-neutral-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            type="password" 
            name="senha" 
            placeholder="Digite sua senha" 
            required 
          />
        </label>

        <label className="flex items-center gap-2 text-neutral-600">
          <input type="checkbox" className="accent-blue-500" /> Manter logado
        </label>
      </div>

      <button 
        className="bg-blue-500 rounded-lg text-white px-6 py-2 shadow-lg hover:bg-blue-600 transition-all" 
        type="submit"
      >
        Entrar
      </button>

      <a href="#" className="text-center text-sm text-neutral-500 hover:underline">
        Esqueci minha senha
      </a>
    </form>
  )
}

export default function Home() {  
  const router = useRouter();

  function submitForm(event) {
    const formData = new FormData(event.currentTarget);
    event.preventDefault();

    api.post('/auth/login', formData).then(
      response => {
        localStorage.setItem('AccessToken', response.data);
        router.refresh();
      }
    );
  }

  return (
    <div className="shadow-xl w-full h-screen flex ">
      <div className=" w-1/4 bg-white flex flex-col justify-center ">
        <LoginForm onSubmit={submitForm} />
      </div>

      <div className="drop-shadow-xl w-3/4 bg-blue-500 flex justify-center items-center relative">
        <Image 
          src={login_img.src} 
          alt="Login Illustration" 
          width={700} 
          height={500} 
          className="object-contain"
        />
        <Image 
          src={logo.src} 
          alt="Logo" 
          width={200} 
          height={200} 
          className="absolute top-10"
        />
      </div>
    </div>
  );
}
