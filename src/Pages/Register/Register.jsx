import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import st from "./Register.module.css";

const schema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required("Senha é obrigatória"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "As senhas não conferem")
    .required("Confirmação de senha é obrigatória"),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    // Enviar os dados para o backend
    // fetch('/api/register', { method: 'POST', body: JSON.stringify(data) })
  };

  return (
    <div className={st.registerContainer}>
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={st.form}>
        <div className={st.formGroup}>
          <label>Nome</label>
          <input {...register("name")} placeholder="Seu nome" />
          {errors.name && <p className={st.error}>{errors.name.message}</p>}
        </div>

        <div className={st.formGroup}>
          <label>E-mail</label>
          <input {...register("email")} placeholder="Seu e-mail" />
          {errors.email && <p className={st.error}>{errors.email.message}</p>}
        </div>

        <div className={st.formGroup}>
          <label>Senha</label>
          <input type="password" {...register("password")} placeholder="Sua senha" />
          {errors.password && (
            <p className={st.error}>{errors.password.message}</p>
          )}
        </div>

        <div className={st.formGroup}>
          <label>Confirme sua senha</label>
          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="Confirme sua senha"
          />
          {errors.confirmPassword && (
            <p className={st.error}>{errors.confirmPassword.message}</p>
          )}
        </div>

        <button type="submit" className={st.submitButton}>Cadastrar</button>
      </form>
    </div>
  );
};

export default Register;
