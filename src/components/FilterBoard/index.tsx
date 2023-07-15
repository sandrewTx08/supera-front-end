import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinnerBorder from "../Loading/LoadingSpinnerBorder";
import { Data } from "../../fetch";
import Tabelas from "./Tabelas";

export default function Component() {
  const { id } = useParams<"id">();
  const [data, dataSet] = useState<Data>();
  const [loading, loadingSet] = useState<boolean>(false);
  const [error, errorSet] = useState<Error>();

  useEffect(() => {
    loadingSet(true);

    axios<Data>(`transferencia/${id as string}`)
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
        data && <Tabelas data={data.transferencias} />
      )}
    </div>
  );
}
