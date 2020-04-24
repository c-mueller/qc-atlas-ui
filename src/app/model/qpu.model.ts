export class Qpu {
  id?: number;
  maxGateTime: number;
  name: string;
  numberOfQubits: number;
  t1: number;
}

export class QpuDtoList {
  qpuDtoList: Qpu[];
}
