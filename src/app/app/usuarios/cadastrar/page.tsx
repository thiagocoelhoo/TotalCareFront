'use client'

import { TipoUsuario } from "@/app/schemas";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function CadastrarUsuario() {
    const router = useRouter();

    function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        if (formData.get("password1") !== formData.get("password2")) {
            return;
        }

        const payload = {
            nome: formData.get("name"),
            email: formData.get("email"),
            senha: formData.get("password1"),
            tipoUsuario: formData.get("tipoUsuario")
        }

        api.post('/usuarios', payload).then(
            (response) => {
                if (response.status === 200) {
                    router.push("/app/usuarios");
                }
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        );
    }

    return (
        <>
            <h1 className="w-full text-center  mt-8 mb-4 text-2xl text-white font-bold">Cadastrar usuário</h1>
            <div className="bg-white rounded-lg shadow p-4 w-3/5 mx-auto">
                <form className="flex gap-4 flex-col" onSubmit={onSubmit}>
                    <label>
                        Nome
                        <input type="text" name="name" className="px-4 py-2 border border-black rounded-lg w-full" required/>
                    </label>
                    <label>
                        Email
                        <input type="text" name="email" className="px-4 py-2 border border-black rounded-lg w-full" required/>
                    </label>
                    <label>
                        Senha
                        <input type="password" name="password1" className="px-4 py-2 border border-black rounded-lg w-full" required/>
                    </label>
                    <label>
                        Confirmação de senha
                        <input type="password" name="password2" className="px-4 py-2 border border-black rounded-lg w-full" required/>
                    </label>
                    <label>
                        Tipo de usuário
                        <select name="tipoUsuario" className="px-4 py-2 border border-black rounded-lg w-full" required>
                            <option value="">-</option>
                            <option value={TipoUsuario.Atendente}>Atendente</option>
                            <option value={TipoUsuario.Medico}>Médico</option>
                            <option value={TipoUsuario.Admin}>Administrador</option>
                        </select>
                    </label>
                    <Button type="submit">Cadastrar</Button>
                </form>             
            </div>
        </>
    )
}