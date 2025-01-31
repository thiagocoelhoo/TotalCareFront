'use client'

import { TipoUsuario } from "@/app/schemas";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function CadastroUsuario() {
    const router = useRouter();

    function submitForm(event) {
        const formData = new FormData(event.currentTarget);
        event.preventDefault();

        const medico_payload = {
            nome: formData.get('nome'),
            crm: formData.get('crm'),
            especialidade: formData.get('especialidade'),
        };
        
        const usuario_payload = {
            email: formData.get('email'),
            senha: formData.get('password1'),
            tipoUsuario: TipoUsuario.Medico
        }

        if (formData.get('password1') !== formData.get('password2')) {
            alert("As senhas não são compatíveis.");
        }

        api.post('/usuarios', usuario_payload).then(
            response => {
                console.log(response.status);
            }
        );
        api.post('/medicos', medico_payload).then(
            response => {
                console.log(response.status);
                if (response.status !== 200) {
                    router.push('/app/medicos');
                }
            }
        );


        
    }

    return (
        <>
            <h1 className="w-full text-center  mt-8 mb-4 text-2xl text-white font-bold">Cadastro de médico</h1>
            <div className="bg-white rounded-lg shadow p-8 w-3/5 mx-auto text-black mb-10">
                <form 
                    className="mb-4" 
                    onSubmit={submitForm}
                >
                    <div className="flex flex-col gap-4">
                        <div className="flex w-full gap-4">
                            <label className="w-full">
                                Nome 
                                <input type="text" name="nome" className="w-full border border-neutral-400 px-4 py-2 rounded-lg" required/>
                            </label>
                        </div>
                        <label className="w-full">
                            CRM
                            <input type="text" name="crm" className="w-full border border-neutral-400 px-4 py-2 rounded-lg" required/>
                        </label>
                        <label className="w-full">
                            Especialidade
                            <input type="text" name="especialidade" className="w-full border border-neutral-400 px-4 py-2 rounded-lg" required/>
                        </label>
                    
                        <hr/>
                        <label>
                            Email 
                            <input type="email" name="email" className="w-full border border-neutral-400 px-4 py-2 rounded-lg" required/>
                        </label>
                        <label>
                            Senha 
                            <input type="password" name="password1" className="w-full border border-neutral-400 px-4 py-2 rounded-lg" required/>
                        </label>
                        <label>
                            Confirmação de senha 
                            <input type="password" name="password2" className="w-full border border-neutral-400 px-4 py-2 rounded-lg" required/>
                        </label>
                        
                        <input type="submit" className="block mx-auto w-2/5 px-4 py-2 border border-green-600 bg-green-500 hover:bg-green-600 rounded-md text-white mt-6" value="Cadastrar" />
                    </div>
                    
                </form>
            </div>
        </>
    )
}