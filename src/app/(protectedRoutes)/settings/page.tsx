import { onAuthenticateUser } from "@/app/actions/auth";
import PageHeader from "@/components/ReuseableComponents/PageHeader";
import { getStripeOAuthLink } from "@/lib/stripe/utils";
import {
  Home,
  LucideAlertCircle,
  LucideArrowRight,
  LucideCheckCircle,
  LucideCheckCircle2,
  Settings,
  Star,
  User,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  const userExist = await onAuthenticateUser();
  if (!userExist.user) {
    redirect("/");
  }
  const stripeLink = getStripeOAuthLink(
    "api/stripe-connect",
    userExist.user.id
  );
  const isConnected = !!userExist.user.stripeConnectId;
  return (
    <div className="w-full mx-auto py-8 px-4">
      <PageHeader
        leftIcon={<User className="w-3 h-3" />}
        mainIcon={<Settings className="w-5 h-5" />}
        rightIcon={<Home className="w-3 h-3" />}
        heading="The setting to all you webinars"
        placeHolder="Search setting..."
      />
      <h1 className="text-2xl font-bold my-6">Payment Integration</h1>
      <div className="w-full p-6 border border-input rounded-lg bg-background shadow-sm">
        <div className="flex items-center mb-4">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center mr-4">
            <Star className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-primary">
              Stripe Connect
            </h2>
            <p className="text-muted-foreground text-sm">
              Connect your stripe account to start accepting payments.{" "}
            </p>
          </div>
        </div>
        <div className="my-6 p-4 bg-muted rounded-md">
          <div className="flex items-start">
            {isConnected ? (
              <LucideCheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
            ) : (
              <LucideAlertCircle className="h-5 w-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
            )}
            <div>
              <p className="font-medium">
                {isConnected
                  ? "Your stripe account is connected"
                  : "Your stripe account is not connected."}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {isConnected
                  ? "Your can now accept payments through your application."
                  : "Connect your stripe account to start processing payment and managing subscriptions."}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row item-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            {isConnected
              ? "Your can reconnect anytime if needed."
              : "You will be redirect to Stripe to complete the connection."}
          </div>
          <Link
            href={stripeLink}
            className={`px-5 py-2.5 rounded-md font-medium text-sm flex items-center gap-2 transition-colors ${
              isConnected
                ? "bg-muted hover:bg-muted/80 text-foreground"
                : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-600 text-white"
            }`}
          >
            {isConnected ? "Reconnect" : "Connect with Stripe"}{" "}
            <LucideArrowRight size={16} />
          </Link>
        </div>
        {!isConnected && (
          <div className="mt-6 p-6 border-r border-border">
            <h3 className="text-sm font-medium mb-2">
              Why connect with stripe?
            </h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-green-100 flex items-center justify-center">
                  <div className="h-1.4 w-1.5 rounded-full bg-green-500"></div>
                </div>
                Process payments securely from customer to worldwide.
              </li>
              <li className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-green-100 flex items-center justify-center">
                  <div className="h-1.4 w-1.5 rounded-full bg-green-500"></div>
                </div>
                Manage subscriptions and recurring billing.
              </li>
              <li className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-green-100 flex items-center justify-center">
                  <div className="h-1.4 w-1.5 rounded-full bg-green-500"></div>
                </div>
                Access details financial reporting and analytics.
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
