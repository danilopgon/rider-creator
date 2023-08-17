import useBand from "../../context/BandContext";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { CardUserBand } from "../CardUserBand";

import { toast } from "react-hot-toast";

export const StepTwo = () => {
  const { storeBand, actionsBand } = useBand();
  const { findUser, members, userList, showAutocompleteUser } = storeBand;
  const {
    handleFindUser,
    handleSelectUser,
    handleAddMemberNotRegistred,
    handleOnSubmitAddMember,
    handleDeleteMember,
  } = actionsBand;

  const initialValues = {
    name: "",
    musician: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .required("Este campo es obligatorio")
      .min(3, "El lugar debe tener al menos 3 caracteres")
      .max(50, "El lugar no puede tener más de 50 caracteres"),
    musician: Yup.string()
      .trim()
      .required("Este campo es obligatorio")
      .min(3, "La sala debe tener al menos 5 caracteres")
      .max(100, "La sala no puede tener más de 100 caracteres"),
  });

  return (
    <div className="flex flex-col w-full h-full gap-4 p-4 rounded bg-base-100/50 p-5 rounded-lg backdrop-blur-sm sm:w-full lg:w-full xl:w-full animate-fade-left">
      <h2 className="text-xl font-semibold text-center text-base-content ">
        Agrega miembros a tu banda
      </h2>
      <Formik validationSchema={validationSchema} initialValues={initialValues}>
        <Form
          onSubmit={handleOnSubmitAddMember}
          className="flex flex-col items-center gap-2 ring-0 active:border-0"
        >
          <div className="md:w-[60%] w-[90%] flex flex-col flex-nowrap">
            <label
              htmlFor="inputMusician "
              className="flex p-0 border rounded bg-slate-100 justify-evenly"
            >
              <Field
                className="w-full md:w-[70%] p-1 m-0 text-xl border-0 bg-slate-100"
                name="name"
                type="text"
                id="inputMusician"
                placeholder="Agrega un miembro"
                onChange={handleFindUser}
                value={findUser?.length !== 0 ? findUser : ""}
                autocomplete="off"
              />
            </label>
            <div
              className={`absolute border bg-slate-50 w-[15rem] h-auto flex flex-col mt-9 ${
                showAutocompleteUser ? "" : "hidden"
              }`}
            >
              <div className="h-auto">
                {!userList?.length > 0 && (
                  <ul className="p-2">
                    <li className="flex items-center justify-between">
                      {findUser}
                      <button
                        type="button"
                        className="text-2xl"
                        onClick={handleAddMemberNotRegistred}
                      >
                        +
                      </button>
                    </li>
                    <li>user not found</li>
                  </ul>
                )}

                {userList.length > 0 && (
                  <ul>
                    {userList?.map((user) => {
                      return (
                        <li
                          className="flex items-center justify-between p-2"
                          id={user.user.id}
                          key={user.user.id}
                        >
                          {user.user.username}
                          <button
                            onClick={handleSelectUser}
                            type="button"
                            className="text-2xl"
                          >
                            +
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div className="h-[42vh] w-[100%] sm:w-[90%] flex flex-col gap-2 p-2 overflow-y-auto">
            {members.map((member) => {
              return (
                <CardUserBand
                  member={member}
                  handler={handleDeleteMember}
                  key={member?.id}
                />
              );
            })}
          </div>
          <div className="flex gap-4">
            <button type="submit" className="btn btn-primary">
              Finalizar
            </button>
            <button
              className="btn btn-error"
              type="button"
              onClick={() => window.my_modal_5.showModal()}
            >
              Cancelar
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
