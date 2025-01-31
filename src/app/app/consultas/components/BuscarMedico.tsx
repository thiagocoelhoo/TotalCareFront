import { MedicoType } from "@/app/schemas";
import api from "@/lib/api";
import { useEffect, useState } from "react";

export default function BuscarMedico({selecionarMedico}: {selecionarMedico: (medico: MedicoType) => void}) {
    const [q, setQ] = useState("")
    const [medicos, setMedicos] = useState<MedicoType[]>([]);

    useEffect(() => {
        api.get('/medicos').then(
            response => setMedicos(response.data)
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
                    </tr>
                </thead>
                <tbody>
                    {medicos.map(
                        (medico) => {
                            if (!(medico.nome.toLowerCase().includes(q)))
                                return null;

                            return (
                                <tr 
                                    key={`row-medico=${medico.id}`}
                                    className="bg-white hover:bg-zinc-100 cursor-pointer active:bg-blue-200"
                                    onClick={() => selecionarMedico(medico)}
                                >
                                    <td className="px-4 py-2">{medico.nome}</td>
                                </tr>
                            )
                        }
                    )}
                </tbody>
            </table>
        </>
    )
}