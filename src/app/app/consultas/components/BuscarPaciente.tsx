import { PacienteType } from "@/app/schemas";
import api from "@/lib/api";
import { useEffect, useState } from "react";

export default function BuscarPaciente({selecionarPaciente}: { selecionarPaciente: (paciente: PacienteType) => void}) {
    const [q, setQ] = useState("")
    const [pacientes, setPacientes] = useState<PacienteType[]>([]);

    useEffect(() => {
        api.get('/pacientes').then(
            response => setPacientes(response.data)
        );
    }, []);

    return (
        <>
            <div className="flex gap-2 mb-2">
                <input type="text" placeholder="Buscar paciente" className="px-4 py-2 rounded border border-slate-400 w-full" onChange={
                    (e) => {
                        setQ(e.target.value);
                    }
                }/>
            </div>
            <table className="border border-slate-400 w-full border-separate border-spacing-0 rounded">
                <thead>
                    <tr className="bg-white text-left">
                        <th className="px-4 py-2 border-b border-slate-400">Nome</th>
                        <th className="px-4 py-2 border-b border-slate-400">CPF</th>
                    </tr>
                </thead>
                <tbody>
                    {pacientes.map(
                        (paciente) => {
                            if (!(paciente.nome.toLowerCase().includes(q) || paciente.cpf.includes(q)))
                                return null;

                            return (
                                <tr 
                                    className="bg-white hover:bg-zinc-100 cursor-pointer active:bg-blue-200"
                                    key={`row-paciente-${paciente.id}`}
                                    onClick={() => selecionarPaciente(paciente)}
                                >
                                    <td className="px-4 py-2">{paciente.nome}</td>
                                    <td className="px-4 py-2">{paciente.cpf}</td>
                                </tr>
                            )
                        }
                    )}
                </tbody>
            </table>
        </>
    )
}
