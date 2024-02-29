import MapPin from "../public/map-pin";

export default function Card() {
  return (
    <div className="text-center pb-8">
      <p className="text-3xl mb-4">
        אנו שמחים ונרגשים להזמין אתכם לחגוג עמנו את יום נישואינו
      </p>

      <div className="mb-4 text-lg">
        <p>יום ראשון - כ"ח אדר ב' התשפ"ד</p>
      </div>

      <div className="mb-4">
        <p className="text-5xl">07.04.2024</p>
      </div>

      <div className="mb-4 text-lg">
        <p>גן האירועים רוקח</p>
        <div className="flex items-center justify-center gap-1">
          <div className="w-5">
            <MapPin />
          </div>
          <p>תל אביב, ישראל</p>
        </div>
      </div>

      <div className="mb-12 text-lg">
        <p>קבלת פנים - 18:30</p>
        <p>חופה וקידושין - 19:30</p>
      </div>

      <div className="flex justify-between mx-auto max-w-80 text-lg">
        <p className="flex flex-col">
          <span className="font-bold leading-3">הורי הכלה</span>
          <span>אלקנה ואיטה</span>
        </p>
        <p className="flex flex-col">
          <span className="font-bold leading-3">הורי החתן</span>
          <span>לירון וגלי</span>
        </p>
      </div>

      <button className="btn btn-outline mb-4">להזמנה מודפסת</button>
    </div>
  );
}
