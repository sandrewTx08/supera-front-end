export default function Component() {
  return (
    <footer
      className="bg-dark d-flex justify-content-center gap-4 align-items-center"
      style={{ height: 100 }}
    >
      <a
        className="text-light"
        href="https://www.linkedin.com/company/supera-tecnologia/"
        target="_blank"
      >
        <i className="bi bi-linkedin fs-2"></i>
      </a>
      <a
        className="text-light"
        href="https://www.supera.com.br/"
        target="_blank"
      >
        <i className="bi bi-globe fs-2"></i>
      </a>
    </footer>
  );
}
