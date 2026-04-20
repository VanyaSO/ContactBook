import { isValidPhoneNumber } from "libphonenumber-js";

export const isPhoneNumberValid = (phone: string): boolean => {
    if (!phone) return false;

    return isValidPhoneNumber(phone);
};