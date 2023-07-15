export interface Transferencia {
  id: number;
  dataTransferencia: string;
  valor: number;
  tipo: string;
  nomeOperadorTransacao: string | null;
}

export interface Data {
  saldoTotal: number;
  totalDePaginas: number;
  saldoTotalDoPeriodo: number;
  transferencias: Transferencia[];
}
