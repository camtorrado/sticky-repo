import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.PROJECT_URL;
const supabaseKey = process.env.API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const generateNumbers = () => {
  const numbers = [];
  for (let i = 0; i < 10000; i++) {
    numbers.push(i.toString().padStart(4, "0"));
  }
  return numbers;
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Numbers = () => {
  const [numbers, setNumbers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Starting data fetch from Supabase...");

      const { data, error } = await supabase.from("records").select("number");

      console.log("Data fetch complete.");

      if (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
        return;
      }

      console.log("Fetched data:", data);

      const validData = data.filter(
        (item) => item.number !== null && item.number !== undefined
      );

      const dbNumbers = validData.map((item) =>
        item.number.toString().padStart(4, "0")
      );
      const allNumbers = generateNumbers();
      const filteredNumbers = allNumbers.filter(
        (number) => !dbNumbers.includes(number)
      );

      // Mezcla los números filtrados
      const shuffledNumbers = shuffleArray(filteredNumbers);

      setNumbers(shuffledNumbers);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        {numbers.map((number, index) => (
          <div key={index} className="col-3 col-sm-2 col-md-1">
            <div className="card mb-3 border border-secondary">
              <div className="mt-2">
                <h5 className="card-title text-center">{number}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Numbers;
