import { useEffect, useMemo, useState } from "react";

import { getGuests } from "../DB/api";
import { Guest } from "../types";

export default function Admin() {
  const [guestsArray, setGuests] = useState<Guest[]>([]);
  const [filterApplied, setFilterApplied] = useState(false);

  useEffect(() => {
    allGuests();
  }, []);

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

  const guestsNumber = useMemo(() => {
    return guestsArray.reduce((a, c) => {
      if (c.coming) {
        if (c.guests && c.guests.length > 0 && c.guests[0].name !== "") {
          return a + 1 + c.guests.length;
        } else {
          return a + 1;
        }
      }
      return a;
    }, 0);
  }, [guestsArray]);

  const glutenSum = useMemo(() => {
    return guestsArray.reduce((a, c) => {
      if (c.coming) {
        return a + c.gluten_free;
      }
      return a;
    }, 0);
  }, [guestsArray]);

  const veganSum = useMemo(() => {
    return guestsArray.reduce((a, c) => {
      if (c.coming) {
        return a + c.vegan;
      }
      return a;
    }, 0);
  }, [guestsArray]);

  const filteredGuests = useMemo(() => {
    if (filterApplied) {
      return guestsArray.filter((guest) => guest.coming);
    }
    return guestsArray;
  }, [filterApplied, guestsArray]);

  return (
    <>
      <div
        className="bg-cover min-h-screen"
        style={{ backgroundImage: `url('./background.png')` }}
      >
        <div className="overflow-x-auto">
          <div>
            <button
              className="btn mt-5 mb-5 mr-5"
              onClick={() => setFilterApplied(!filterApplied)}
            >
              {filterApplied
                ? "הצג את כל האורחים"
                : "הצג רק את האורחים המגיעים"}
            </button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th className="text-lg">
                  שם האורח - סה"כ נרשמים: {guestsNumber}
                </th>
                <th className="text-lg">באים?</th>
                <th className="text-lg">טלפון</th>
                <th className="text-lg">רשימת אורחים נוספים</th>
                <th className="text-lg">
                  מנות ללא גלוטן - סה"כ מנות: {glutenSum}
                </th>
                <th className="text-lg">
                  מנות טבעוניות - סה"כ מנות: {veganSum}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredGuests.length > 0 ? (
                filteredGuests.map((guest, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {guest.first_name} {guest.last_name}
                    </td>
                    <td>{guest.coming ? "כן!" : "לא..."}</td>
                    <td>{guest.phone}</td>
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
                <tr className="flex items-center justify-center">
                  <td className="loading loading-ring loading-lg "></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
