import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast"
import { api } from "~/utils/api";
import {Inter} from "next/font/google"
import "~/styles/globals.css";
import { AnimatePresence } from 'framer-motion'

const inter = Inter({

  subsets:["latin"]
}
)


const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
      <AnimatePresence mode="wait" initial={false}>
    <SessionProvider session={session}>

      <div className={inter.className}>

      <Component  {...pageProps} />
      
      <Toaster />
      </div>
    </SessionProvider>
      </AnimatePresence>
  );
};

export default api.withTRPC(MyApp);
