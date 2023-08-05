import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

export const RoleManager = () => {

    const initialValues = {
        lugar: "",
        dirección: "",
        sala: "",

    };

    const validationSchema = Yup.object().shape({
        lugar: Yup.string()
            .trim()
            .required("Este campo es obligatorio")
            .min(3, "El lugar debe tener al menos 3 caracteres")
            .max(50, "El lugar no puede tener más de 50 caracteres"),
        sala: Yup.string()
            .trim()
            .required("Este campo es obligatorio")
            .min(5, "La sala debe tener al menos 5 caracteres")
            .max(100, "La sala no puede tener más de 100 caracteres"),
        dirección: Yup.string()
            .trim()
            .required("Este campo es obligatorio")
            .min(2, "La dirección debe tener al menos 5 caracteres")
            .max(30, "La dirección no puede tener más de 100 caracteres"),
    });

    const handleSubmit = (values, { resetForm }) => {
        console.log(values);
        resetForm();
    };

    return (
        <section>
            <div className="container px-4 mx-auto shadow-md">
                <h1 className="flex justify-center mb-6 text-4xl font-bold">
                    Tu Rider
                </h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form className="px-8 pt-6 pb-8 mb-4 bg-base-300">
                        <div className="mb-4">
                            <label
                                className="block mb-2 text-sm font-bold text-base-content"
                                htmlFor="lugar"
                            >
                                Lugar
                            </label>
                            <Field
                                className="w-full px-3 py-2 leading-tight border rounded shadow appearance-none text-base-content focus:outline-none focus:shadow-outline"
                                type="text"
                                name="lugar"
                            />
                            <ErrorMessage
                                name="lugar"
                                component="div"
                                className="text-sm text-red-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block mb-2 text-sm font-bold text-base-content"
                                htmlFor="dirección"
                            >
                                dirección
                            </label>
                            <Field
                                className="w-full px-3 py-2 leading-tight border rounded shadow appearance-none text-base-content focus:outline-none focus:shadow-outline"
                                type="text"
                                name="dirección"
                            />
                            <ErrorMessage
                                name="dirección"
                                component="div"
                                className="text-sm text-red-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block mb-2 text-sm font-bold text-base-content"
                                htmlFor="sala"
                            >
                                Sala
                            </label>
                            <Field
                                className="w-full px-3 py-2 leading-tight border rounded shadow appearance-none text-base-content focus:outline-none focus:shadow-outline"
                                type="text"
                                name="sala"
                            />
                            <ErrorMessage
                                name="sala"
                                component="div"
                                className="text-sm text-red-500"
                            />
                        </div>

                        <div className="container flex flex-col justify-center gap-3 mx-auto">
                            <button className="w-full btn btn-primary" type="submit">
                               Ver riders
                            </button>

                            <button className="w-full btn btn-primary" type="button">
                                Editar
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
            <div className="container px-4 mx-auto mt-4 shadow-md">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form className="px-8 pt-6 pb-8 mb-4 bg-base-300">
                        <div className="container flex flex-col justify-center gap-3 mx-auto">
                            <button className="w-full btn btn-primary" type="button">
                                Añadir una sala
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </section>
    )
}