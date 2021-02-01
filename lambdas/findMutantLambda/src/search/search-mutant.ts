import { constants } from "../utils/constants";

export class SearchMutant {
  public search(dna: string[]): Promise<boolean> {
    return new Promise((resolve) => {
      const matrix = this.converToMatrix(dna);

      if (this.findHorizontal(matrix)) {
        return resolve(true);
      } else if (this.findVertical(matrix)) {
        return resolve(true);
      } else if (this.findDiagonalTop(matrix)) {
        return resolve(true);
      } else if (this.findDiagonalBottom(matrix)) {
        return resolve(true);
      }
      console.log("ES HUMANO");
      return resolve(false);
    });
  }

  public findHorizontal(matrix: string[][]): boolean {
    let secuencia = constants.VACIO;
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix.length; j++) {
        secuencia = `${secuencia}${matrix[i][j]}`;
      }
      if (this.findMutan(secuencia)) {
        return true;
      }
      secuencia = constants.VACIO;
    }
    return false;
  }

  public findVertical(matrix: string[][]): boolean {
    let secuencia = constants.VACIO;
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix.length; j++) {
        secuencia = `${secuencia}${matrix[j][i]}`;
      }
      if (this.findMutan(secuencia)) {
        return true;
      }
      secuencia = constants.VACIO;
    }
    return false;
  }

  public findDiagonalTop(matrix: string[][]): boolean {
    let secuencia = constants.VACIO;
    for (let line = 1; line <= matrix.length + matrix.length - 1; line++) {
      const startCol = Math.max(0, line - matrix.length);
      const count = Math.min(line, matrix.length - startCol, matrix.length);
      for (let j = 0; j < count; j++) {
        secuencia = secuencia + matrix[Math.min(matrix.length, line) - j - 1][startCol + j];
      }
      if (this.findMutan(secuencia)) {
        return true;
      }
      secuencia = constants.VACIO;
    }
    return false;
  }

  public findDiagonalBottom(matrix: string[][]): boolean {
    const altura = matrix.length;
    const anchura = matrix[0].length;
    let secuencia = constants.VACIO;
    for (let diagonal = 1 - anchura; diagonal <= altura - 1; diagonal += 1) {
      for (
        let vertical = Math.max(0, diagonal), horizontal = -Math.min(0, diagonal);
        vertical < altura && horizontal < anchura;
        vertical += 1, horizontal += 1
      ) {
        secuencia = secuencia + matrix[vertical][horizontal];
      }
      if (this.findMutan(secuencia)) {
        return true;
      }
      secuencia = constants.VACIO;
    }

    return false;
  }

  public converToMatrix(dna: string[]): string[][] {
    // eslint-disable-next-line @typescript-eslint/no-array-constructor
    const array = new Array();
    dna.forEach((element) => {
      array.push(
        Array.from(element).map((f) => {
          return f.toUpperCase();
        }),
      );
    });
    return array;
  }

  public findMutan(secuencia: string): boolean {
    if (
      secuencia.indexOf(constants.CCCC) >= 0 ||
      secuencia.indexOf(constants.GGGG) >= 0 ||
      secuencia.indexOf(constants.AAAA) >= 0 ||
      secuencia.indexOf(constants.TTTT) >= 0
    ) {
      console.log("MUTANTE SECUENCIA ----->", secuencia);
      return true;
    }
    return false;
  }
}
