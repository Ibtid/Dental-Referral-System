import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";

interface IRegisterInputs {
  fullName: "string";
  userName: "string";
  email: "string";
  password: "string";
  confirmPassword: "string";
  phone: "string";
}

const registerValidationSchema = object({
  fullName: string().required("Required!"),
  userName: string().required("Required!"),
  email: string().required("Required!"),
  password: string().required("Required!"),
  confirmPassword: string().required("Required!"),
  phone: string().required("Required!"),
});

const Register: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterInputs>({
    resolver: yupResolver(registerValidationSchema),
  });

  const onSubmit: SubmitHandler<IRegisterInputs> = (data) => {
    // continue with registraion api
  };

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Full Name</label>
        <input {...register("fullName")} />
        {errors.fullName?.message}
      </div>
      <div>
        <label>Username</label>
        <input {...register("userName")} />
        {errors.userName?.message}
      </div>
      <div>
        <label>Email</label>
        <input {...register("email")} />
        {errors.email?.message}
      </div>
      <div></div>
      <label>Password</label>
      <input {...register("password")} />
      {errors.password?.message}
      <div>
        <label>Confirm Password</label>
        <input {...register("confirmPassword")} />
        {errors.confirmPassword?.message}
      </div>
      <div>
        <label>Phone</label>
        <input {...register("phone")} />
        {errors.phone?.message}
      </div>

      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
