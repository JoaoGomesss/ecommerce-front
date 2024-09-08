import { renderWithRedux } from "../../helpers/test.helpers";
import Category from "../../types/category.types";
import CategoryOverview from "./category.overview.component";

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    currentUser: { uid: "123", email: "test@example.com" },
  })),
  GoogleAuthProvider: jest.fn(),
  signOut: jest.fn(),
}));

describe("Category Overview", () => {
  it("should show correct category and its products", () => {
    const category: Category = {
      id: "1",
      name: "sueter",
      imageUrl: "image_url",
      displayName: "Feminino",
      products: [
        {
          id: "1",
          name: "sueter",
          imageUrl: "image_url",
          price: 10,
        },
        {
          id: "2",
          name: "casaco",
          imageUrl: "image_url",
          price: 20,
        },
        {
          id: "3",
          name: "jaqueta",
          imageUrl: "image_url",
          price: 30,
        },
        {
          id: "4",
          name: "cachecol",
          imageUrl: "image_url",
          price: 40,
        },
        {
          id: "5",
          name: "blusa",
          imageUrl: "image_url",
          price: 50,
        },
      ],
    };

    const { getByText, queryByText } = renderWithRedux(
      <CategoryOverview category={category} />,
      {},
    );

    getByText("Feminino");

    getByText("sueter");
    getByText("R$10");

    getByText("casaco");
    getByText("R$20");

    getByText("jaqueta");
    getByText("R$30");

    getByText("cachecol");
    getByText("R$40");

    expect(queryByText("blusa")).toBeNull();
  });
});
