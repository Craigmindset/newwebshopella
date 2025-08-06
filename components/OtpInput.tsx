import React, { useRef } from "react";

interface OtpInputProps {
  value: string;
  onChange: (val: string) => void;
  length?: number;
  disabled?: boolean;
}

const OtpInput: React.FC<OtpInputProps> = ({
  value,
  onChange,
  length = 6,
  disabled,
}) => {
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const val = e.target.value.replace(/[^0-9]/g, "").slice(0, 1);
    let newValue = value.split("");
    newValue[idx] = val;
    newValue = newValue.map((v, i) => (i === idx ? val : v || ""));
    onChange(newValue.join(""));
    if (val && idx < length - 1) {
      inputs.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (e.key === "Backspace" && !value[idx] && idx > 0) {
      inputs.current[idx - 1]?.focus();
    }
  };

  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length }).map((_, idx) => (
        <input
          key={idx}
          ref={(el) => {
            inputs.current[idx] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          className={`w-10 h-12 text-center text-xl border rounded focus:ring-2 focus:ring-blue-400 transition-all bg-white disabled:bg-gray-100 ${
            value[idx] ? "border-blue-500" : "border-gray-300"
          }`}
          value={value[idx] || ""}
          onChange={(e) => handleChange(e, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          disabled={disabled}
          aria-label={`Digit ${idx + 1}`}
        />
      ))}
    </div>
  );
};

export default OtpInput;
