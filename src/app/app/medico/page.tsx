'use client'

type Paciente = {
    nome: string
}

// VERIFICAR NO BACK OS ATRIBUTOS DE CONSULTA
type Consulta = {
    horario: string,
    paciente: Paciente,
    estado: string // removível?
    sala: string
    urgencia: string
}

function ConsultaPopUp(props: number){
    
}

function TableConsultasMed(props: {consultas: Consulta[]}){
    return (
        <div>
            <table className="text-black w-full">
                <thead>
                    <tr className="bg-neutral-200">
                        <th className="py-3">Horário</th>
                        <th className="py-3">Paciente</th>
                        <th className="py-3">Estado</th>
                        <th className="py-3">Sala</th>
                        <th className="py-3">Urgência</th>
                        <th className="py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {props.consultas.map(consulta => {
                    return (
                        <tr className="bg-neutral-100 even:bg-neutral-50">
                            <td className="text-center py-3">{consulta.horario}</td>
                            <td className="text-center py-3">{consulta.paciente.nome}</td>
                            <td className="text-center py-3">{consulta.estado}</td>
                            <td className="text-center py-3">{consulta.sala}</td>
                            <td className="text-center py-3">{consulta.urgencia}</td>
                            <td className="text-center py-3">
                                <button type="button" id="visualizarConsulta"
                                className="bg-slate-300 px-2 py-1 rounded-md">Visualizar</button></td> // pop-up?
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    );
}

export default function Medico() {
    const consultas = [
        {
            horario: "9h00min - 9h30min",
            paciente: {nome: "João Antônio"},
            estado: "Em andamento",
            sala: "157",
            urgencia: "GRAVISSIMO",
        },
        {
            horario: "9h00min - 9h30min",
            paciente: {nome: "João Antônio"},
            estado: "Em andamento",
            sala: "157",
            urgencia: "Não urgente",
        },
        {
            horario: "9h00min - 9h30min",
            paciente: {nome: "João Antônio"},
            estado: "Em andamento",
            sala: "157",
            urgencia: "Não urgente",
        },
        {
            horario: "9h00min - 9h30min",
            paciente: {nome: "João Antônio"},
            estado: "Em andamento",
            sala: "157",
            urgencia: "Não urgente",
        },
    ];
    return (
        <div>
            <h1 className="w-full text-center mt-8 mb-4 text-2xl text-white font-bold">Consultas Agendadas</h1>
            <div className="bg-white rounded-lg shadow p-4 w-4/5 mx-auto">
                <TableConsultasMed consultas={consultas}/>   
            </div>
        </div>
    );
}