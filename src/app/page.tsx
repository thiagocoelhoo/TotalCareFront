'use client'

// import Image from "next/image";
import logo from "./images/logo.png"
import login_img from "./images/login_img.png";


function LoginForm(props) {
  return (
    <form className="text-black p-4 flex flex-col gap-2" onSubmit={props.onSubmit}>
      <h1 className="text-2xl">Seja bem vindo</h1>
      <span className="text-neutral-400">Por favor, digite suas informações.</span>
      
      <fieldset>
        <label>
          Nome de usuário
          <input className="w-full border border-neutral-200 rounded-lg px-4 py-2" type="text" name="username" placeholder="Nome de usuário" required />
        </label>

        <label>
          Senha
          <input className="w-full border border-neutral-200 rounded-lg px-4 py-2" type="password" name="password" required />
        </label>
        
        <label>
          <input type="checkbox" /> Manter logado
        </label>
      </fieldset>

      <input className="bg-blue-500 rounded-lg text-white px-4 py-2 mx-auto w-1/2 mt-4" type="submit" value="Entrar" />
    </form>
  )
}


export default function Home() {  
  function submitForm(e) {

  }

  return (
    <div className="w-full h-screen bg-blue-500 flex">
      <div className="w-1/3 h-full bg-white">
        <LoginForm onSubmit={submitForm}/>
      </div>
      <div className="w-full">
        <img className="absolute left-1/3 top-[100px]" src={login_img.src} alt="" />
        <img className="absolute left-1/2" src={logo.src} alt="" />
      </div>
    </div>
  );
}
