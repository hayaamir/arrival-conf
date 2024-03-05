import { useFieldArray, useForm } from "react-hook-form";
import confetti from "canvas-confetti";
import Plus from "../public/plus";
import { createGuest } from "./DB/api";
import { Guest } from "./types";

export default function Form() {
  const {
    // reset,
    register,
    handleSubmit,
    control,
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
    await createGuest(data);
    // reset(); // comment for testing
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
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
              id="first_name"
              type="text"
              placeholder="שם פרטי"
              {...register("first_name", { required: "שם פרטי הינו חובה" })}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-400 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        {errors.first_name && <p>{errors.first_name.message}</p>}

        <div>
          <div className="mt-3">
            <input
              type="text"
              placeholder="שם משפחה"
              {...register("last_name", { required: "שם משפחה הינו חובה" })}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-400 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        {errors.last_name && <p>{errors.last_name.message}</p>}

        <div>
          <div className="mt-3">
            <input
              type="tel"
              placeholder="מספר טלפון נייד"
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
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-400 sm:text-sm sm:leading-6 text-right mb-4"
            />
          </div>
        </div>
        {errors.phone && <p>{errors.phone.message}</p>}

        <div>* אין צורך לרשום ילדים מגיל שש ומטה</div>

        <label>
          <div className="text-lg">
            <span>הוסף את שמות בני המשפחה שבאים</span>
          </div>
          <div className="flex items-end gap-2 mb-4">
            <div className="flex flex-col gap-1">
              {fields.map((field, index) => (
                <input
                  key={field.id}
                  type="text"
                  placeholder="שם מלא"
                  className="input input-bordered input-sm "
                  {...register(`guests.${index}.name`)}
                />
              ))}
            </div>
            <button className="w-6 cursor-pointer" onClick={addGuest}>
              <Plus />
            </button>
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

        <div className="text-lg">
          <p>בקשת מנה מיוחדת</p>
        </div>

        <div className="mb-8">
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
