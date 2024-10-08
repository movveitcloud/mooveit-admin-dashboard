import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { FormInput, FormPassword, AuthLayout } from "../components";

import { login } from "../redux/features/auth.slice";

const Login = () => {
  const { loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();
    const payload = { ...data };
    dispatch(login({ payload, reset }));
    console.log(process.env);
  };

  return (
    <AuthLayout title="Log In">
      <div className="text-center">
        <h1 className="font-semibold text-2xl md:text-3xl text-black mb-10">Account Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label="Email Address"
            name="email"
            type="email"
            register={register}
            errors={errors}
            errorMessage="Please add an email address"
          />
          <FormPassword register={register} name="password" errors={errors} errorMessage="Please add a password" />
          <div className="flex justify-end">
            <Link href="/forgot-password">
              <a className="text-red-500 text-sm">Forgot Password?</a>
            </Link>
          </div>
          <button className={`${loading && "loading"} btn btn-block btn-primary mt-8`} type="submit">
            {loading ? "" : "Log in"}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
