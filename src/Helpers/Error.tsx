import axios from "axios";
import {  toast } from 'react-toastify';

export const handleError = (error: any, customMessage?: string) => {
  // server fel
 /*  if (!error.response) {
    toast.error(customMessage || "Kunde inte ansluta till servern. Kontrollera din internetanslutning.");
    return;
  } */

  if (axios.isAxiosError(error)) {
    const err = error.response;
    const status = err?.status || err?.data?.status;

    // Handle authentication errors
    if (status === 401) {
      toast.warning(customMessage || "Du måste vara inloggad för denna åtgärd");
      // No navigation, just notify the user
      return;
    }
    if (status === 429) {
        toast.warning("För många förfrågningar, försök igen senare.");
        return;
      }

    if (status === 403) {
      toast.warning(customMessage || "Du saknar behörigheten för denna operation");
      return;
    }

    if (status === 404) {
      toast.warning(customMessage || "Resursen kunde inte hittas");
      return;
    }

    if (err?.data) {  
  
      if (Array.isArray(err.data.errors)) {
        for (const val of err.data.errors) {
          toast.warning(val.description);
        }
        return;
      }
   
      if (typeof err.data.errors === "object" && err.data.errors !== null) {
        for (const key in err.data.errors) {
          if (Array.isArray(err.data.errors[key])) {
            for (const message of err.data.errors[key]) {
              toast.warning(message);
            }
          }
        }
        return;
      }
      
      // strin error
      if (typeof err.data === "string") {
        toast.warning(err.data);
        return;
      }
 
      if (err.data.error || err.data.message) {
        toast.warning(err.data.error || err.data.message);
        return;
      }
    }
    // alt msg
    toast.error(customMessage || `Ett fel har uppstått (${status || 'okänd status'})`);
    return;
  }

  // not Axios errors
  if (error instanceof Error) {
    toast.error(customMessage || error.message);
    return;
  }

  // finall alternative msg
  toast.error(customMessage || "Ett okänt fel har inträffat");
};
