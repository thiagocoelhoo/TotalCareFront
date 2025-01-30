import { z } from "zod";

export const Paciente = z.object({
    id: z.number(),
    nome: z.string(),
    sobrenome: z.string(),
    cpf: z.string(),
    email: z.string().email(),
    telefone: z.string(),
    nascimento: z.date()
});

export const Medico = z.object({
    id: z.number(),
    nome: z.string(),
    especialidade: z.string(),
    email: z.string().email(),
    telefone: z.string()
});

export const Consulta = z.object({
    paciente: Paciente,
    medico: Medico,
    data: z.string().datetime(),
    estado: z.string(),
    urgencia: z.string(),
});

export const Receita = z.object({
    paciente: Paciente,
    consulta: Consulta,
    receita: z.string(),
});

export type PacienteType = z.infer<typeof Paciente>;
export type MedicoType = z.infer<typeof Medico>;
export type ConsultaType = z.infer<typeof Consulta>;
