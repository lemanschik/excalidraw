import clsx from "clsx";
import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
import { activeColorPickerSectionAtom } from "./colorPickerUtils";

interface CustomColorListProps {
  colors: string[];
  color: string | null;
  onChange: (color: string) => void;
  label: string;
}

export const CustomColorList = ({
  colors,
  color,
  onChange,
  label,
}: CustomColorListProps) => {
  const [, setActiveColorPickerSection] = useAtom(activeColorPickerSectionAtom);

  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (btnRef.current) {
      btnRef.current.focus();
    }
  }, [color]);

  return (
    <div className="color-picker-content--default">
      {colors.map((c, i) => {
        return (
          <button
            ref={color === c ? btnRef : undefined}
            tabIndex={-1}
            type="button"
            className={clsx(
              "color-picker__button color-picker__button--large",
              {
                active: color === c,
                "is-transparent": c === "transparent" || !c,
                "with-border": c === "#ffffff" || c === "transparent" || !c,
              },
            )}
            onClick={() => {
              onChange(c);
              setActiveColorPickerSection("custom");
            }}
            onFocus={() => {
              onChange(c);
              setActiveColorPickerSection("custom");
            }}
            title={c}
            aria-label={label}
            style={{ "--swatch-color": c }}
            key={i}
          >
            <div className="color-picker__button__hotkey-label">{i + 1}</div>
          </button>
        );
      })}
    </div>
  );
};