import { Transferencia } from "../../fetch";

export default function Component({
  data,
}: React.PropsWithChildren<{ data: Transferencia[] }>) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Data da transferencia</th>
          <th scope="col">Valencia</th>
          <th scope="col">Tipo</th>
          <th scope="col">Nome do transacionado</th>
        </tr>
      </thead>
      <tbody>
        {data.map((t) => (
          <tr>
            <th scope="row">{t.dataTransferencia}</th>
            <td>{t.valor}</td>
            <td>{t.tipo}</td>
            <td>{t.nomeOperadorTransacao}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
