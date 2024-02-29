export default function Footer() {
  const email = "hmn7707@gmail.com";

  return (
    <footer className="footer footer-center p-4 text-base-content">
      <a href={`mailto:${email}`} className="text-black hover:underline">
        &copy; Haya Amir
      </a>
    </footer>
  );
}
