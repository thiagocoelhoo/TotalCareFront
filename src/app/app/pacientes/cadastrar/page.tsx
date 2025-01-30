'use client'

import api from "@/lib/api";

export default function CadastroPaciente() {
    function submitForm(event) {
        const formData = new FormData(event.currentTarget);
        event.preventDefault();

        api.post('/pacientes', formData).then(
            response => {
                console.log(response.data)
                if (response.status !== 200) {

                }
            }
        );
    }

    return (
        <>
            <h1 className="w-full text-center  mt-8 mb-4 text-2xl text-white font-bold">Cadastro de paciente</h1>
            <div className="bg-white rounded-lg shadow p-8 w-3/5 mx-auto text-black mb-10">
                <form className="mb-4" onSubmit={submitForm}>
                    <div className="flex w-full gap-4">
                        <label className="w-full">
                            Nome 
                            <input type="text" name="nome" className="w-full border border-neutral-400 px-4 py-2 rounded-lg"/>
                        </label>
                        <label className="w-full">
                            Sobrenome 
                            <input type="text" name="sobrenome" className="w-full border border-neutral-400 px-4 py-2 rounded-lg"/>
                        </label>
                    </div>
                    {/* <label>
                        Data de nascimento
                        <br/>
                        <input type="date" name="" className="w-60 border border-neutral-400 px-4 py-2 rounded-lg mb-4"/>
                    </label> */}
                    <br/>
                    <label>
                        CPF 
                        <input type="text" name="cpf" className="w-full border border-neutral-400 px-4 py-2 rounded-lg mb-4"/>
                    </label>
                    <label>
                        Telefone 
                        <input type="text" name="telefone" className="w-full border border-neutral-400 px-4 py-2 rounded-lg mb-4"/>
                    </label>
                    <label>
                        Email 
                        <input type="text" name="email" className="w-full border border-neutral-400 px-4 py-2 rounded-lg mb-4"/>
                    </label>

                    <input type="submit" className="block mx-auto w-2/5 px-4 py-2 border border-green-600 bg-green-500 hover:bg-green-600 rounded-md text-white mt-6" value="Cadastrar" />
                </form>
            </div>
        </>
    )
}