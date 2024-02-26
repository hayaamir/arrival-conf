import { useFieldArray, useForm } from "react-hook-form";

import Plus from "../public/plus";

export type Inputs = {
  first_name: string;
  last_name: string;
  phone: string;
  guests: { name: string }[];
  gluten_free: number;
  vegan: number;
  coming: string;
  not_coming: string;
};

export default function Form() {
  const {
    reset,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      guests: [{ name: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({ name: "guests", control });

  const addGuest = () => {
    append({ name: "" });
  };

  const onSubmit = (data: any) => {
    console.log(data);
    reset();
  };

  return (
    <div>
      <div className="text-center">
        <h2>אישור הגעה</h2>
        <p>נשמח לראותכם בין אורחינו</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="mt-2">
            <input
              id="first_name"
              type="text"
              placeholder="שם פרטי"
              {...register("first_name", { required: "שם פרטי הינו חובה" })}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-300 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        {errors.first_name && <p>{errors.first_name.message}</p>}

        <input
          type="text"
          placeholder="שם משפחה"
          className="input input-bordered input-xs w-full max-w-xs"
          {...register("last_name", { required: "שם משפחה הינו חובה" })}
        />
        {errors.last_name && <p>{errors.last_name.message}</p>}

        <input
          type="tel"
          placeholder="מספר טלפון נייד"
          className="input input-bordered input-xs w-full max-w-xs"
          {...register("phone", {
            required: "מספר טלפון הוא שדה חובה",
            pattern: {
              value: /^[0-9]+$/,
              message: "מספרים בלבד",
            },
            maxLength: {
              value: 12,
              message: "אורך מקסימלי 12 ספרות",
            },
          })}
        />
        {errors.phone && <p>{errors.phone.message}</p>}

        <div>אין צורך לרשום ילדים מגיל שש ומטה *</div>

        <label>
          <div>
            <span>הוסף את שמות בני המשפחה שבאים</span>
          </div>
          <div className="flex items-end gap-2">
            <div className="flex flex-col gap-1">
              {fields.map((field, index) => (
                <input
                  key={field.id}
                  type="text"
                  placeholder="שם מלא"
                  className="input input-bordered input-sm"
                  {...register(`guests.${index}.name`)}
                />
              ))}
            </div>
            <button className="w-6 cursor-pointer" onClick={addGuest}>
              <Plus />
            </button>
          </div>
        </label>

        <div className="form-control">
          <label className="label cursor-pointer flex justify-start">
            <input
              {...register("coming", { required: true })}
              type="radio"
              value="coming"
              className="radio checked:bg-red-500"
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
              className="radio checked:bg-blue-500"
              name="coming"
            />
            <span className="label-text">לא מגיעים</span>
          </label>
        </div>

        <div>
          <p>בקשת מנה מיוחדת</p>

          <label>
            <div>
              <span>ללא גלוטן</span>
            </div>
            <input type="number" placeholder="0" {...register("gluten_free")} />
          </label>

          <label>
            <div>
              <span>טבעוני</span>
            </div>
            <input type="number" placeholder="0" {...register("vegan")} />
          </label>
        </div>

        <div className="card-actions justify-end">
          <button className="btn btn-secondary btn-sm" type="submit">
            אישור
          </button>
        </div>
      </form>
    </div>
  );
}
