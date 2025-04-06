import { Poppins, Epilogue } from "next/font/google";

export const poppins = Poppins({
  weight:['100', '900'],
  subsets: ['latin'],
});

export const epilogue = Epilogue({
  weight:['100', '400', '600'],
  subsets: ['latin'],
});