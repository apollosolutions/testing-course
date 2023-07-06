export class ProductsDataSource {
  async getProducts(): Promise<any[]> {
    return [{ id: "1", name: "Product 1", price: "100" }];
  }

  async getProduct(id: string): Promise<any | null> {
    return { id, name: `Product ${id}`, price: "100" };
  }
}
