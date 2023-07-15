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

  return loading ? (
    <LoadingSpinnerBorder />
  ) : error ? (
    <div className="display-5 container">
      Falha ao recuperar dados do servidor
    </div>
  ) : (
    data && (
      <div className="container">
        <form className="d-flex flex-column gap-4">
          <div className="row d-flex gap-4 h5">
            <div className="col align-items-center d-flex gap-2 justify-content-between">
              <div className="d-flex gap-2 align-items-center">
                <i className="bi bi-calendar3"></i>
                Pediodo inicio:
              </div>

              <DatePicker
                selected={dataInicio}
                name="dataInicio"
                className="input-group-text"
                onChange={(date) => dataInicioSet(date as Date)}
              />
            </div>

            <div className="col align-items-center d-flex gap-2 justify-content-between">
              <div className="d-flex gap-2 align-items-center">
                <i className="bi bi-calendar3"></i>
                Pediodo fim:
              </div>

              <DatePicker
                className="input-group-text"
                name="dataFim"
                selected={dataFim}
                onChange={(date) => dataFimSet(date as Date)}
              />
            </div>

            <div className="col align-items-center d-flex gap-2 justify-content-between">
              <div className="d-flex gap-2 align-items-center">
                <i className="bi bi-person-fill"></i>
                Nome do operador:
              </div>

              <input
                type="text"
                value={nomeOperadorTransacao}
                onChange={({ target: { value } }) => nomeOperadorSet(value)}
                className="input-group-text"
                name="nomeOperadorTransacao"
              />
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <button type="submit" className="btn d-inline btn-primary">
              Buscar
            </button>
          </div>

          <div className="row d-flex gap-3 h5">
            <div className="col">
              Saldo total: <b>R${data.saldoTotal}</b>
            </div>

            {data.saldoTotalDoPeriodo && (
              <div className="col">
                Saldo do periodo: <b>R${data.saldoTotalDoPeriodo}</b>
              </div>
            )}
          </div>

          <div className="table-responsive">
            <Tabelas data={data.transferencias} />
          </div>
        </form>
      </div>
    )
  );
}
