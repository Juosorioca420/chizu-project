"use client";

import { trpc } from "@/trpc/client";
import { useRouter } from 'next/navigation'
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ReceiptEmailHtml } from '@/components/email/Receipt'
import nodemailer from 'nodemailer'
import {User,Order, Product} from '../payload-types'

interface PaymentStatusProps {
    order: Order;
    orderEmail: string;
    orderId: string;
    paymentId: string;
    isPaid: boolean;
}

const PaymentStatus = ({ order, orderEmail, orderId, paymentId, isPaid }: PaymentStatusProps) => {

    const router = useRouter()
    const { mutate: updateOrderStatus } = trpc.payment.updateOrderStatus.useMutation({
        onSuccess: async () => {

        },
    });


    const [PapiYaExisto, setPapiYaExisto] = useState(false);
    const [error, setError] = useState("");
    useEffect(() => {
        if (isPaid) {
            setPapiYaExisto(true);
            return;
        }

        if (paymentId) {
            const url = new URL("/api/payment-status", window.location.origin);
            url.searchParams.append("paymentId", paymentId);

            fetch(url.toString())
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return res.json();
                })
                .then((data) => {

                    const isApproved = data.payment.status === "approved";
                    setPapiYaExisto(isApproved);

                    if (isApproved) {
                        updateOrderStatus({ orderId });
                    }

                })
                .catch((error) => {
                    setError("Failed to fetch payment status");
                    console.error("Error fetching payment status:", error);
                });
        }

    }, [paymentId, orderId]);


    const { data } = trpc.payment.pollOrderStatus.useQuery(
        { orderId },
        {
            enabled: isPaid === false,
            refetchInterval: (data) =>
                data?.isPaid ? false : 1000,
        }
    );
    useEffect(() => {
        if (data?.isPaid) {
            console.log("Enviando email de confirmación de compra");
            router.refresh()
            
            fetch('/api/hello')
                    .then(response => response.json())
                    .then(data => console.log(data)) // { message: 'Hello, World!' }
                    .catch(error => console.error('Error:', error));
            //#region Email receipt
            // 
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")	
            console.log("Información que se envia a la api: ")
            console.log(order.products);
            const url = new URL("/api/email-receipt", window.location.origin);
            url.searchParams.append("orderEmail", orderEmail);
            url.searchParams.append("orderId", orderId);                           
            console.log("url.toString()", url.toString());
            fetch(url.toString())
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Email network response was not ok");
                }
                return res.json();
            })
            .catch((error) => {
                setError("Failed to fetch email api");
                console.error("Error fetching email api:", error);
            });
/*
            const url = new URL("/api/email-receipt", window.location.origin);
            fetch(url.toString(), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user, order, orderId }),
            })
            .then((res) => res.json())
            .then((response) => {
                if (response.success) {
                    console.log("Email enviado correctamente");
                } else {
                    console.error("Error enviando email:", response.error);
                }
            })
            .catch((err) => console.error("Error en la petición de email:", err));
            */
            //#endregion 

            
        }
    }, [data?.isPaid, router])


    return (
        <div className="mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-600">
            <div>
                <p className="font-medium text-gray-900">Confirmación en:</p>
                <p>{orderEmail}</p>
            </div>

            <div>

                <div>
                    <p className="font-medium text-gray-900">Estado de la Orden:</p>
                    <p className={isPaid ? "text-green-600" : ""}>
                        {isPaid ? "Pago Exitoso" : "Pendiente de Pago"}
                    </p>
                </div>
            </div>

            {error && (
                <div>
                    <p className="text-red-600">{error}</p>
                </div>
            )}
        </div>
    );
};

export default PaymentStatus;
