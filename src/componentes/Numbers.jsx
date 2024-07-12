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

const Numbers = ({ estadoFormulario, setEstadoFormulario, numerosSeleccionados, setNumerosSeleccionados, reinicio }) => {
  const [numbers, setNumbers] = useState([]);
  const [filteredNumbers, setFilteredNumbers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [statusChanges, setStatusChanges] = useState(null);

  const handleNumberClick = (number) => {
    if (!numerosSeleccionados.includes(number)) {
      setNumerosSeleccionados([...numerosSeleccionados, number]);
    }
  };

  const handleRemoveNumber = (number) => {
    setNumerosSeleccionados(numerosSeleccionados.filter((n) => n !== number));
  };

  const fetchData = async () => {
    setLoading(true); // Cambiar a true mientras se carga
    try {
      const { data, error } = await supabase.from("PeopleRecords").select("tickets");
      if (error) {
        // console.error("Error fetching data:", error);
        setLoading(false);
        return;
      }

      // Assuming 'tickets' is an array of numbers
      const dbNumbers = data.flatMap(item => item.tickets || []);
      const allNumbers = generateNumbers();
      const filteredNumbers = allNumbers.filter(number => !dbNumbers.includes(number));

      // Mezcla los números filtrados
      const shuffledNumbers = shuffleArray(filteredNumbers);

      setNumbers(shuffledNumbers);
      setFilteredNumbers(shuffledNumbers);
      setLoading(false);
    } catch (error) {
      // console.error('Error en la obtención de datos:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [reinicio, statusChanges]);

  useEffect(() => {
    const result = numbers.filter(number => number.includes(searchTerm));
    setFilteredNumbers(result);
  }, [searchTerm, numbers]);

  useEffect(() => {
    const changes = supabase
    .channel('schema-db-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'PeopleRecords'
      },
      (payload) => {
        // console.log(payload)
        fetchData();
      }
    )
    .subscribe()
  }, []);

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
            <button className="text-center fs-5 btnComprar" onClick={() => {setEstadoFormulario(!estadoFormulario)}} >Comprar</button>
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
