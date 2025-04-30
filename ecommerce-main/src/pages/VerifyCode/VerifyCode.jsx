import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function VerifyCode() {
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const buttonProps = {
    type: 'submit',
    className:
      'text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800',
  };

  const navigate = useNavigate();

  function handleResetCode(data) {
    setIsLoading(true);

    axios
      .post('https://localhost4002//api/v1/auth/verifyResetearCodigo', data)
      .then((data) => {
        setErr(null);
        setIsLoading(false);
        if (data.data.status === 'Success') {
          navigate('resetPassword');
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setErr(err.response.data.message);
      });
  }

  const validate = Yup.object({
    resetCode: Yup.string()
      .required('El código es obligatorio')
      .matches(/^[0-9]{6}$/, 'El código debe tener 6 dígitos'),
  });

  const formik = useFormik({
    initialValues: {
      resetCode: '',
    },
    onSubmit: handleResetCode,
    validationSchema: validate,
  });

  return (
    <>
      <Helmet>
        <title>Verificar Código</title>
      </Helmet>

      <form
        method="post"
        className="max-w-md mx-auto"
        onSubmit={formik.handleSubmit}
      >
        <h1 className="text-2xl text-gray-500 mb-5 font-bold">
          Ingresa el código de verificación:
        </h1>
        {err && <div className="bg-red-300 py-1 mb-4 font-light">{err}</div>}

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="resetCode"
            id="resetCode"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.resetCode}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="resetCode"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Código de 6 dígitos
          </label>
          {formik.errors.resetCode && formik.touched.resetCode && (
            <span className="text-red-600 font-light text-sm">
              {formik.errors.resetCode}
            </span>
          )}
        </div>
        <p
          id="helper-text-explanation"
          className="mt-2 mb-5 text-sm text-gray-500 dark:text-gray-400"
        >
          Por favor, ingresa el código de 6 dígitos que enviamos por correo electrónico.
        </p>

        {isLoading ? (
          <button {...buttonProps} disabled>
            <i className="fa-solid fa-spinner animate-spin"></i>
          </button>
        ) : (
          <button {...buttonProps}>Enviar</button>
        )}
      </form>
    </>
  );
}
