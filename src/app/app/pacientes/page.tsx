'use client'

import { PacienteType } from "@/app/schemas";
import api from "@/lib/api";
import { useEffect, useState } from "react";


function TablePacientes(props: {pacientes: PacienteType[]}) {
    return (
        <>
        <table className="text-black w-full" >
            <thead>
                <tr className="bg-neutral-200">
                    <th className="py-3">Nome</th>
                    <th className="py-3">CPF</th>
                    <th className="py-3">Telefone</th>
                </tr>
            </thead>
            <tbody>
                {props.pacientes.map(paciente => {
                    return (
                        <tr className="bg-neutral-100 even:bg-neutral-50">
                            <td className="text-center py-3"><a href="/app/pacientes/1">{paciente.nome} {paciente.sobrenome}</a></td>
                            <td className="text-center py-3">{paciente.cpf}</td>
                            <td className="text-center py-3">{paciente.telefone}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        
        </>
    )
}

export default function Pacientes() {
    const [pacientes, setPacientes] = useState<PacienteType[]>([]);

    useEffect(() => {
        api.get('/pacientes').then(
            response => setPacientes(response.data)
        )
    }, []);

    return (
        <>
            <h1 className="w-full text-center  mt-8 mb-4 text-2xl text-white font-bold">Pacientes</h1>
            <div className="bg-white rounded-lg shadow p-4 w-4/5 mx-auto">
                <form className="mb-4">
                    <input type="text" placeholder="Buscar consulta" className="border border-neutral-300 px-4 py-2 rounded-lg w-1/3 mr-2" />
                    <input type="submit" value="Buscar" className="border border-neutral-300 px-3 py-2 rounded-lg text-neutral-700 hover:bg-neutral-100" />
                </form>
                <TablePacientes pacientes={pacientes} />                
            </div>
            <a className="fixed block bottom-4 right-8 bg-white text-blue-600 font-semibold border-2 shadow-xl border-blue-700 px-5 py-3 rounded-xl hover:bg-green-600 hover:border-green-700 hover:text-white transition-colors duration-75 mb-4" href="pacientes/cadastrar">+ Cadastrar paciente</a>
        </>
    )
}