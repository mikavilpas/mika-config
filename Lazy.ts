export class Lazy<T> {
  private value?: T

  public constructor(private readonly factory: () => T) {}

  public get(): T {
    if (typeof this.value === "undefined") {
      this.value = this.factory()
    }
    return this.value
  }

  public set(value: T): void {
    this.value = value
  }
}
