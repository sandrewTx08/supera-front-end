import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinnerBorder from "../Loading/LoadingSpinnerBorder";
import { Data } from "../../fetch";
import Tabelas from "./Tabelas";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Pagination from "./Pagination";

export default function Component() {
  const urlParams = new URLSearchParams(window.location.search);
  const { id } = useParams<"id">();
  const navigate = useNavigate();

  const [data, dataSet] = useState<Data>();
  const [loading, loadingSet] = useState<boolean>(false);
  const [error, errorSet] = useState<Error>();

  const [page, pageSet] = useState<number>(0);

  const [nomeOperadorTransacao, nomeOperadorSet] = useState<string>(
    urlParams.get("nomeOperadorTransacao") as string
  );

  const [dataInicio, dataInicioSet] = useState<Date | null>(
    new Date(urlParams.get("dataInicio") || 0)
  );
  const [dataFim, dataFimSet] = useState<Date | null>(
    new Date(urlParams.get("dataFim") || Date.now())
  );

  useEffect(() => {
    loadingSet(true);

    axios<Data>(`transferencia/${id as string}`, {
      params: {
        page: page - 1,
        size: 1,
        nomeOperadorTransacao,
        dataInicio: dataInicio?.toISOString(),
        dataFim: dataFim?.toISOString(),
      },
    })
      .then(({ data }) => dataSet(data))
      .catch((error) => errorSet(error as Error))
      .finally(() => loadingSet(false));
  }, [id, page, urlParams.toString()]);

  return loading ? (
    <LoadingSpinnerBorder />
  ) : error ? (
    <div className="display-5 container">
      Falha ao recuperar dados do servidor
    </div>
  ) : (
    data && (
      <form
        className="d-flex flex-column gap-4 container"
        onSubmit={(event) => {
          event.preventDefault();

          pageSet(0);
          urlParams.set("nomeOperadorTransacao", nomeOperadorTransacao || "");
          urlParams.set("dataInicio", dataInicio?.toISOString() || "");
          urlParams.set("dataFim", dataFim?.toISOString() || "");

          navigate(`/transferencia/${id as string}?${urlParams.toString()}`);
        }}
      >
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

        <div className="d-flex justify-content-center">
          <Pagination
            active={page}
            totalPages={data.totalDePaginas}
            onClick={(index) => pageSet(index)}
          />
        </div>
      </form>
    )
  );
}
