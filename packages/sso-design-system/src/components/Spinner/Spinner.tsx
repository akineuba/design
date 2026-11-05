export function Spinner({ size = 16, label = 'Loading' }: { size?: number; label?: string }) {
  return (
    <span className="sso-spinner" role="status" style={{ width: size, height: size }}>
      <span className="sso-visually-hidden">{label}</span>
    </span>
  );
}
