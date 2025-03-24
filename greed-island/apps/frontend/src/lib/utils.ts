import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { createClient } from "@supabase/supabase-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const supabaseUrl = process.env.NEXT_PUBLIC_PROJECT_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_ANON_KEY

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!);

