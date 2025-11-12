// Bulletproof Builder pattern in TS

/// Video Link: https://www.youtube.com/watch?v=AON1nirWpcc&t

type Invoice = {
  product: string;
  total: number;
};

type InvoiceBuilderInput = {
  product: string;
  amount: number;
  cost: number;
  taxRate: number;
};

export class Builder<T extends Partial<InvoiceBuilderInput>> {
  #actual: T;

  static create(product: string) {
    return new Builder({ product });
  }

  private constructor(actual: T) {
    this.#actual = actual;
  }

  setAmount(amount: number) {
    return new Builder({ ...this.#actual, amount });
  }

  setCost(cost: number) {
    return new Builder({ ...this.#actual, cost });
  }

  setTaxRate(taxRate: number) {
    return new Builder({ ...this.#actual, taxRate });
  }

  /// passing `this` to avoid type casting and
  build(this: Builder<InvoiceBuilderInput>): Invoice {
    /// avoid [this] line can cause an invalid invoice (Manual casting)
    const a = this.#actual as InvoiceBuilderInput;
    return {
      product: a.product,
      total: a.amount * a.cost * (1 + a.taxRate),
    };
  }
}

export const invoice = Builder.create("Macbook M4")
  .setCost(50000)
  .setAmount(5)
  .setTaxRate(2)
  .build();

export abstract class AbstractBuilder<T, E extends Partial<E>> {
  #actual: T;

  private constructor(actual: T) {
    this.#actual = actual;
  }

  abstract build(this: AbstractBuilder<T, E>): T;
}
