/* Should be usable for the form fields, business logic is handled in hooks */
interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
}

export default function TextField({
  label,
  value,
  onChange,
  placeholder,
  error,
  required = false,
}: TextFieldProps) {
  return (
    <div className="field">
      <label>
        {label}
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          required={required}
        />
      </label>

      {error && <p className="error">{error}</p>}
    </div>
  );
}
