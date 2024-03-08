import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Plus from "../icons/plus";
import { createGuest } from "../DB/api";
import { Guest } from "../types";
import ErrorBar from "./ErrorBar";

export default function Form() {
  const navigate = useNavigate();

  const {
    reset,
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<Guest>({
    defaultValues: {
      guests: [{ name: "" }],
    },
  });

  const { fields, append } = useFieldArray({ name: "guests", control });

  const addGuest = () => {
    append({ name: "" });
  };

  const onSubmit = async (data: any) => {
    const error = await createGuest(data);
    if (error) {
      setError("root", error);
      alert("ניתן לאשר הגעה פעם אחת בלבד, מייל זה כבר מופיע במערכת");
    } else {
      reset();
      navigate("/Confirm");
    }
  };

  return (
    <div>
      <div className="text-center text-lg">
        <h2 className="font-bold text-2xl">אישור הגעה</h2>
        <p>נשמח לראותכם בין אורחינו</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="mt-3">
            <input
              type="text"
              placeholder="שם פרטי"
              {...register("first_name", {
                required: "שם פרטי הינו חובה",
                minLength: {
                  value: 2,
                  message: "שם פרטי קצר מדי, אנא הזן לפחות 2 תווים",
                },
                maxLength: {
                  value: 15,
                  message: "שם פרטי ארוך מדי, אנא הזן עד 15 תווים",
                },
                pattern: {
                  value: /^[א-ת]+$/i,
                  message:
                    "שם פרטי מכיל תווים שאינם אותיות בעברית, אנא נסה שוב",
                },
              })}
              aria-invalid={errors.first_name ? "true" : "false"}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-400 sm:text-sm sm:leading-6"
            />
          </div>
          <ErrorBar error={errors.first_name} />
        </div>

        <div>
          <div className="mt-3">
            <input
              type="text"
              placeholder="שם משפחה"
              {...register("last_name", {
                required: "שם משפחה הינו חובה",
                minLength: {
                  value: 2,
                  message: "שם משפחה קצר מדי, אנא הזן לפחות 2 תווים",
                },
                maxLength: {
                  value: 15,
                  message: "שם משפחה ארוך מדי, אנא הזן עד 15 תווים",
                },
                pattern: {
                  value: /^[א-ת]+$/i,
                  message:
                    "שם משפחה מכיל תווים שאינם אותיות בעברית, אנא נסה שוב",
                },
              })}
              aria-invalid={errors.last_name ? "true" : "false"}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-400 sm:text-sm sm:leading-6"
            />
          </div>
          <ErrorBar error={errors.last_name} />
        </div>

        <div>
          <div className="mt-3">
            <input
              type="tel"
              placeholder="מספר טלפון נייד"
              {...register("phone", {
                required: "מספר טלפון הינו חובה",
                pattern: {
                  value: /^(05\d{8}|0\d{9})$/,
                  message: "אנא הזן מספר תקין",
                },
              })}
              aria-invalid={errors.phone ? "true" : "false"}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-400 sm:text-sm sm:leading-6 text-right"
            />
          </div>
          <ErrorBar error={errors.phone} />
        </div>

        <div>
          <div className="mt-3">
            <input
              type="email"
              placeholder="אימייל"
              {...register("email", {
                required: "אימייל הינו חובה",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "ישנה טעות בכתובת המייל, אנא נסה שוב",
                },
              })}
              aria-invalid={errors.email ? "true" : "false"}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-400 sm:text-sm sm:leading-6 text-right"
            />
          </div>
        </div>
        <ErrorBar error={errors.email} />

        <div>* אין צורך לרשום ילדים מגיל שש ומטה</div>

        <label>
          <div className="text-lg">
            <span>הוסף את שמות בני המשפחה שבאים</span>
          </div>
          <div className="flex items-end gap-2 mb-4">
            <div className="flex flex-col gap-1">
              {fields.map((field, index) => (
                <div key={field.id}>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="שם מלא"
                      className="input input-bordered input-sm"
                      {...register(`guests.${index}.name`, {
                        minLength: {
                          value: 2,
                          message: "שם מלא קצר מדי, אנא הזן לפחות שני תווים",
                        },
                        maxLength: {
                          value: 15,
                          message: "שם מלא ארוך מדי, אנא הזן עד 15 תווים",
                        },
                        pattern: {
                          value: /^[א-ת]+$/i,
                          message: "אנא הזן שם בעברית בלבד",
                        },
                      })}
                    />
                    {index === fields.length - 1 && (
                      <button className="w-6 cursor-pointer" onClick={addGuest}>
                        <Plus />
                      </button>
                    )}
                  </div>
                  {errors && errors.guests && errors.guests[index]?.name && (
                    <div
                      className="px-4 py-1 mb-4 ml-8 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                      role="alert"
                    >
                      <span className="font-medium">
                        {errors?.guests[index]?.name?.message}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </label>

        <div className="mb-4">
          <div className="form-control">
            <label className="label cursor-pointer flex justify-start">
              <input
                {...register("coming", { required: true })}
                type="radio"
                value="coming"
                className="radio"
                name="coming"
              />
              <span className="label-text">מגיעים</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer flex justify-start">
              <input
                {...register("coming", { required: true })}
                type="radio"
                value="not_coming"
                className="radio"
                name="coming"
              />
              <span className="label-text">לא מגיעים</span>
            </label>
          </div>
        </div>
        {errors.coming && (
          <div
            className="px-4 py-1  mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">
              {errors.coming.message || "אנא בחר באחת מהאפשרויות"}
            </span>
          </div>
        )}

        <div className="text-lg">
          <p>בקשת מנה מיוחדת</p>
        </div>

        <div className="mb-8">
          <label>
            <div>
              <span>ללא גלוטן</span>
            </div>
            <input
              type="number"
              placeholder="0"
              {...register("gluten_free", {
                validate: (value) => {
                  if (value < 0 || value > 10 || isNaN(value)) {
                    return "ניתן להזמין עד עשר מנות ללא גלוטן, במקרה הצורך אנא צור קשר עם איטה ספרנאי או גלי אמיר";
                  }
                },
              })}
            />
            <ErrorBar error={errors.gluten_free} />
          </label>

          <label>
            <div>
              <span>טבעוני</span>
            </div>
            <input
              type="number"
              placeholder="0"
              {...register("vegan", {
                validate: (value) => {
                  if (value < 0 || value > 10 || isNaN(value)) {
                    return "ניתן להזמין עד עשר מנות ללא גלוטן, במקרה הצורך אנא צור קשר עם איטה ספרנאי או גלי אמיר";
                  }
                },
              })}
            />
            <ErrorBar error={errors.vegan} />
          </label>
        </div>

        <div className="card-actions justify-right mb-4">
          <button
            className="btn btn-md bg-[#3c4f5b] text-white 	hover:bg-[#bfb58b]"
            type="submit"
          >
            אישור
          </button>
        </div>

        <div>במקרה של שינוי אנא עדכנו את איטה ספרנאי או גלי אמיר🙏</div>
      </form>
    </div>
  );
}
