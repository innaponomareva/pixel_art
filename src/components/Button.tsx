import clsx from "clsx";
import { forwardRef, ReactNode } from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  hover?: boolean;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
  onClickHandler?: (event: any) => void;
}
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = "button",
      hover = false,
      className,
      disabled = false,
      onClickHandler,
      children,
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={clsx("btn", className)}
        onMouseEnter={
          hover
            ? (e) => {
                const button = e.target as HTMLElement;
                button.style.backgroundColor = "#676c71";
                button.style.color = "#fff";
              }
            : null
        }
        onMouseLeave={
          hover
            ? (e) => {
                const button = e.target as HTMLElement;
                button.style.backgroundColor = "transparent";
                button.style.color = "#676c71";
              }
            : null
        }
        disabled={disabled}
        onClick={onClickHandler ? onClickHandler : null}
      >
        {children}
      </button>
    );
  }
);

export default Button;
