"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {turmaSchema, TurmaFormData} from "@/schemas/turmaSchema";
import { useEffect } from "react";

interface TurmaFormProps {
  onSubmit: (data: TurmaFormData) => Promise<void>;
  defaultValues?: TurmaFormData;
  loading?: boolean;
}

export default function TurmaForm({

  onSubmit,
  defaultValues,
  loading = false,

}: TurmaFormProps) {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TurmaFormData>({
    resolver: zodResolver(turmaSchema),
    defaultValues,
  });

    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues);
        }
    }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <div>
        <label>Nome da turma</label>

        <input
          {...register("nome")}
          className="w-full border rounded p-2"
        />

        <p className="text-red-500 text-sm">
          {errors.nome?.message}
        </p>
      </div>
      <div>
        <label>Curso</label>

        <input
          {...register("curso")}
          className="w-full border rounded p-2"
        />

        <p className="text-red-500 text-sm">
          {errors.curso?.message}
        </p>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white rounded px-4 py-2"
      >
        {loading? "Salvando...": "Salvar"}
      </button>
    </form>
  );
}