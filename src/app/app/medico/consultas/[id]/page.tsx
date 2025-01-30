'use client'

import { useEffect, useState } from "react"
import { ConsultaType } from "@/app/schemas";
import api from "@/lib/api";

export default function Consulta({ params }: {params: {id: string}}) {
    const [consulta, setConsulta] = useState<ConsultaType | undefined>(undefined);

    useEffect(() => {
        api.get(`/consultas/${params.id}`).then(
            response => setConsulta(response.data)
        );
    }, [])

    return (
        <>
            <h1 className="text-2xl font-bold text-center mt-2 mb-4">Consulta</h1>
            <div className="mx-auto bg-white p-4 w-1/3 rounded-lg min-h-20 shadow text-black">
                <h2 className="text-lg font-medium">Informações do paciente</h2>
                Nome: { consulta?.paciente?.nome }<br/>
                cpf: { consulta?.paciente?.cpf }<br/>
                <hr />
                <h2 className="text-lg font-medium mt-4">Receita</h2>
                <label>
                    Data da consulta:
                    <input type="date" className="border border-black px-4 py-2 rounded w-full mb-2"/><br />
                </label>
                <label>Receita:</label>
                <textarea className="w-full min-h-52 border border-black rounded-lg"/>

                <button className="bg-blue-500 px-4 py-2 rounded text-white font-bold border border-blue-600 mr-2">Salvar e imprimir</button>
                <button className="bg-blue-500 px-4 py-2 rounded text-white font-bold border border-blue-600">Salvar</button>
            </div>
        </>
    )
}