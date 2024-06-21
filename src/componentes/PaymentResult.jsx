import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(15);
  const [txStatus, setTxStatus] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [codesData, setCodesData] = useState(null);
  const [error, setError] = useState(null);

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
        console.error("Error fetching order data:", error);
      }
    };

    const fetchCodesData = async (quantity) => {
      try {
        const response = await fetch(
          `https://sticky-api-ten.vercel.app/api/codes?quantity=${quantity}`
        );
        const data = await response.json();
        setCodesData(data.codes);
        console.log("Codes data:", data.codes);
        return data.codes;
      } catch (error) {
        setError(error);
        console.error("Error fetching codes data:", error);
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
        console.log("Post records data response:", data);
        return data;
      } catch (error) {
        setError(error);
        console.error("Error posting records data:", error);
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
        console.log("Delete order data response:", data);
        return data;
      } catch (error) {
        setError(error);
        console.error("Error deleting order data:", error);
      }
    };

    const handleFetches = async () => {
      const searchParams = new URLSearchParams(location.search);
      const orderId = searchParams.get("bold-order-id");
      const status = searchParams.get("bold-tx-status");

      if (!orderId || !status) {
        return; // No se realiza ninguna acción si los parámetros están vacíos
      }

      if (status === "approved") {
        console.log(`Pago aprobado. Order ID: ${orderId}`);
        setTxStatus("approved");

        const orderData = await fetchOrderData(orderId);
        if (orderData) {
          console.log("Order data:", orderData);
          console.log("Order ID:", orderData.id);
          console.log("Quantity:", orderData.quantity);

          const codes = await fetchCodesData(orderData.quantity);
          if (codes) {
            await postRecordsData(orderData.id, codes);
          }
        }
      } else if (status === "rejected") {
        console.log(`Pago rechazado. Order ID: ${orderId}`);
        setTxStatus("rejected");

        const orderData = await fetchOrderData(orderId);
        if (orderData) {
          console.log("Order data:", orderData);
          console.log("Order ID:", orderData.id);
          console.log("Quantity:", orderData.quantity);

          await deleteOrderData(orderData.id);
        }
      } else {
        console.log(`Estado de transacción desconocido: ${status}`);
        setTxStatus("unknown");
      }
    };

    handleFetches();
  }, [location.search]); // Utiliza location.search en lugar de location para evitar re-renderizaciones innecesarias

  return (
    <div>
      {txStatus === "approved" && (
        <div>
          <h1>Resultado del Pago</h1>
          <p>¡Tu pago ha sido aprobado!</p>
          {orderData && (
            <div>
              <p>ID de Orden: {orderData.id}</p>
              <p>Cantidad: {orderData.quantity}</p>
            </div>
          )}
          {codesData && (
            <div>
              <h2>Códigos:</h2>
              {codesData.map((code, index) => (
                <p key={index}>{code}</p>
              ))}
            </div>
          )}
          <p>Este componente redirigirá automáticamente a la página principal después de {seconds} segundos.</p>
        </div>
      )}
      {txStatus === "rejected" && (
        <div>
          <h1>Resultado del Pago</h1>
          <p>El pago no ha sido aprobado.</p>
          <p>Este componente redirigirá automáticamente a la página principal después de {seconds} segundos.</p>
        </div>
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
