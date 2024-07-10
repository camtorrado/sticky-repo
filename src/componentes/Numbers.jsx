import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "../Styles/Numbers.css";

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
  const [filteredNumbers, setFilteredNumbers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [numerosSeleccionados, setNumerosSeleccionados] = useState([]);
  const numerosMin = 2;
  console.log(numerosSeleccionados);
  const handleNumberClick = (number) => {
    if (!numerosSeleccionados.includes(number)) {
      setNumerosSeleccionados([...numerosSeleccionados, number]);
    }
  };

  const handleRemoveNumber = (number) => {
    setNumerosSeleccionados(numerosSeleccionados.filter((n) => n !== number));
  };

  useEffect(() => {
    const fetchData = async () => {
      // console.log("Starting data fetch from Supabase...");

      const { data, error } = await supabase.from("records").select("number");

      // console.log("Data fetch complete.");

      if (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
        return;
      }

      // console.log("Fetched data:", data);

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
      setFilteredNumbers(shuffledNumbers);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const result = numbers.filter((number) => number.includes(searchTerm));
    setFilteredNumbers(result);
  }, [searchTerm, numbers]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="contenedor-num">
        <h1 className="text-center fs-1">Elige tu número</h1>
        <div className="d-flex flex-wrap justify-content-center">
          {numerosSeleccionados.length > 0 &&
            numerosSeleccionados.map((number, index) => (
              <div
                key={index}
                className="mx-2"
                onClick={() => handleRemoveNumber(number)}
              >
                <div className="pt-2">
                  <h5 className="numeros-seleccionados text-center">
                    {number}
                  </h5>
                </div>
              </div>
            ))}
        </div>
        {numerosSeleccionados.length > 0 && (
          <p className="text-center fs-5 mt-2 parrafo-num">
            Para eliminar haz click en el boleto
          </p>
        )}
        {numerosSeleccionados.length > 1 && (
          <div className="d-flex justify-content-center">
            <button className="text-center fs-5 btnComprar">Comprar</button>
          </div>
        )}
      </div>

      <div className="container mt-4">
        <div className="row mb-4">
          <div className="col-12">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar números"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="row mb-5">
          {filteredNumbers.map((number, index) => (
            <div
              key={index}
              className="col-6 col-sm-4 col-md-3 col-lg-2 col-xl-1"
            >
              <div className="mb-2" onClick={() => {numerosSeleccionados.includes(number)? (handleRemoveNumber(number)):(handleNumberClick(number))}}>
                <div className="pt-2">
                  <h5
                    className={`${
                      numerosSeleccionados.includes(number)
                        ? "numeros-seleccionados"
                        : "numeros"
                    } text-center`}
                  >
                    {number}
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Numbers;
