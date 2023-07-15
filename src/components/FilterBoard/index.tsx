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
        nomeOperadorTransacao: urlParams.get("nomeOperadorTransacao"),
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
            <div className="row h5">
              <div className="col">
                <div className="d-flex gap-2">
                  <label>Pediodo inicio:</label>
                  <DatePicker
                    selected={dataInicio}
                    name="dataInicio"
                    className="input-group-text w-100"
                    onChange={(date) => dataInicioSet(date as Date)}
                  />
                </div>
              </div>

              <div className="col">
                <div className="d-flex gap-2">
                  Pediodo fim:
                  <DatePicker
                    className="input-group-text w-100"
                    name="dataFim"
                    selected={dataFim}
                    onChange={(date) => dataFimSet(date as Date)}
                  />
                </div>
              </div>

              <div className="col">
                <label>Nome do operador</label>
                <input
                  type="text"
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
