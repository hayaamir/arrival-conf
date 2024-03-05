import { useFieldArray, useForm } from "react-hook-form";
import confetti from "canvas-confetti";
import Plus from "../public/plus";
import { createGuest } from "./DB/api";
import { Guest } from "./types";

export default function Form() {
  const {
    reset,
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
    reset();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
    alert("ההרשמה נקלטה בהצלחה!");
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
              {...register("first_name", {
                required: "שדה חובה, אנא הזן שם פרטי",
                minLength: {
                  value: 2,
                  message: "שם פרטי קצר מדי, אנא הזן לפחות 2 תווים",
                },
                maxLength: {
                  value: 15,
                  message: "שם פרטי ארוך מדי, אנא הזן עד 15 תווים",
                },
                pattern: {
                  value: /[\u05D0-\u05EA]+/i,
                  message:
                    "שם פרטי מכיל תווים שאינם אותיות בעברית, אנא נסה שוב",
                },
              })}
              aria-invalid={errors.first_name ? "true" : "false"}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-400 sm:text-sm sm:leading-6"
            />
            {errors.first_name && <p>{errors.first_name.message}</p>}
          </div>
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
                  message: "שם משפחה חייב להכיל לפחות 2 תווים",
                },
                maxLength: {
                  value: 15,
                  message: "שם משפחה לא יכול להכיל יותר מ-10 תווים",
                },
                pattern: {
                  value: /[\u05D0-\u05EA]+/i,
                  message: "נא להזין שם משפחה בעברית בלבד",
                },
              })}
              aria-invalid={errors.last_name ? "true" : "false"}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-400 sm:text-sm sm:leading-6"
            />
            {errors.last_name && <p>{errors.last_name.message}</p>}
          </div>
        </div>

        <div>
          <div className="mt-3">
            <input
              type="tel"
              placeholder="מספר טלפון נייד"
              {...register("phone", {
                required: "מספר טלפון הוא שדה חובה",
                pattern: {
                  value: /^(05\d{8}|0\d{9})$/,
                  message: "אנא הזן מספר תקין",
                },
              })}
              aria-invalid={errors.phone ? "true" : "false"}
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
          {errors.coming && (
            <p>{errors.coming.message || "חובה לבחור אחת מהאפשרויות"}</p>
          )}
        </div>

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
            {errors.gluten_free && <p>{errors.gluten_free.message}</p>}
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
            {errors.vegan && <p>{errors.vegan.message}</p>}
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
