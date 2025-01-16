'use client'

type Paciente = {
    nome: string
};

type Medico = {
    nome: string
};

type Consulta = {
    paciente: Paciente,
    medico: Medico,
    horario: string,
    urgencia: string
};

function TableConsultas(props: {consultas: Consulta[]}) {
    return (
        <>
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
                    return (
                        <tr className="bg-neutral-100 even:bg-neutral-50">
                            <td className="text-center py-3">{consulta.paciente.nome}</td>
                            <td className="text-center py-3">{consulta.horario}</td>
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
    const consultas = [
        {
            paciente: {nome: "Yan Nalbino"},
            medico: {nome: "Dr. Leonardo"},
            horario: "16/01/2025 (Hoje)",
            urgencia: "Não urgente"
        },
        {
            paciente: {nome: "Balbino Yan"},
            medico: {nome: "Dr. Leozitos"},
            horario: "22/01/2025",
            urgencia: "Não urgente"
        },
        {
            paciente: {nome: "Yan Bogueira"},
            medico: {nome: "Dr. Leo"},
            horario: "5/02/2025",
            urgencia: "Não urgente"
        },
        {
            paciente: {nome: "Nay Balbinho"},
            medico: {nome: "Dr. Guimas"},
            horario: "13/02/2025",
            urgencia: "Urgente"
        },
    ];

    return (
        <>
            <h1 className="w-full text-center  mt-8 mb-4 text-2xl text-white font-bold">Consultas</h1>
            <div className="bg-white rounded-lg shadow p-4 w-4/5 mx-auto">
                <form className="mb-4">
                    <input type="text" placeholder="Buscar consulta" className="border border-neutral-300 px-4 py-2 rounded-lg w-1/3 mr-2" />
                    <input type="submit" value="Buscar" className="border border-neutral-300 px-3 py-2 rounded-lg text-neutral-700 hover:bg-neutral-100" />
                </form>
                <TableConsultas consultas={consultas} />                
            </div>
            <button className="fixed bottom-4 right-8 bg-white text-blue-600 font-semibold border-2 shadow-xl border-blue-700 px-5 py-3 rounded-xl hover:bg-green-600 hover:border-green-700 hover:text-white transition-colors duration-75 mb-4">+ Cadastrar consulta</button>
        </>
        
    )
}