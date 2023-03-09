import { compare, hash } from "bcryptjs";

export async function hashingPassword(password) {
    const hashedPassword = await hash(password, 12);
    return hashedPassword;
};
export async function verifingPassword(password, hashedPassword) {
    const isValid = await compare(password, hashedPassword);
    return isValid;
 };