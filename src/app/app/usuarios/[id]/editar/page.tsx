'use client'

import { TipoUsuario, UsuarioType } from "@/app/schemas";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditarUsuario() {
    const router = useRouter();

    const [usuario, setUsuario] = useState<UsuarioType | undefined>(undefined);
    const params = useParams();
    const usuarioId = params.id;
    
    useEffect(() => {
        if (usuarioId) {
            api.get(`/usuarios/${usuarioId}`).then(
                (response) => {
                    if (response.status === 200) {
                        setUsuario(response.data);
                    }
                }
            )
        }
    }, []);

    function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const payload: {
            nome: string | undefined,
            email: string | undefined,
            tipoUsuario: number | undefined,
            senha: string | undefined
        } = {
            nome: formData.get("name")?.toString(),
            email: formData.get("email")?.toString(),
            tipoUsuario: Number(formData.get("tipoUsuario")?.valueOf()),
            senha: undefined
        }

        if (formData.get("password1")) {
            if (formData.get("password1") !== formData.get("password2")) {
                return;
            }

            payload.senha = formData.get("password1")?.toString();
        }

        api.put(`/usuarios/${usuarioId}`, payload).then(
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
            <h1 className="w-full text-center  mt-8 mb-4 text-2xl text-white font-bold">Editar usuário</h1>
            <div className="bg-white rounded-lg shadow p-4 w-3/5 mx-auto">
                <form className="flex gap-4 flex-col" onSubmit={onSubmit}>
                    <label>
                        Nome
                        <input
                            type="text"
                            name="name"
                            className="px-4 py-2 border border-black rounded-lg w-full"
                            defaultValue={usuario?.nome}
                            required
                        />
                    </label>
                    <label>
                        Email
                        <input 
                            type="text"
                            name="email"
                            className="px-4 py-2 border border-black rounded-lg w-full"
                            defaultValue={usuario?.email}
                            required
                        />
                    </label>
                    <label>
                        Senha
                        <input
                            type="password"
                            name="password1"
                            className="px-4 py-2 border border-black rounded-lg w-full"
                        />
                    </label>
                    <label>
                        Confirmação de senha
                        <input
                            type="password"
                            name="password2"
                            className="px-4 py-2 border border-black rounded-lg w-full"
                        />
                    </label>
                    <label>
                        Tipo de usuário
                        <select
                            name="tipoUsuario"
                            className="px-4 py-2 border border-black rounded-lg w-full"
                            defaultValue={usuario?.tipoUsuario}
                            required
                        >
                            <option value="">-</option>
                            <option value={TipoUsuario.Atendente}>Atendente</option>
                            <option value={TipoUsuario.Medico}>Médico</option>
                            <option value={TipoUsuario.Admin}>Administrador</option>
                        </select>
                    </label>
                    <Button type="submit">Salvar</Button>
                </form>             
            </div>
        </>
    )
}