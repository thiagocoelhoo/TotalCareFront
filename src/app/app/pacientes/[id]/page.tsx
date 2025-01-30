'use client'

import { PacienteType } from "@/app/schemas";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function PacienteDetails() {
    const params = useParams<{ id: string }>(); 
    const pacienteId = params.id;
    const [paciente, setPaciente] = useState<PacienteType | undefined>(undefined);
    
    useEffect(() => {
        if (pacienteId) {
            api.get(`/pacientes/${pacienteId}`).then(
                response => setPaciente(response.data)
            );
        }
    }, [])

    return (
        <>
            <h1>Detalhes de paciente</h1>
            <div className="bg-white p-6 rounded text-black mx-auto w-1/2">
                <h1 className="text-xl font-medium mb-4">{paciente?.nome} {paciente?.sobrenome}</h1>
                <table className="mb-4 w-full border border-neutral-400">
                    <tbody>
                        <tr className="bg-neutral-100 even:bg-neutral-50">
                            <th>CPF</th>
                            <td>{ paciente?.cpf }</td>
                        </tr>
                        <tr className="bg-neutral-100 even:bg-neutral-50">
                            <th>Email</th>
                            <td>{ paciente?.email }</td>
                        </tr>
                        <tr className="bg-neutral-100 even:bg-neutral-50">
                            <th>Telefone</th>
                            <td>{ paciente?.telefone }</td>
                        </tr>
                    </tbody>
                </table>
                <a className="px-5 py-3 rounded-lg border border-blue-600 bg-blue-500 text-white mr-2">Editar</a>
                <a className="px-5 py-3 rounded-lg border border-red-600 bg-red-500 text-white mr-2">Excluir</a>
                <a className="px-5 py-3 rounded-lg border border-green-600 bg-green-500 text-white " href={`/app/consultas/cadastrar?paciente=${ paciente?.id }`}>Cadastrar consulta</a>
            </div>
        </>
    )
}