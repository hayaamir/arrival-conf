import { useEffect, useState } from "react";
import { getGuests } from "./DB/api";
import { Guest } from "./types";

export default function Admin() {
  const [guestsArray, setGuests] = useState<Guest[]>([]);

  useEffect(() => {
    allGuests();
  }, []);

  useEffect(() => {}, [guestsArray]);

  async function allGuests() {
    try {
      const { guests, error } = await getGuests();
      if (error) {
        console.error("Error fetching guests:", error);
        return;
      }
      if (guests) {
        setGuests(guests);
      }
    } catch (error) {
      console.error("Error fetching guests:", error);
    }
  }

  return (
    <>
      <div
        className="bg-cover min-h-screen"
        style={{ backgroundImage: `url('./background.png')` }}
      >
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th className="text-lg">שם האורח</th>
                <th className="text-lg">טלפון</th>
                <th className="text-lg">אמייל</th>
                <th className="text-lg">רשימת אורחים נוספים</th>
                <th className="text-lg">מנות ללא גלוטן</th>
                <th className="text-lg">מנות טבעוניות</th>
              </tr>
            </thead>
            <tbody>
              {guestsArray && guestsArray.length > 0 ? (
                guestsArray.map((guest, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {guest.first_name}
                      {guest.last_name}
                    </td>
                    <td>{guest.phone}</td>
                    <td>{guest.email}</td>
                    <td>
                      {guest.guests.map((g, i) => (
                        <span key={i}>
                          {g.name}
                          {i !== guest.guests.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </td>
                    <td>{guest.gluten_free}</td>
                    <td>{guest.vegan}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7}>
                    <span className="loading loading-ring loading-lg"></span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
