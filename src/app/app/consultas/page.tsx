'use client'

import { ConsultaType } from "@/app/schemas";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


function TableConsultas(props: {consultas: ConsultaType[]}) {
    const router = useRouter();
    const [search, setSearch] = useState<string>("");

    return (
        <>
            <form className="mb-4">
                <input type="text" placeholder="Buscar consultas" className="border border-neutral-300 px-4 py-2 rounded-lg w-1/3 mr-2" onChange={(event) => {setSearch(event.currentTarget.value.toLowerCase())}} />
                <input type="submit" value="Buscar" className="border border-neutral-300 px-3 py-2 rounded-lg text-neutral-700 hover:bg-neutral-100" />
            </form>
            <table className="text-black w-full" >
                <thead>
                    <tr className="bg-neutral-200">
                        <th className="py-3">Paciente</th>
                        <th className="py-3">Horário</th>
                        <th className="py-3">Médico</th>
                        <th className="py-3">Urgencia</th>
                    </tr>
                </thead>
                <tbody>
                    {props.consultas.map(consulta => {
                        if (!(
                            consulta?.paciente?.nome?.toLowerCase().includes(search) ||
                            consulta?.paciente?.sobrenome?.toLowerCase().includes(search) ||
                            consulta?.paciente?.email?.toLowerCase().includes(search) ||
                            consulta?.paciente?.cpf?.toLowerCase().includes(search) ||
                            consulta?.paciente?.telefone?.toLowerCase().includes(search) ||
                            consulta?.medico?.nome?.toLowerCase().includes(search) ||
                            consulta?.medico?.crm?.toLowerCase().includes(search) ||
                            consulta?.medico?.email?.toLowerCase().includes(search) ||
                            consulta?.medico?.especialidade?.toLowerCase().includes(search)
                        )) {
                            return null;
                        }
                        return (
                            <tr
                                className="bg-neutral-100 even:bg-neutral-50 cursor-pointer"
                                key={`row-${consulta.id}`}
                                onClick={() => router.push(`/app/consultas/${consulta.id}`)}
                            >
                                <td className="text-center py-3">{consulta.paciente.nome}</td>
                                <td className="text-center py-3">{consulta.data}</td>
                                <td className="text-center py-3">{consulta.medico.nome}</td>
                                <td className="text-center py-3">{consulta.urgencia}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default function Consultas() {
    const [consultas, setConsultas] = useState<ConsultaType[]>([]);

    useEffect(() => {
        api.get('/consultas').then(
            response => setConsultas(response.data)
        )
    }, [])

    return (
        <>
            <h1 className="w-full text-center  mt-8 mb-4 text-2xl text-white font-bold">Consultas</h1>
            <div className="bg-white rounded-lg shadow p-4 w-3/5 mx-auto">
                <TableConsultas consultas={consultas} />                
            </div>
            <a className="fixed bottom-4 right-8 bg-white text-blue-600 font-semibold border-2 shadow-xl border-blue-700 px-5 py-3 rounded-xl hover:bg-green-600 hover:border-green-700 hover:text-white transition-colors duration-75 mb-4" href="consultas/cadastrar">+ Cadastrar consulta</a>
        </>
    )
}
