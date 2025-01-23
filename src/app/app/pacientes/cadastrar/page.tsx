export default function CadastroPaciente() {
    return (
        <>
            <h1 className="w-full text-center  mt-8 mb-4 text-2xl text-white font-bold">Cadastro de paciente</h1>
            <div className="bg-white rounded-lg shadow p-8 w-3/5 mx-auto text-black mb-10">
                <form className="mb-4">
                    <label>
                        Nome completo 
                        <input type="text" className="w-full border border-neutral-300 px-4 py-2 rounded-lg mb-4"/>
                    </label>
                    <label>
                        Data de nascimento 
                        <input type="text" className="w-full border border-neutral-300 px-4 py-2 rounded-lg mb-4"/>
                    </label>
                    <label>
                        Sexo 
                        <input type="text" className="w-full border border-neutral-300 px-4 py-2 rounded-lg mb-4"/>
                    </label>
                    <label>
                        CPF 
                        <input type="text" className="w-full border border-neutral-300 px-4 py-2 rounded-lg mb-4"/>
                    </label>
                    <label>
                        SUS 
                        <input type="text" className="w-full border border-neutral-300 px-4 py-2 rounded-lg mb-4"/>
                    </label>
                    <label>
                        Telefone 
                        <input type="text" className="w-full border border-neutral-300 px-4 py-2 rounded-lg mb-4"/>
                    </label>
                    <label>
                        Email 
                        <input type="text" className="w-full border border-neutral-300 px-4 py-2 rounded-lg mb-4"/>
                    </label>

                    <fieldset className="border-t-2 border-neutral-200 pt-4 mt-4">
                        <label>
                            CEP 
                            <input type="text" className="w-full border border-neutral-300 px-4 py-2 rounded-lg mb-4"/>
                        </label>

                        <label>
                            Estado 
                            <input type="text" className="w-full border border-neutral-300 px-4 py-2 rounded-lg mb-4"/>
                        </label>

                        <label>
                            Cidade 
                            <input type="text" className="w-full border border-neutral-300 px-4 py-2 rounded-lg mb-4"/>
                        </label>

                        <label>
                            Bairro 
                            <input type="text" className="w-full border border-neutral-300 px-4 py-2 rounded-lg mb-4"/>
                        </label>

                        <label>
                            Rua 
                            <input type="text" className="w-full border border-neutral-300 px-4 py-2 rounded-lg mb-4"/>
                        </label>
                    </fieldset>
                    <input type="submit" className="block mx-auto w-2/5 px-4 py-2 border border-green-600 bg-green-500 hover:bg-green-600 rounded-md text-white mt-6" value="Cadastrar" />
                </form>
            </div>
        </>
    )
}