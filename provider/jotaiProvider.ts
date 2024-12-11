import { ResponseUserDto } from "@/server/dto/userDto";
import { atom, createStore } from "jotai";

export const atomProvider = createStore()

// STORES
export const accountInfoAtom = atom(null as ResponseUserDto | null)