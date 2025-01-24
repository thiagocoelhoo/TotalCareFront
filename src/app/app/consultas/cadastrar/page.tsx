export default function CadastroConsulta() {
    return (
        <>
            <h1 className="w-full text-center  mt-8 mb-4 text-2xl text-white font-bold">Cadastro de consulta</h1>
            <div className="bg-white rounded-lg shadow p-8 w-3/5 mx-auto text-black mb-10">
                <form className="mb-4">
                    
                    <fieldset>
                        <label>
                            Paciente
                            <select className="w-full border border-neutral-300 px-4 py-2 rounded-lg mb-4">
                                <option>-</option>
                                <option>Paciente 1</option>
                                <option>Paciente 2</option>
                                <option>Paciente 3</option>
                            </select>
                        </label>

                        <label>
                            Médico
                            <select className="w-full border border-neutral-300 px-4 py-2 rounded-lg mb-4">
                                <option>-</option>
                                <option>Médico 1</option>
                                <option>Médico 2</option>
                                <option>Médico 3</option>
                            </select>
                        </label>

                        <label>
                            Data
                            <input className="w-full border border-neutral-300 px-4 py-2 rounded-lg mb-4" type="date" />
                            <input className="w-full border border-neutral-300 px-4 py-2 rounded-lg mb-4" type="time" />
                        </label>
                    </fieldset>
                    <input type="submit" className="block mx-auto w-2/5 px-4 py-2 border border-green-600 bg-green-500 hover:bg-green-600 rounded-md text-white mt-6" value="Cadastrar" />
                </form>
            </div>
        </>
    )
}