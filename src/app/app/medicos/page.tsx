'use client'

import { MedicoType } from "@/app/schemas";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


function TableMedicos(props: {medicos: MedicoType[]}) {
    const router = useRouter();
    const [search, setSearch] = useState<string>("");

    return (
        <>
            <form className="mb-4">
                <input type="text" placeholder="Buscar medicos" className="border border-neutral-300 px-4 py-2 rounded-lg w-1/3 mr-2" onChange={(event) => {setSearch(event.currentTarget.value.toLowerCase())}} />
                <input type="submit" value="Buscar" className="border border-neutral-300 px-3 py-2 rounded-lg text-neutral-700 hover:bg-neutral-100" />
            </form>
            <table className="text-black w-full" >
                <thead>
                    <tr className="bg-neutral-200">
                        <th className="py-3">Nome</th>
                        <th className="py-3">CRM</th>
                        <th className="py-3">Especialidade</th>
                    </tr>
                </thead>
                <tbody>
                    {props.medicos.map(medico => {
                        if (!(
                            medico?.nome?.toLowerCase().includes(search) ||
                            medico?.email?.toLowerCase().includes(search) ||
                            medico?.especialidade?.toLowerCase().includes(search) ||
                            medico?.telefone?.toLowerCase().includes(search)
                        )) {
                            return null;
                        }

                        return (
                            <tr className="bg-neutral-100 even:bg-neutral-50 cursor-pointer" key={`row-${medico.id}`} onClick={() => router.push(`/app/medicos/${medico.id}`)}>
                                <td className="text-center py-3">{medico.nome}</td>
                                <td className="text-center py-3">{medico.crm}</td>
                                <td className="text-center py-3">{medico.especialidade}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default function Medicos() {
    const [medicos, setMedicos] = useState<MedicoType[]>([]);

    useEffect(() => {
        api.get('/medicos').then(
            response => setMedicos(response.data)
        )
    }, []);

    return (
        <>
            <h1 className="w-full text-center  mt-8 mb-4 text-2xl text-white font-bold">Medicos</h1>
            <div className="bg-white rounded-lg shadow p-4 w-3/5 mx-auto">
                <TableMedicos medicos={medicos} />                
            </div>
            <a className="fixed block bottom-4 right-8 bg-white text-blue-600 font-semibold border-2 shadow-xl border-blue-700 px-5 py-3 rounded-xl hover:bg-green-600 hover:border-green-700 hover:text-white transition-colors duration-75 mb-4" href="/app/medicos/cadastrar">+ Cadastrar paciente</a>
        </>
    )
}