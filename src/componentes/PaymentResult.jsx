import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Styles/PaymentResult.css";

const PaymentResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(15);
  const [txStatus, setTxStatus] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [codesData, setCodesData] = useState(null);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1); // Restar 1 segundo
    }, 1000); // Actualizar cada segundo

    return () => {
      clearInterval(timer); // Limpiar el intervalo cuando el componente se desmonta
    };
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      navigate("/"); // Redirigir al usuario a la ruta principal ("/") cuando los segundos lleguen a 0
    }
  }, [seconds]);

  useEffect(() => {
    const fetchOrderData = async (orderId) => {
      try {
        const response = await fetch(
          `https://sticky-api-ten.vercel.app/api/people/${orderId}`
        );
        const data = await response.json();
        setOrderData(data);
        return data;
      } catch (error) {
        setError(error);
        // console.error("Error fetching order data:", error);
      }
    };

    const fetchCodesData = async (quantity) => {
      try {
        const response = await fetch(
          `https://sticky-api-ten.vercel.app/api/codes?quantity=${quantity}`
        );
        const data = await response.json();
        setCodesData(data.codes);
        // console.log("Codes data:", data.codes);
        return data.codes;
      } catch (error) {
        setError(error);
        // console.error("Error fetching codes data:", error);
      }
    };

    const postRecordsData = async (id, codes) => {
      const payload = {
        personId: id,
        codes: codes,
      };
      try {
        const response = await fetch(
          `https://sticky-api-ten.vercel.app/api/records`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );
        const data = await response.json();
        // console.log("Post records data response:", data);
        return data;
      } catch (error) {
        setError(error);
        // console.error("Error posting records data:", error);
      }
    };

    const deleteOrderData = async (id) => {
      try {
        const response = await fetch(
          `https://sticky-api-ten.vercel.app/api/people/${id}`,
          {
            method: "DELETE",
          }
        );
        const data = await response.json();
        // console.log("Delete order data response:", data);
        return data;
      } catch (error) {
        setError(error);
        // console.error("Error deleting order data:", error);
      }
    };

    const handleFetches = async () => {
      const searchParams = new URLSearchParams(location.search);
      const orderId = searchParams.get("bold-order-id");
      const status = searchParams.get("bold-tx-status");

      if (localStorage.getItem(`transaction_${orderId}`) === "processed") {
        navigate("/");
        return;
      }

      if (!orderId || !status) {
        return; // No se realiza ninguna acción si los parámetros están vacíos
      }

      if (status === "approved") {
        // console.log(`Pago aprobado. Order ID: ${orderId}`);
        setIsProcessing(true);
        setTxStatus("approved");

        const orderData = await fetchOrderData(orderId);
        if (orderData) {
          // console.log("Order data:", orderData);
          // console.log("Order ID:", orderData.id);
          // console.log("Quantity:", orderData.quantity);

          const codes = await fetchCodesData(orderData.quantity);
          if (codes) {
            await postRecordsData(orderData.id, codes);
          }
        }

        localStorage.setItem(`transaction_${orderId}`, "processed");
        setIsProcessing(false);
      } else {
        // console.log(`Pago rechazado. Order ID: ${orderId}`);
        setIsProcessing(true);
        setTxStatus("rejected");

        const orderData = await fetchOrderData(orderId);
        if (orderData) {
          // console.log("Order data:", orderData);
          // console.log("Order ID:", orderData.id);
          // console.log("Quantity:", orderData.quantity);
          await deleteOrderData(orderData.id);
        }

        setIsProcessing(false);
      }
    };

    handleFetches();
  }, []); // Utiliza location.search en lugar de location para evitar re-renderizaciones innecesarias

  return (
    <div className="fondo">
      {txStatus === "approved" && orderData && codesData && (
        <>
          <h1 className="text-center titulo-resultado">Resultado del Pago</h1>
          <div className="contenedor-aprovado">
            <p className="text-center fs-3">
              ¡Tu pago ha sido aprobado!{" "}
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-patch-check-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708" />
                </svg>
              </span>
            </p>
            <div className="text-center">
              <p>ID de Orden: {orderData.id}</p>
              <p className="fs-5">Cantidad: {orderData.quantity}</p>
              <h2>Códigos</h2>
              <div className="contenedor-codigos">
                {codesData.map((code, index) => (
                  <p className="codigos" key={index}>
                    {code}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="footer-resultado">
            <p className="text-center my-4">
              Este componente redirigirá automáticamente a la página principal
              después de {seconds} segundos.
            </p>
            <button className="btn-volver" onClick={() => navigate("/")}>
              Volver ahora
            </button>
          </div>
        </>
      )}
      {txStatus !== "approved" && (
        <>
          <h1 className="text-center titulo-resultado">Resultado del Pago</h1>
          <div className="contenedor-aprovado">
            <p className="fs-3 text-center">
              El pago no ha sido aprobado {""}
              <span className="icon-cancel">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-x-circle-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                </svg>
              </span>
            </p>
            <p className="text-center">
              Por favor, verifica la información de tu tarjeta de crédito o
              inténtalo nuevamente más tarde.
            </p>
            <p>Otras opciones:</p>
            <ul>
              <li>
                Revisa tu cuenta bancaria para asegurarte de tener suficiente
                saldo.
              </li>
              <li>Verifica que los datos de tu tarjeta sean correctos.</li>
              <li>Inténtalo nuevamente más tarde o con otro método de pago.</li>
            </ul>
          </div>
          <div className="footer-resultado">
            <p className="text-center my-4">
              Este componente redirigirá automáticamente a la página principal
              después de {seconds} segundos.
            </p>
            <button className="btn-volver" onClick={() => navigate("/")}>
              Volver ahora
            </button>
          </div>
        </>
      )}
      {error && (
        <div>
          <p>Error: {error.message}</p>
        </div>
      )}
    </div>
  );
};

export default PaymentResult;
