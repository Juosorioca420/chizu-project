import { notFound, redirect } from "next/navigation";
import { getPayloadClient } from "@/getPayload";
import { Campaign, Media, Tier, User } from "@/payload-types";
import { Check } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { cookies } from 'next/headers'
import { getServerUser } from '@/lib/payload-utils'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import CampaignClientComponent from '../../../components/campaign/campaign-client';
import { useState } from "react";


interface UrlProps {
  params: {
    campaignId: string;
  };
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "finalizada":
      return "bg-green-100 text-green-800 border-green-200";
    case "suspendida":
      return "bg-red-100 text-red-800 border-red-200";
    case "activa":
      return "bg-blue-100 text-blue-800 border-blue-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const Page = async ({ params }: UrlProps) => {
  const cookie = cookies()
  const { user } = await getServerUser(cookie)
  const { campaignId } = params;
  const payload = await getPayloadClient();

  if (!user) {
    const currentUrl = `/campaigns/${campaignId}`;
    redirect(`/sign-in?returnUrl=${encodeURIComponent(currentUrl)}`);
  }

  const { docs: campaigns } = await payload.find({
    collection: "campaigns",
    limit: 1,
    where: {
      id: { equals: campaignId },
    },
  });
  let [campaign] = campaigns;
  const campaignData = campaign as unknown as Campaign;
  if (!campaign) return notFound();

  const { docs: tiers } = await payload.find({
    collection: "tiers",
    where: {
      campaign: { equals: campaignData.id },
    },
  });

  const bannerImage = campaignData.bannerImage as Media;
  const author = campaignData.user as User;

  //#region ---- MercadoPago Truco ----

  // const [preferenceId, setPreferenceId] = useState<string | null>(null);
  // const createPreference = async (tier: Tier) => {
  //   try {
  //     const products = [
  //       {
  //         user_id: "10", //user.id,
  //         id: tier.id,
  //         title: tier.title,
  //         quantity: 1,
  //         unit_price: tier.price,
  //         picture_url: bannerImage?.url || "/default-banner.jpg",
  //         isProduct: false,
  //       }
  //     ];

  //     const response = await fetch("/api/create_preference", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(products),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Error en la respuesta del servidor");
  //     }

  //     const data = await response.json();
  //     const { id } = data;
  //     return id;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleBuy = async (tier: Tier) => {
  //   const id = await createPreference(tier);
  //   if (id) {
  //     setPreferenceId(id);
  //   }
  // };

  //#endregion ---- MercadoPago Truco ----


  return (
    <div className="min-h-screen bg-radial-gradient flex items-center justify-center p-6">
      <div className="max-w-6xl w-full backdrop-blur-xl bg-white/10 rounded-3xl p-8 shadow-2xl border border-white/20">
        {/* Container with relative positioning for status tag */}
        <div className="relative">
          {/* Status tag positioned absolutely in the top-right corner */}
          <div className={`absolute -top-2 -right-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(campaignData.status)}`}>
            {campaignData.status}
          </div>

          {/* Campaign Info */}
          <div className="flex flex-col lg:flex-row items-center gap-6 mb-12">
            <img
              src={bannerImage?.url || "/default-banner.jpg"}
              alt="Imagen de la campaña"
              className="w-full lg:w-1/2 h-72 object-cover rounded-lg"
            />
            <div className="text-center lg:text-left lg:w-1/2">
              <h1 className="text-5xl font-bold text-gray-900">{campaignData.title}</h1>
              <p className="text-gray-600 mt-2">Creador: {author.username}</p>
            </div>
          </div>

          {/* Description */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-black mb-4">Descripción de la campaña</h1>
            <p className="text-gray-800 mx-auto text-justify">{campaignData.description}</p>
          </div>

          {/* Subscription Tiers */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {(tiers as unknown as Tier[]).reverse().map((tier: Tier) => (
              <div key={tier.id} className="relative bg-transparent rounded-xl p-[2px] hover:border-indigo-500/50 transition-all duration-300 hover:transform hover:-translate-y-1 subscription-card">
                <div className="bg-white rounded-xl border p-4 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-black mb-4">{tier.title}</h3>
                    <div className="flex items-baseline mb-6">
                      <span className="text-3xl font-bold text-black">$</span>
                      <span className="text-5xl font-bold text-black">{tier.price}</span>
                      <span className="text-gray-400 ml-2">/mes</span>
                    </div>
                    <ul className="space-y-4 mb-8">
                      {tier.features?.map((featureObj) => (
                        <li key={featureObj.id} className="flex items-center text-gray-800">
                          <Check className="h-5 w-5 text-green-400 mr-2" />
                          {featureObj.feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <AlertDialog>

                    <AlertDialogTrigger asChild>
                      <button className="w-full py-3 rounded-xl bg-[#007373] hover:bg-[#009c9c] text-white transition-all">
                        Seleccionar Plan
                      </button>
                    </AlertDialogTrigger>


                    <AlertDialogContent>

                      <AlertDialogHeader>
                        <AlertDialogTitle>Suscribirse a {tier.title}</AlertDialogTitle>
                        <AlertDialogDescription>
                          Si desea continuar, porfavor seleccione en Aceptar y sera redirigido a la pasarela de pagos.
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter>


                        <AlertDialogCancel>
                          Cancelar
                        </AlertDialogCancel>

                        {/* <AlertDialogAction onClick={() => handleBuy(tier)}>
                          Aceptar
                          {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} customization={{ texts: { valueProp: 'smart_option' } }} />}
                        </AlertDialogAction> */}


                        <AlertDialogAction asChild>
                          <CampaignClientComponent
                            user={user}
                            bannerImageUrl={bannerImage?.url || "/default-banner.jpg"}
                            tier={tier}
                          />
                        </AlertDialogAction>



                      </AlertDialogFooter>

                    </AlertDialogContent>


                  </AlertDialog>


                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
