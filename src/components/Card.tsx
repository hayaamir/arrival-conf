import { Link } from "react-router-dom";

import MapPin from "../icons/map-pin";

export default function Card() {
  return (
    <div className="text-center pb-8">
      <p className="text-3xl mb-4">
        אנו שמחים ונרגשים להזמין אתכם לחגוג עמנו את יום נישואינו
      </p>

      <div className="mb-4 text-lg">
        <p>07.04.2024</p>
      </div>

      <div className="mb-4">
        <p className="text-3xl">יום ראשון - כ"ח אדר ב' התשפ"ד</p>
      </div>

      <div className="mb-4 text-lg">
        <p>גן האירועים רוקח</p>
        <div className="flex items-center justify-center gap-1">
          <a
            href="https://maps.app.goo.gl/a77caaYRJ99FSJsL6"
            className="w-5"
            target="_blank"
          >
            <MapPin />
          </a>
          <p>תל אביב, ישראל</p>
        </div>
      </div>

      <div className="mb-12 text-lg">
        <p>קבלת פנים - 18:30</p>
        <p>חופה וקידושין - 19:30</p>
      </div>

      <div className="flex justify-between mx-auto max-w-80 text-lg">
        <p className="flex flex-col">
          <span className="font-bold leading-3">הורי החתן</span>
          <span>לירון וגלי אמיר</span>
        </p>
        <p className="flex flex-col">
          <span className="font-bold leading-3">הורי הכלה</span>
          <span>אלקנה ואיטה ספרנאי</span>
        </p>
      </div>

      <Link to={"Invitation"} target="_blank">
        <button className="btn btn-outline mt-10 text-[#3C4F5B] hover:bg-[#3C4F5B] border-[#3C4F5B]">
          להזמנה מודפסת
        </button>
      </Link>
    </div>
  );
}
