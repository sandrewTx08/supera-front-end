import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinnerBorder from "../Loading/LoadingSpinnerBorder";
import { Data } from "../../fetch";
import Tabelas from "./Tabelas";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

function formatDate(date: string | null) {
  if (date) {
    return new Date(date).toISOString().slice(0, 19).replace(" ", "T");
  }
}

export default function Component() {
  const urlParams = new URLSearchParams(window.location.search);
  const { id } = useParams<"id">();
  const [data, dataSet] = useState<Data>();
  const [loading, loadingSet] = useState<boolean>(false);
  const [error, errorSet] = useState<Error>();

  const [nomeOperadorTransacao, nomeOperadorSet] = useState<string>(
    urlParams.get("nomeOperadorTransacao") as string
  );

  const [dataInicio, dataInicioSet] = useState<Date | null>(
    new Date(urlParams.get("dataInicio") as string)
  );
  const [dataFim, dataFimSet] = useState<Date | null>(
    new Date(urlParams.get("dataFim") as string)
  );

  useEffect(() => {
    loadingSet(true);

    axios<Data>(`transferencia/${id as string}`, {
      params: {
        nomeOperadorTransacao,
        dataInicio: formatDate(urlParams.get("dataInicio")),
        dataFim: formatDate(urlParams.get("dataFim")),
      },
    })
      .then(({ data }) => dataSet(data))
      .catch((error) => errorSet(error as Error))
      .finally(() => loadingSet(false));
  }, [id]);

  return (
    <div className="container">
      {loading ? (
        <LoadingSpinnerBorder />
      ) : error ? (
        <h1>Falha ao recupara dados do servidor</h1>
      ) : (
        data && (
          <form className="d-flex flex-column gap-5">
            <div className="row d-flex gap-4 h5">
              <div className="col align-items-center d-flex gap-2 justify-content-between">
                <label>Pediodo inicio:</label>
                <DatePicker
                  selected={dataInicio}
                  name="dataInicio"
                  className="input-group-text"
                  onChange={(date) => dataInicioSet(date as Date)}
                />
              </div>

              <div className="col align-items-center d-flex gap-2 justify-content-between">
                Pediodo fim:
                <DatePicker
                  className="input-group-text"
                  name="dataFim"
                  selected={dataFim}
                  onChange={(date) => dataFimSet(date as Date)}
                />
              </div>

              <div className="col align-items-center d-flex gap-2 justify-content-between">
                Nome do operador:
                <input
                  type="text"
                  value={nomeOperadorTransacao}
                  onChange={({ target: { value } }) => nomeOperadorSet(value)}
                  className="input-group-text"
                  name="nomeOperadorTransacao"
                />
              </div>
            </div>

            <button type="submit" className="btn d-inline btn-primary">
              Buscar
            </button>

            <div className="d-flex gap-5 h5">
              <div>Saldo total: R${data.saldoTotal}</div>
              {data.saldoTotalDoPeriodo && (
                <div>Saldo do periodo: R${data.saldoTotalDoPeriodo}</div>
              )}
            </div>

            <Tabelas data={data.transferencias} />
          </form>
        )
      )}
    </div>
  );
}
