'use client'

type Paciente = {
    nome: string,
    cpf: string,
    telefone: string,
};

function TablePacientes(props: {pacientes: Paciente[]}) {
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
                            <td className="text-center py-3">{paciente.nome}</td>
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
    const pacientes = [
        {
            nome: "Yan Balbino Nogueira",
            cpf: "123.123.123-12",
            telefone: "84 912345678"
        },
        {
            nome: "Nay B. Nogueira",
            cpf: "234.234.234-12",
            telefone: "84 912345678"
        },
        {
            nome: "Yan Nalbino Bogueira",
            cpf: "345.345.345-12",
            telefone: "84 912345678"
        },
        {
            nome: "Yab",
            cpf: "456.456.456-12",
            telefone: "84 912345678"
        },
    ];

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