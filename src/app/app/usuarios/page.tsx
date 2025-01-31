'use client'

import { UsuarioType } from "@/app/schemas";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


function TableUsuarios(props: {usuarios: UsuarioType[]}) {
    const router = useRouter();
    const [search, setSearch] = useState<string>("");

    return (
        <>
        <form className="mb-4">
            <input type="text" placeholder="Buscar usuário" className="border border-neutral-300 px-4 py-2 rounded-lg w-1/3 mr-2" onChange={(event) => {setSearch(event.currentTarget.value)}} />
            <input type="submit" value="Buscar" className="border border-neutral-300 px-3 py-2 rounded-lg text-neutral-700 hover:bg-neutral-100" />
        </form>
        <table className="text-black w-full" >
            <thead>
                <tr className="bg-neutral-200">
                    <th className="py-3">Nome</th>
                    <th className="py-3">Email</th>
                    <th className="py-3">Tipo de usuário</th>
                    <th className="py-3">Data de criação</th>
                    <th className="py-3">Status</th>
                </tr>
            </thead>
            <tbody>
                {props.usuarios.map(usuario => {

                    if (!usuario.email.toLowerCase().includes(search)) {
                        return null;
                    }

                    return (
                        <tr 
                            className="bg-neutral-100 even:bg-neutral-50 cursor-pointer"
                            key={`row-usuario-${usuario.id}`}
                            onClick={() => router.push(`/app/usuarios/${usuario.id}`)}
                        >
                            <td className="text-center py-3">{usuario.nome}</td>
                            <td className="text-center py-3">{usuario.email}</td>
                            <td className="text-center py-3">{usuario.tipoUsuario}</td>
                            <td className="text-center py-3">{usuario.dataCadastro?.toString()}</td>
                            <td className="text-center py-3">{usuario.ativo ? 'Ativo' : 'Inativo'}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        
        </>
    )
}

export default function Usuarios() {
    const [usuarios, setUsuarios] = useState<UsuarioType[]>([]);

    useEffect(() => {
        api.get('/usuarios').then(
            response => setUsuarios(response.data)
        )
    }, [])

    return (
        <>
            <h1 className="w-full text-center  mt-8 mb-4 text-2xl text-white font-bold">Usuários</h1>
            <div className="bg-white rounded-lg shadow p-4 w-3/5 mx-auto">
                
                <TableUsuarios usuarios={usuarios} />                
            </div>
            <a className="fixed bottom-4 right-8 bg-white text-blue-600 font-semibold border-2 shadow-xl border-blue-700 px-5 py-3 rounded-xl hover:bg-green-600 hover:border-green-700 hover:text-white transition-colors duration-75 mb-4" href="usuarios/cadastrar">+ Cadastrar usuário</a>
        </>
    )
}