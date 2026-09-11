/* Quite similar to TextField but has password specificness builtin, e.g. hiding by default*/
interface PasswordFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
}

export default function PasswordField({
  label,
  value,
  onChange,
  placeholder,
  error,
  required = false,
}: PasswordFieldProps) {
  return (
    <div className="field">
      <label>
        {label}
        <input
          type="password"
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
