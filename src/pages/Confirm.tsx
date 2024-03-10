export default function Confirm() {
  return (
    <>
      <div
        className="bg-cover min-h-screen flex justify-center items-center"
        style={{ backgroundImage: `url('./background.png')` }}
      >
        <div className="text-lg text-center flex flex-col justify-center items-center ml-6 mr-6">
          <img src="/Wine glasses.png" width="300" alt="Wine glasses" />
          <p className="text-xl	font-bold	">תודה רבה על העדכון</p>
          <p>
            במידה וחלה טעות בפרטים או בכל מקרה של שינוי, אנו פנו אל גלי אמיר
          </p>
          <a
            href="https://wa.me/972528230063"
            className="flex justify-center items-center hover:underline"
          >
            לחצו כאן כדי לשוחח בוואטסאפ
          </a>
          <div className="mt-10">
            <p className="font-bold">
              מתכננים אירוע בקרוב? ליצירת הזמנה ואישורי הגעה
            </p>
            <a href="https://wa.me/972546012967" className="underline">
              לחצו כאן
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
