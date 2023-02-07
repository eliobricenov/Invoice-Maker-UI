import { ButtonHTMLAttributes, forwardRef, HTMLProps, SVGProps } from "react";
import clsx from "clsx";

export const Input = forwardRef<HTMLInputElement, HTMLProps<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      className={clsx(
        "block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);

export function InputLabel(props: HTMLProps<HTMLSpanElement> & { required?: boolean }) {
  return (
    <span
      className={clsx(
        "mb-1 block text-sm font-semibold uppercase text-gray-500",
        props.required && "after:ml-0.5 after:text-red-500 after:content-['*']",
        props.className
      )}
      {...props}
    >
      {props.children}
    </span>
  );
}

export function InvoiceLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
      {...props}
    >
      <path
        style={{
          fill: "#2c3e50",
        }}
        d="M64.736 0v512l76.192-64.224 62.112 50.08 64.096-50.08 61.2 58.336 62.8-58.336L447.264 512V0z"
      />
      <path
        style={{
          fill: "#32bea6",
        }}
        d="M244.688 238.672v-20.24c-14.288-.64-28.144-4.48-36.256-9.168l6.4-24.96c8.96 4.896 21.536 9.376 35.408 9.376 12.16 0 20.48-4.688 20.48-13.216 0-8.112-6.832-13.232-22.608-18.56-22.816-7.68-38.4-18.336-38.4-39.024 0-18.768 13.232-33.488 36.048-37.968V64.656h20.896v18.768c14.288.64 23.888 3.616 30.928 7.04l-6.176 24.096c-5.536-2.352-15.344-7.264-30.72-7.264-13.856 0-18.336 5.968-18.336 11.952 0 7.04 7.472 11.52 25.6 18.336 25.376 8.96 35.616 20.688 35.616 39.888 0 18.976-13.44 35.184-37.968 39.456v21.744h-20.912z"
      />
      <path
        style={{
          fill: "#fff",
        }}
        d="M152 298.832h208v16H152zM152 358.128h208v16H152z"
      />
    </svg>
  );
}

export function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={clsx("rounded rounded-md p-2", className)} {...props}>
      {props.children}
    </button>
  );
}
