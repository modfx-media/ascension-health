export function PayloadNotConfigured({ missing }: { missing: string[] }) {
  return (
    <main
      style={{
        fontFamily: "system-ui, sans-serif",
        margin: "4rem auto",
        maxWidth: 640,
        padding: "0 1.5rem",
      }}
    >
      <h1>Payload admin is not configured</h1>
      <p>The admin route is up. Set the missing environment variables, then redeploy:</p>
      <ul>
        {missing.map((name) => (
          <li key={name}>
            <code>{name}</code>
          </li>
        ))}
      </ul>
    </main>
  );
}
